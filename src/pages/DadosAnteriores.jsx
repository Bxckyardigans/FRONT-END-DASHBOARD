import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Syringe } from "lucide-react";
import DadosAnterioresResume from "./DadosAnterioresResume"
export default function DadosAnteriores() {
  const [dadosAnteriores, setDadosAnteriores] = useState([])

  
  useEffect(()=>{async function buscarDados() {
    try{
      const response = await fetch(`http://127.0.0.1:3000/server`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
      const dados = await response.json();
      const dadosAnteriores = dados[0]
      console.log(dados)
      console.log(dadosAnteriores[0].temperatura)
      if (dados){
        setDadosAnteriores(dadosAnteriores)
      } else{
        console.error("dados não encontrados")
      }
    } catch (error){
      console.error("Erro na busca", error)
    }
    
  }buscarDados()},[])

  return (
    <div style={{
      minHeight: "10vh",
      padding: "49px",
      background: "linear-gradient(to bottom right, #e0f2fe, #ffffff, #dcfce7)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%"
    }}>

      {/* TÍTULO */}
      <h1 style={{
        fontSize: "3rem",
        fontWeight: "700",
        color: "#1e3a8a",
        marginBottom: "30px",
        textAlign: "center"
      }}>
        Dados Enviados Anteriormente
      </h1>

      {/* CARD PRINCIPAL */}
      <div style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        width: "100%",
        maxWidth: "1200px",
        minWidth:"10vh"
      }}>

        {/* TÍTULO DO CARD */}
        <h2 style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontWeight: "600",
          fontSize: "1.4rem",
          marginBottom: "20px",
          color: "#1e40af"
        }}>
          <Syringe style={{ width: 26, height: 26 }} />
          Registros do Sistema
        </h2>

        {/* TABELA */}
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse"
          }}>
            <thead>
              <tr style={{ background: "#0000ff" }}>
                <th style={th}>Horário</th>
                <th style={th}>Temperatura</th>
                <th style={th}>Latitude</th>
                <th style={th}>Longitude</th>
              </tr>
            </thead>

            <tbody>
              {/* MOCK — substitua pelos dados reais */}
              
                {dadosAnteriores.length > 0 ?( dadosAnteriores.map((dadosAnterior)=>(
                  <DadosAnterioresResume
                    
                    temp={dadosAnterior.temperatura}
                    longitude={dadosAnterior.longitude}
                    latitude={dadosAnterior.latitude}
                    data={dadosAnterior.recebido_em}
                  />
                ))) : (<p>Nenhum dado</p>)
                }
              
            </tbody>
          </table>
        </div>

        {/* VOLTAR */}
        <div style={{ marginTop: "30px", textAlign: "left" }}>
          <Link to="/">
            <button style={{
              padding: "14px 22px",
              backgroundColor: "#1e40af",
              color: "#ffffff",
              fontWeight: "700",
              border: "none",
              borderRadius: "14px",
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
              Voltar ao Painel
            </button>
          </Link>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{
        textAlign: "center",
        color: "#6b7280",
        fontSize: "0.875rem",
        marginTop: "40px"
      }}>
        © 2025 | Sistema de Monitoramento de Postos de Vacinação – ESP32 IoT
      </footer>
    </div>
  );
}

const th = {
  padding: "12px",
  borderBottom: "2px solid #cbd5e1",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "1rem",
  color:"#fff"
};


