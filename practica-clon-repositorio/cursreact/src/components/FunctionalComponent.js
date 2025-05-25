import React from 'react';

const FunctionalComponent = (props) => {
    return (
        <>
            <h1>Soc un component funcional </h1>
            <h1>Props Variable: { props.propsFunctional1 }</h1>
            <h1>Props String: { props.propsFunctional2String }</h1>
            <h1>Props Number: { props.propsFunctionalNumber }</h1>
            <h1>Props Objecte: { props.propsFunctionalObject.nom }</h1>
        </>
    );
}

export default FunctionalComponent;