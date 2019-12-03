import axios from 'axios';
import API_CONSTANTS from "../service/Constants";

const sessionKey = 'userInfo';

class AuthService {
    static getUserInfo() {
        const authUser = sessionStorage.getItem(sessionKey);
        if (authUser) {
            return JSON.parse(authUser);
        }
        return authUser;
    }

    static logout() {
        sessionStorage.removeItem(sessionKey);
        return null;
    }

    static async login({
                           userName,
                           password
                       }) {

        const loginResult = await axios.get(`${API_CONSTANTS.PEOPLE}?name=${encodeURIComponent(userName)}`);
        const {
            data: {
                results
            }
        } = loginResult;
        let userInfo = null;
        if (results.length) {

            for (let res = 0; res < results.length; res += 1) {
                const {
                    name,
                    birth_year
                } = results[res];

                if (birth_year === password && name === userName) {
                    userInfo = {
                        name: name,
                        birthYear: birth_year
                    };
                    sessionStorage.setItem(sessionKey, JSON.stringify(userInfo))
                }
            }
        }

        return userInfo;

    }
}


export default AuthService;