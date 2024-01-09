import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import LoginForm from "./Components/Login";
import TeacherRegistrationForm from "./Components/TeacherRegistration";
import { store } from "./Redux/store";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "teacher",
    element: <TeacherRegistrationForm />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
