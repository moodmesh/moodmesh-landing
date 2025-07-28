import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import WavyParticles from "./components/ui/wavyparticles.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <Router>
    <WavyParticles>
      <Routes>
        <Route path="/landing" element={<App/>}></Route>
        <Route path="*" element={<Navigate to="/landing" replace/>}/>
      </Routes>
    </WavyParticles>
  </Router>
);
