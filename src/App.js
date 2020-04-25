import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Error from "./components/Error";
import Clima from "./components/Clima";

function App() {
  //State principal
  //ciudad =state, guardarCiudad=this.setState
  const [ciudad, guardarCiudad] = useState("");
  const [pais, guardarPais] = useState("");
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    //Prevenir ejecucion
    if (ciudad === "") return;

    const consultarAPI = async () => {
      const appId = "88030114c5e47763a011a75e7a10c633";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
      // const url = `https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/LAT,L`;

      //consultar la URL
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      console.log(resultado);

      guardarResultado(resultado);
    };

    consultarAPI();
  }, [ciudad, pais]);

  const datosConsulta = (datos) => {
    // console.log(datos);

    //Validar que ambos campos estén
    if (datos.ciudad === "" || datos.pais === "") {
      guardarError(true);
      //error
      return;
    }

    // si Ciudad y pais existen, agregalos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  };

  //Cargar un componente condicionalmente
  let componente;
  if (error) {
    //Hay error, mostrarlo
    componente = <Error mensaje="Ambos campos son obligatorios" />;
  } else if (resultado.cod === "404") {
    componente = <Error mensaje="La ciudad no existe en nuestro registro" />;
  } else {
    //Mostrar el clima
    componente = <Clima results={resultado} />;
  }

  return (
    <div className="App">
      <Header titulo="Clima React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario datosConsultas={datosConsulta} />
            </div>
            <div className="col s12 m6">{componente}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
