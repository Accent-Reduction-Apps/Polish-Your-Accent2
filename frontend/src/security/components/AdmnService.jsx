import axios from 'axios';
import authHeader from "../auth/auth-header";

const API_URL = 'http://localhost:8080/user/';

class AdmnService {
    async activate(userId) {
        // const headers = authHeader();
        let reqaddr = API_URL + userId + '/deactivate';
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(reqaddr);
        console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
        let headers = new Headers;
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin','http://localhost:3000');
        headers.append('Authorization:', 'Bearer ' + user.accessToken);

        fetch(reqaddr, {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',
            headers: headers
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => console.log('Authorization failed: ' + error.message));
    }

    async deactivate(userId) {
        // const headers = authHeader();
        const headers = null;
        try {
            const response = await axios.post(API_URL + userId + '/deactivate', {}, { headers });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to deactivate user ${userId}: ${error.message}`);
        }
    }
}

export default new AdmnService();
