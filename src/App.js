import React from 'react';
import {Route, Router} from 'react-router-dom';

import AuthService from "./service/AuthService";
import Home from "./components/Home";
import Login from "./components/Login";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    updateUserInfo = () => {
        this.setState(() => {
            const userInfo = AuthService.getUserInfo();
            return {
                currentUser: userInfo
            }
        })
    }

    componentDidMount() {
        this.updateUserInfo()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevState.currentUser && this.state.currentUser) && prevState.currentUser.name !== this.state.currentUser.name) {
            this.updateUserInfo()
        }
    }

    logout = () => {
        AuthService.logout();
        this.setState(() => {
            return {
                currentUser: null,
            }
        })
        history.push('/login');
    }

    render() {
        return (
            <Router history={history}>
                <AuthRoute exact path="/" component={Home} logout={this.logout} />
                <Route path="/login" component={Login}/>
            </Router>
        );
    }
}


export default App;
