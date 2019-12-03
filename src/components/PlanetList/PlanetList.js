import React from 'react';
import PlanetInfo from "../../components/PlanetInfo";

const PlanetList =({list=[]})=>{
    return list.map((item)=>{

        return <PlanetInfo info={item}/>
    })

};

export default PlanetList;