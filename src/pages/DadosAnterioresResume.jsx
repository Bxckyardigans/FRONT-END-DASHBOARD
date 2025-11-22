const DadosAnterioresResume = ({temp,longitude,latitude,data}) =>{
    console.log("recebidso:", temp,longitude,latitude,data)
    return(
        <tr>
            <th style={td}>{data}</th>
            <th style={td}>{temp}</th>
            <th style={td}>{latitude}</th>
            <th style={td}>{longitude}</th>
        </tr>
    )
}
const td = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
  fontSize: "0.95rem",
  color: "#000"
};

export default DadosAnterioresResume