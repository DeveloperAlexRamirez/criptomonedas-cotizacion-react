import React, { useEffect, useState } from 'react';
import { useMoneda } from '../hooks/useMoneda';
import { useCriptomoneda } from '../hooks/useCriptomoneda';
import axios from 'axios';
import { Error } from './Error';

import styled from '@emotion/styled';

const Boton = styled.input`
    margin-top:20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor:pointer;
    }
`; 

export const Formulario = ({ setMoneda, setCriptomoneda }) => {

    // state del listado de criptomonedas
    const [ listaCripto, setListaCripto ] = useState([]);

    // state del error
    const [ error, setError ] = useState(false);

    // InitialState del hook useMoneda
    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },  
        { codigo: 'MXM', nombre: 'Peso mexicano' },  
        { codigo: 'EUR', nombre: 'Euro' },  
        { codigo: 'GDP', nombre: 'Libra Esterlina' },  
    ];

    // Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', MONEDAS);

    // Utilizar useCriptomoneda
    const [criptomoneda, SelectCriptomoneda] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto );

    // Ejecutar llamado a la API
    useEffect( () => {

        const consultarAPI = async () => {
            
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            // Usamos axios para simplificar las promesas
            const resultado = await axios.get(url);
            // Guarda los 10 objetos consultado de la API
            setListaCripto(resultado.data.Data);
        } 
        consultarAPI();
    }, []); 

    // Cuando el usuario hace submit en el formulario
    const cotizarMoneda = e => {
        e.preventDefault();

    // Validar si ambos campos están llenos
        if( moneda === '' || criptomoneda === '' ){
            setError(true);
            return;
        }
    // Pasar los datos al componente principal
        setError(false);
        setMoneda(moneda);
        setCriptomoneda(criptomoneda);
    }

    return (
        <form
            onSubmit={ cotizarMoneda }
        >
        { error ? <Error mensaje= "Ambos campos son obligatorios"/> : null}
            <SelectMonedas/>

            <SelectCriptomoneda />

            <Boton
                type="submit"
                value="Calcular"
            ></Boton>
        </form>
    )
}
