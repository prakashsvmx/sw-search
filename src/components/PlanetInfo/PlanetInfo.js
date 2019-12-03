import React from 'react';

const PlanetInfo = ({info}) =>{

    const {name, population} =info;
    return(
        <div>
            {name} - {population}
        </div>
    )
};

export default PlanetInfo;