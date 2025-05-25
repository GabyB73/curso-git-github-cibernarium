import React from 'react';
import { useParams } from 'react-router-dom';
import RefugioJson from './refugios.json';

function Refugis(){
   const refugios = RefugioJson;
   const ListRefus = refugios.map((refugio) => 
    <li key={refugio.refugio_id}><a href={`/refugis/${refugio.slug}`}>Refugi {`${refugio.name}`}</a></li>
   );

    //Guardem en el console log els parametres que rebem
    console.log("useParams", useParams());
    const { id } = useParams();
    return (
        <>
        <h1>Llista de refugis</h1>
        <ul>
            {ListRefus}
        </ul>
        <h2>El refugi seleccionat és { id }</h2>
        </>
    )
}

export default Refugis;