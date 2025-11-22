import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Historico from "./pages/DadosAnteriores"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dadosAnteriores" element={<Historico />} />
      </Routes>
    </BrowserRouter>

  );
}

