import React, {useState} from "react";
import AuthService from "../../service/AuthService";
import {FormControl, InputGroup, Jumbotron} from "react-bootstrap";

const Login = ({history}) => {
    const [userName, setUserName] = useState('Luke Skywalker');
    const [password, setPassword] = useState("19BBY");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        const userInfo = await AuthService.login({
            userName: userName,
            password: password
        });

        console.log(userInfo);

        // NOTE request to api login here instead of this fake promise
        // await new Promise(r => setTimeout(r(), 1000));
        history.push("/");
        setLoading(false);
    };

    if (loading) {
        return <h4>Logging in...</h4>;
    }

    return (
        <div style={{marginTop: "1rem"}}>
            <h1>Explore planets </h1>
            <Jumbotron>
            <form onSubmit={handleSubmit}>

                <h3>Login</h3>
                <InputGroup className="mb-3">
                    <FormControl
                        value={userName}
                        type="text" onChange={e => setUserName(e.target.value)} placeholder="Character name"
                                 className="mr-sm-2"/>
                </InputGroup>

                <InputGroup className="mb-3">
                    <FormControl
                        value={password}
                        type="password" onChange={e => setPassword(e.target.value)} placeholder="Character name"
                        className="mr-sm-2"/>
                </InputGroup>

               {/* <input
                    type="text"
                    placeholder="Enter email address"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />*/}
                {/*<input
                    type="password"
                    placeholder="Enter email address"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />*/}
                <input type="submit" value="Login"/>
            </form>
            </Jumbotron>
        </div>
    );
};

export default Login;