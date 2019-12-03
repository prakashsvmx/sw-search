import React, {useState} from "react";
import AuthService from "../../service/AuthService";

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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter email address"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter email address"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
};

export default Login;