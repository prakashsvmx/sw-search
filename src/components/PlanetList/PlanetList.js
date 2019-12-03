import React from 'react';
import PlanetInfo from "../../components/PlanetInfo";
import {Jumbotron} from 'react-bootstrap';

import {Row, Col} from "react-bootstrap";

const PlanetList = ({list = []}) => {
    return (
        <Jumbotron>
            <Row>
                {list.map((item) => {

                    return (
                        <Col>
                            <PlanetInfo info={item}/>
                        </Col>
                    )
                })
                }
            </Row>
        </Jumbotron>
    )

};

export default PlanetList;