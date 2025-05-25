import React from 'react';

const FunctionalComponent1 = ({ childToParent }) => {
    const data = "Info del fill cap el pare";

    return (
        <>
            <h1>Sòc un fill component</h1>
            <button onClick={ () => childToParent(data)} >PASSAR-LI DADES EL PARE</button>
        </>
    )
}

export default FunctionalComponent1;