import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import AppRoutes from "./routes/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AppRoutes />
    <Toaster
      position="bottom-right"
      reverseOrder={false}
    />
  </>
);
