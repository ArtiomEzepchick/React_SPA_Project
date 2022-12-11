import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Accordion from '../Accordion/Accordion'
import Form from '../Form/Form'
import Button from '../Button/Button'
import ResultsData from '../ResultsData/ResultsData'
import Loader from '../Loader/Loader'
import { useWindowSize } from '../../hooks/useWindowSize'
import {
    asyncSubmit,
    changeFormValue,
    incrementCounter,
    decrementCounter,
    clearForm
} from '../../reducers/reduxReducer/reduxFormSlice'
import { generateResultData } from '../../helpers/formData/formData'
import { accordionReduxPageData } from '../../helpers/accordionData/accordionData'

const ReduxForm = () => {
    const dispatch = useDispatch()
    const formData = useSelector((state) => state.form)
    const isLoading = useSelector((state) => state.form.isLoading)
    const isLoaded = useSelector((state) => state.form.isLoaded)
    const prevCountRef = useRef(0)
    const { width, height } = useWindowSize()
    const resultData = generateResultData(formData, { width, height, prevCount: prevCountRef.current })

    useEffect(() => {
        prevCountRef.current = formData.count
    }, [formData.count])

    const handleChange = (e) => dispatch(changeFormValue({ value: e.target.value, name: e.target.name }))

    const handleIncreaseCounter = () => dispatch(incrementCounter())

    const handleDecreaseCounter = () => dispatch(decrementCounter())

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(asyncSubmit())
    }

    return (
        <div>
            <h1 style={{ marginTop: '1rem' }}>
                Form using <span className='highlight-red'>Redux Toolkit</span>
            </h1>
            <hr />
            <div className="accordion">
                {accordionReduxPageData.map(({ title, content }) => (
                    <Accordion
                        key={title}
                        title={title}
                        content={content}
                    />
                ))}
            </div>
            <hr />
            <div className='form-container'>
                <Form
                    state={formData}
                    prevCountRef={prevCountRef}
                    isLoaded={formData.isLoaded}
                    handleChange={handleChange}
                    handleIncreaseCounter={handleIncreaseCounter}
                    handleDecreaseCounter={handleDecreaseCounter}
                    handleSubmit={handleSubmit}
                />

                {isLoading ?
                    <Loader /> :
                    <ResultsData
                        isLoaded={isLoaded}
                        data={resultData}
                        counterValue={formData.count}
                    />
                }

                <Button
                    className='reset-button'
                    innerText='Reset'
                    handleClick={() => dispatch(clearForm())}
                />
            </div>
        </div>
    )
}

export default ReduxForm