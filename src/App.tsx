import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app/routes";
import { BreadcrumbProvider } from "./app/providers/breadcrumb/BreadcrumbProvider";

function App() {
  return (
    <BreadcrumbProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </BreadcrumbProvider>
  );
}

export default App;
