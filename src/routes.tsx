import * as Pages from "./pages"
// import { useAuth } from "./store/AuthContext"

// const RestrictPage: React.FC = props => {
//   const { isLoggedIn } = useAuth()
//   if (!isLoggedIn) return <Pages.LoginPage />
//   return <>{props.children}</>
// }

// const LoginRedirect: React.FC = props => {
//   const { isLoggedIn } = useAuth()
//   if (isLoggedIn) return <Pages.EventsPage />
//   return <>{props.children}</>
// }

export const routes = {
  "/": () => <Pages.HomePage />,

  "/home": () => (
    // <LoginRedirect>
    <Pages.HomePage />
    // </LoginRedirect>
  ),
  "/students": () => (
    // <LoginRedirect>
    <Pages.StudentPage />
    // </LoginRedirect>
  )
}
