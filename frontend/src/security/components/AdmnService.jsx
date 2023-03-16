import axios from 'axios';
import authHeader from "../auth/auth-header";
import {LANGUAGES} from "../../resources/languages";

const API_URL = 'http://localhost:8080/users/';

class AdmnService {
    async activate(userId) {
        const headers = authHeader();
        try {
            const response = await axios.post(API_URL + userId + '/activate', {}, {headers});
            return response.data;
        } catch (error) {
            throw new Error(`${LANGUAGES.pl.ErrorsMessages.failedToActivateUser} ${userId}: ${error.message}`);
        }
    }

    async deactivate(userId) {
        const headers = authHeader();
        try {
            const response = await axios.post(API_URL + userId + '/deactivate', {}, {headers});
            return response.data;
        } catch (error) {
            throw new Error(`${LANGUAGES.pl.ErrorsMessages.failedToDeactivateUser} ${userId}: ${error.message}`);
        }
    }
}

export default new AdmnService();
