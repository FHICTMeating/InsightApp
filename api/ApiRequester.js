import axios from 'axios';

const BASE_PATH = "http://innovationsconnect.herokuapp.com/";
// const BASE_PATH = "http://localhost:3030/";

class ApiRequester {

    constructor(path_extension) {
        this.PATH = BASE_PATH + path_extension;
    }

    Get() {
        return axios({
			method: 'GET',
			url: this.PATH,
			//withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache',
				'Expires': 0,
				'Access-Control-Allow-Origin': '*'
			}
		});
    }

    GetDetails(id) {
		console.log(this.PATH + id);
        return axios({
			method: 'GET',
			url: this.PATH + id,
			//withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache',
				'Expires': 0,
				'Access-Control-Allow-Origin': '*'
			}
		});
    }

    Post(body) {
        return axios({
			method: 'POST',
			url: this.PATH + '?test=true',
			headers: {
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache',
				'Expires': 0,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: body
		});
    }

    Put(id, body){
        return axios({
			method: 'PUT',
			url: this.PATH + id,
			headers: {
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache',
				'Expires': 0,
				'Access-Control-Allow-Origin': '*'
            },
            data: body
		});
    }

    delete(id) {
        return axios({
			method: 'DELETE',
			url: this.PATH + id,
			headers: {
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache',
				'Expires': 0,
				'Access-Control-Allow-Origin': '*'
			}
		});
    }
}

export default ApiRequester;
