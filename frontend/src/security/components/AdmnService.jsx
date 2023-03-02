import axios from 'axios';

const API_URL = 'http://localhost:8080/users/';

class AdmnService {
    async activate(userId) {
        // const headers = authHeader();
        const headers = null;
        try {
            const response = await axios.post(API_URL + userId + '/activate', {}, { headers });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to activate user ${userId}: ${error.message}`);
        }
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
