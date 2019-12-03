import React from 'react';
import {Planet} from 'react-kawaii';
import {OverlayTrigger, Popover} from 'react-bootstrap';

const PlanetInfo = ({info}) => {
    const {
        name,
        population,
        rotation_period,
        orbital_period,
        climate,
        gravity,
        terrain,
        surface_water,

        residents,
        films,
    } = info;
    let size = 20;
    if (`${population}`.toLowerCase() !== 'unknown') {
        size = Math.round(Number.parseInt(population) / 10000000);
        size = size < 20 ? 20 : size;
        size = size > 100 ? 100 : size;
    }

    return (
        <OverlayTrigger
            trigger="click"
            key={name}
            placement={"right"}
            rootClose
            rootCloseEvent={"mousedown"}
            overlay={
                <Popover id={`popover-positioned-${name}`} rootClose rootCloseEvent={"mousedown"}>
                    <Popover.Title as="h3">{name}</Popover.Title>
                    <Popover.Content>
                        <div style={{display: 'flex', flexFlow: 'column'}}>
                            <span>Rotation period: {rotation_period}</span>
                            <span>Orbital period : {orbital_period}</span>
                            <span>Climate : {climate}</span>
                            <span> Gravity : {gravity}</span>
                            <span>Terrain : {terrain}</span>
                            <span>Surface Water: {surface_water}</span>
                            <span>{residents.length} Resident(s)</span>
                            <span>{films.length} Film(s)</span>
                        </div>
                    </Popover.Content>
                </Popover>
            }
        >
            <div>
                <Planet size={size} color="#FDA7DC"/>
                {name}
            </div>
        </OverlayTrigger>


    )
};

export default PlanetInfo;