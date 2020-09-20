import React, { useState, useEffect } from 'react';
import image from './cryptomonedas.png';
import { Formulario } from './components/Formulario';
import { Cotizacion } from './components/Cotizacion';
import { Spinner } from './components/Spinner';

import axios from 'axios';
import styled from '@emotion/styled';

// Styles to container
const Contenedor = styled.div`
  max-width:900px;
  margin: 0px auto;
  @media(min-width: 992px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

// Styles for the image
const Imagen = styled.img`
  max-width:100%;
  margin-top: 5rem;
`;

// Titulo llamativo
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  /* Es la linea que se muestra bajo el texto */
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [ moneda, setMoneda ] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect( () => {

    const cotizarCriptomoneda = async() => {
    
      // Evitamos la ejecución la primera vez
      if(moneda === '') return;

      // Consultar la API para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      // Mostrar el spinner
      setCargando(true);

      // Ocultar el spinner y mostrar el resultado
      setTimeout(() => {

        // Cambiar el estado de cargando
        setCargando(false);

        // Para acceder de forma dinámica al resultado de la API. Guardamos el state
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 2000);
    }
    // Mandamos llamar la función 
    cotizarCriptomoneda();

  }, [moneda, criptomoneda]);
    
  // Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={ resultado }/>

  return (
    <div className="App">
     <Contenedor>
      <div>
        <Imagen 
          src={image}
          alt="imagen crypto"
        />
      </div>
      <div>

        <Heading>Cotiza Criptomonedas al Instante</Heading>
          <Formulario
            setMoneda = { setMoneda }
            setCriptomoneda = { setCriptomoneda } 
           />

          { componente }

      </div>
     </Contenedor>
    </div>
  );
}

export default App;
