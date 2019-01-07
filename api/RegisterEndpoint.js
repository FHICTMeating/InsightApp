import axios from 'axios';
import ApiRequester from './ApiRequester';

class RegisterEndpoint extends ApiRequester {

    constructor() {
        super('register/')
    }
}

export default ApiRequester;