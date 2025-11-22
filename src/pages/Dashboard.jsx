import React, { useEffect, useState } from "react";
import { Thermometer, MapPin, Bell, Syringe, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link, Navigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("ok");
  const [temp, setTemp] = useState("--");
  const [location, setLocation] = useState("Atualizando...");
  const [ip, setIp] = useState("coldremote.local");

  useEffect(() => {

  async function buscarEnderecoResumido(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;

  try {
    const resp = await fetch(url, {
      headers: { "User-Agent": "ColdRemoteDashboard/1.0" }
    });

    const dados = await resp.json();
    const a = dados.address || {};

    // Monta o texto resumido
    const rua = a.road || a.residential || a.pedestrian || "Rua desconhecida";
    const numero = a.house_number ? `, ${a.house_number}` : "";
    const bairro = a.suburb || a.neighbourhood || a.village || "";
    const cidade = a.city || a.town || a.municipality || a.state || "";

    return `${rua}${numero} - ${bairro} - ${cidade}`;
  } catch (err) {
    return "Endereço não encontrado";
  }
}


    const interval = setInterval(() => {
     fetch(`http://${ip}/dados`)
        .then((res) => res.json())
        .then(async (info) => {
          setTemp(info.temperatura);

          const endereco = await buscarEnderecoResumido(info.latitude, info.longitude);
          setLocation(endereco);


          setLocation(endereco);
          setStatus("ok");
          console.log(info)
          setData((prev) => [...prev.slice(-19), { name: new Date().toLocaleTimeString(), temp: info.temperatura }]);
        })
        .catch(() => console.error("Erro ao conectar com ESP32"));
    }, 3000);
    return () => clearInterval(interval);
  }, [ip]);

  const corStatus = status === "ok" ? "#16a34a" : "#dc2626";
  const bgStatus = status === "ok" ? "#dcfce7" : "#fee2e2";
  const iconeStatus = status === "ok" ? <Users style={{ width: 28, height: 28 }} /> : <Bell style={{ width: 28, height: 28 }} />;

  return (
    <body style={{overflowX:"hidden"}}>
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(to bottom right, #e0f2fe, #ffffff, #dcfce7)",
      boxSizing: "border-box",
      overflowX: "hidden",
      overflowY: "auto",
      padding: "20px"
    }}>
      {/* HEADER */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: "40px",
        width: "100%"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "700",
          color: "#1e3a8a"
        }}>Painel de Vacinação</h1>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 20px",
          borderRadius: "9999px",
          backgroundColor: bgStatus,
          color: corStatus,
          fontWeight: "600",
          marginTop: "10px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.12)"
        }}>
          {iconeStatus}
          <span>{status === "ok" ? "Sistema Estável" : "Atenção: Alerta!"}</span>
        </div>
      </header>

      {/* CARDS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "30px",
        width: "100%",
        marginBottom: "40px"
      }}>
        {/* Temperatura */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "180px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
        }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "12px", color: "#1e40af", fontWeight: "600", marginBottom: "20px", fontSize: "1.25rem" }}>
            <Thermometer style={{ width: 24, height: 24 }} /> Temperatura Atual
          </h2>
          <p style={{ fontSize: "3rem", fontWeight: "700", color: "#1e40af", margin: 0 }}>{temp}°C</p>
          <p style={{ fontSize: "1rem", color: "#6b7280", marginTop: "12px" }}>Monitoramento contínuo do posto</p>
        </div>

        {/* Localização */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "180px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
        }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "12px", color: "#1e40af", fontWeight: "600", marginBottom: "20px", fontSize: "1.25rem" }}>
            <MapPin style={{ width: 24, height: 24 }} /> Localização
          </h2>
          <p style={{ fontSize: "1.125rem", color: "#374151" }}>{location}</p>
          <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "8px" }}>Origem: ESP32 no posto de vacinação</p>
        </div>

        {/* Ações */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "180px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
        }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "12px", color: "#1e40af", fontWeight: "600", marginBottom: "20px", fontSize: "1.25rem" }}>
            <Syringe style={{ width: 24, height: 24 }} /> Ações
          </h2>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "16px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontWeight: "700",
              border: "none",
              borderRadius: "14px",
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            Atualizar Dados
          </button>
        </div>
        {/* DADOS ANTERIORES — AGORA NO GRID */}
  <div style={{
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "180px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
  }}>
    <h2 style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      color: "#1e40af",
      fontWeight: "600",
      marginBottom: "20px",
      fontSize: "1.25rem"
    }}>
      <Syringe style={{ width: 24, height: 24 }} /> Dados Enviados Anteriormente
    </h2>

    <p style={{ fontSize: "1rem", color: "#374151", marginBottom: "10px" }}>
      Histórico de dados enviados pelo ESP32.
    </p>
<Link to="/dadosAnteriores">
    <button
    
      
      style={{
        padding: "14px",
        backgroundColor: "#1e40af",
        color: "#ffffff",
        fontWeight: "700",
        border: "none",
        borderRadius: "14px",
        cursor: "pointer",
        fontSize: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      Acessar Dados Anteriores
    </button>
  </Link>
  </div>

</div>

      
     


      {/* FOOTER */}
      <footer style={{
        textAlign: "center",
        color: "#6b7280",
        fontSize: "0.875rem",
        marginBottom: "20px"
      }}>
        © 2025 | Sistema de Monitoramento de Postos de Vacinação – ESP32 IoT
      </footer>
    </div>
    </body>
  );
}
