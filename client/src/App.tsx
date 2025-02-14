import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./components/Home";
import { loginLoader, verifyLoader } from "./loader/loader";
import Dashboard from "./pages/Dashboard";
import MailSent from "./pages/MailSent";
import EmailVerified from "./pages/EmailVerified";
import TokenExpired from "./pages/TokenExpired";
import ForgotPassword from "./pages/ForgotPassword";
import Recieptents from "./pages/Recieptents";
import Transactions from "./pages/Transactions";
import Investments from "./pages/Investments";
import HealthScore from "./pages/HealthScore";
import Settings from "./pages/Settings";
import GetHelp from "./pages/GetHelp";
const routes = createBrowserRouter([
  {
    path: "/",
    loader: loginLoader,
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/linksent",
    element: <MailSent />,
  },
  {
    path: "/verified",
    element: <EmailVerified />,
  },
  {
    path: "/tokenExpired",
    element: <TokenExpired />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/user",
    loader: verifyLoader,
    element: <Home></Home>,
    children: [
      {
        path: "",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "recieptents",
        element: <Recieptents></Recieptents>,
      },
      {
        path: "transactions",
        element: <Transactions></Transactions>,
      },
      {
        path: "investments",
        element: <Investments></Investments>,
      },
      {
        path: "healthscore",
        element: <HealthScore></HealthScore>,
      },
      {
        path: "setting",
        element: <Settings></Settings>,
      },
      {
        path: "gethelp",
        element: <GetHelp></GetHelp>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
