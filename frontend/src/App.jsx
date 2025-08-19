import { EmployeeProvider } from "./contexts/EmployeeContext.jsx";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <EmployeeProvider>
      <HomePage />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </EmployeeProvider>
  );
}

export default App;
