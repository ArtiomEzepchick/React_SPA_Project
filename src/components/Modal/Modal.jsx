import React, { useRef, useEffect, useContext } from "react"
import * as ReactDOM from "react-dom"
import classNames from "classnames"
import PropTypes from "prop-types"

import Overlay from "../Overlay/Overlay"

import { useScrollLock } from "../../hooks/useScrollLock"
import { MODAL_TYPES } from "./modalTypes"
import { ThemeContext } from "../../contexts/themeContext/ThemeContext"
import "./styles.css"

const Modal = ({
    headerText,
    contentText,
    children,
    isModalOpen,
    modalType,
    handleCloseModal,
}) => {
    const modalRef = useRef(null)
    const { state: { darkMode } } = useContext(ThemeContext)
    const { lockScroll, unlockScroll } = useScrollLock()

    useEffect(() => {
        isModalOpen ? lockScroll() : unlockScroll()

        const handleClickOutside = e => {
            if (modalType === MODAL_TYPES.SUCCESS) {
                return
            }

            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleCloseModal()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [modalRef, modalType, handleCloseModal, isModalOpen, lockScroll, unlockScroll])

    return (
        isModalOpen && ReactDOM.createPortal(
            <Overlay isModalOpen={isModalOpen} darkMode={darkMode}>
                <div className={classNames("modal-container")}>
                    <div
                        data-type={modalType}
                        className={classNames("modal-window", "flex-all-centered")}
                        ref={modalRef}
                    >
                        <div>
                            <h1>{headerText}</h1>
                            <p>{contentText}</p>
                        </div>
                        {modalType !== MODAL_TYPES.SUCCESS && modalType !== MODAL_TYPES.NOTIFICATION && children}
                    </div>
                </div>
            </Overlay>,
            document.getElementById("modal"))
    )
}

Modal.propTypes = {
    headerText: PropTypes.string,
    contentText: PropTypes.string,
    isModalOpen: PropTypes.bool.isRequired,
    modalType: PropTypes.string,
    handleReturn: PropTypes.func,
}

export default Modal