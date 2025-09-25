import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [status, setStatus] = useState("Desligado");
  const [temperatura, setTemperatura] = useState(null);
  const [duty, setDuty] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const ESP_IP = "http://10.64.1.134"; // IP do ESP32

  const fetchDados = async () => {
    try {
      const res = await axios.get(`${ESP_IP}/dados`);
      setTemperatura(res.data.temperatura);
      setDuty(res.data.duty);
      setLatitude(res.data.latitude);
      setLongitude(res.data.longitude);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchDados();
    const interval = setInterval(fetchDados, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Monitor ESP32</h1>
      <p>🌡️ Temperatura: {temperatura !== null ? `${temperatura} °C` : "..."}</p>
      <p>⚡ Duty: {duty !== null ? duty : "..."} </p>
      <p>📍 Latitude: {latitude !== null ? latitude : "..."}</p>
      <p>📍 Longitude: {longitude !== null ? longitude : "..."}</p>
    </div>
  );
}
