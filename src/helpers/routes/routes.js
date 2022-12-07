import paths from "../paths/paths";
import HomePage from "../../pages/Home/HomePage";
import UsersPage from "../../pages/Users/UsersPage";
import AboutPage from "../../pages/About/AboutPage";


const routes = [
    {
        path: paths.home,
        component: <HomePage />
    },
    {
        path: paths.users,
        component: <UsersPage />
    },
    {
        path: paths.about,
        component: <AboutPage />
    }
]

export default routes