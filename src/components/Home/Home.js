import React,{useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import PlanetService from "../../service/PlanetService";
import PlanetList from "../../components/PlanetList";
import { useDebouncedCallback } from 'use-debounce';

const Home = ({logout, currentUser}) =>{

    const [value, setValue] = useState("");
    // Debounce callback
    const [debouncedCallback] = useDebouncedCallback(
        // function
        (value) => {
            setValue(value);
            resetAdFetch(value)
        },
        // delay in ms
        500
    );

    const [planetList, setPlanetList] = React.useState([]);


    const fetchData= async (searchText)=>{
        const data = await PlanetService.searchPlanets({searchText: searchText});
        debugger;
        setPlanetList(data.results);
    };

    const resetAdFetch =(searchText) =>{
        setPlanetList([]);
        if(searchText.length>0){
        fetchData(searchText);
        }
    };


    return (
        <div>
            <div>

                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav">
                        <Link to="/" className="nav-item nav-link">Home</Link>
                        <a onClick={logout} className="nav-item nav-link">Logout</a>
                    </div>
                </nav>

                <input defaultValue={""} onChange={(e) => debouncedCallback(e.target.value)} />

                <button onClick={resetAdFetch}>Search</button>
                {planetList.length > 0 && < PlanetList list={planetList}/>
                }

            </div>
        </div>
    )
};

export default Home;