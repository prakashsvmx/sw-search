import React from 'react';
import {Link} from "react-router-dom";
import PlanetService from "../../service/PlanetService";
import PlanetList from "../../components/PlanetList";
import * as PropTypes from "prop-types";
import {Jumbotron, Form, FormControl, InputGroup, Pagination} from 'react-bootstrap';
// import AuthService from "../../service/AuthService";

class Home extends React.Component {
    state = {
        planetsData: {},
        searchText: "",
        fetchCount: 0,
        isLoading: false,
        currentPage: 1
    };

    setSearchText = (e) => {

        const value = e.target.value;
        this.setState((prevState) => {

            const fetchCount = prevState.fetchCount + 1;
            sessionStorage.setItem('fetchCount', fetchCount);
            if (fetchCount === 1) {
                sessionStorage.setItem('lastFetchTime', new Date());
            }
            return {
                searchText: value,
                fetchCount: fetchCount
            }
        }, this.initFetch)
    };

    timeDiffInMinutes = (dt2, dt1) => {

        let diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));

    }

    isValidFetch = () => {
       /* const fetchCount = sessionStorage.setItem('fetchCount');
        const lastFetchTime = sessionStorage.setItem('lastFetchTime');
         const userInfo = AuthService.getUserInfo();
        const timeOne = new Date();
        const timeTwo = new Date(lastFetchTime);
        const diff = this.timeDiffInMinutes(timeOne, timeTwo);*/

        //todo logic to check user and count >15 && user !=Luke.. and lastFetch - current <=15 mins
    }

    initFetch = () => {
        this.setState({planetsData: {}, isLoading: true,}, this.fetchPlanets)
    };

    fetchPlanets = async () => {
        const {
            searchText,
            currentPage,
        } = this.state;

        if (searchText.length > 0) {
            try {
                const planetsData = await PlanetService.searchPlanets({searchText: searchText, page: currentPage});
                this.setState(() => {
                    return {
                        planetsData: planetsData,
                        isLoading: false
                    }
                });
            } catch (fetchError) {
                this.setState(() => {
                    return {
                        planetsData: {},
                        isLoading: false
                    }
                });
            }
        } else {
            this.setState(() => {
                return {
                    planetsData: {},
                    isLoading: false
                }
            });
        }
    }

    setPage = (pageNumber = 1) => {
        this.setState({currentPage: pageNumber}, this.fetchPlanets)
    }


    render() {
        let {logout, currentUser} = this.props;
        const {
            planetsData: {
                results = [],
                previous,
                next
            },
            isLoading,
            currentPage
        } = this.state;
        return (

            <div>
                <div>

                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-item nav-link">Home</Link>
                            <a  href="/" onClick={logout} className="nav-item nav-link">Logout</a>
                        </div>
                    </nav>

                    <Jumbotron>
                        <h1>Welcome {currentUser.name}</h1>
                        <p>
                            Start searching to explore the planets .
                        </p>
                    </Jumbotron>


                    <Form inline>

                    </Form>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            {/*eslint-disable-next-line*/}
                            <InputGroup.Text id="basic-addon1"><span role="img">&#128270;</span></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="text" onChange={this.setSearchText} placeholder="Search"
                                     className="mr-sm-2"/>
                    </InputGroup>

                    {isLoading && <div>Loading...</div>}

                    {results.length > 0 && < PlanetList list={results}/>
                    }

                    <div style={{
                        diplay: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto',
                        width: '40%'
                    }}>
                        <Pagination>
                            {/*TODO Pagination.*/}
                            {previous && <Pagination.Prev onClick={() => {
                                this.setPage(currentPage - 1)
                            }}/>}
                            {next && <Pagination.Next onClick={() => {
                                this.setPage(currentPage + 1)
                            }}/>}
                        </Pagination>

                    </div>
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    logout: PropTypes.any,
    currentUser: PropTypes.any
}

export default Home;