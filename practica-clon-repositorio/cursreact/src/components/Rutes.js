import React, { useEffect, useState } from 'react';

function Rutes(){
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        fetch("https://scratchya.com.ar/react/datos.php")
        .then((response) => {
            return response.json();
        })
        .then((articles) => {
            setArticles(articles);
        })
    }, [])
    return (
        <>
            <h1>Llista de rutes</h1>
            <div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>CODI</th>
                            <th>DESCRIPCIO</th>
                            <th>PREU</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map(art => {
                            return(
                                <tr key={art.codigo}>
                                    <td>{art.codigo}</td>
                                    <td>{art.descripcion}</td>
                                    <td>{art.precio}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Rutes;