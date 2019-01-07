import axios from 'axios';

// const BASE_PATH = "http://innovationsconnect.herokuapp.com/";
const BASE_PATH = "http://localhost:3030/";

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

	GetDetails(gameId, playerId) {
		console.log(this.PATH + gameId + "/sequencegame/" + playerId);
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
	
	//Get role of player
	getRole(gameId, playerId) {
		var json = getDetails(gameId, playerId);
		return json.playerRole;
	}

	//Get content for player
	getContent(gameId, playerId) {
		var json = getDetails(gameId, playerId);
		return json.content;
	}

	//boolean checking if statement is correct
	statementCheck(gameId, sentence) {
		return axios({
			method: 'POST',
			url: this.PATH + "sequencegame/",
			headers: {
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache',
				'Expires': 0,
				'Access-Control-Allow-Origin': '*'
            },
            answer: sentence
		});
	}

	//Answering the statement
	answerStatement(gameId, sentence) {
		return axios({
			method: 'POST',
			url: this.PATH + "sequencegame/answer/" + gameId,
			headers: {
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache',
				'Expires': 0,
				'Access-Control-Allow-Origin': '*'
            },
            answer: sentence
		});
	}

    Post(body) {
        return axios({
			method: 'POST',
			url: this.PATH,
			headers: {
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache',
				'Expires': 0,
				'Access-Control-Allow-Origin': '*'
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