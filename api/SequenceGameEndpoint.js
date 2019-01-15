import ApiRequester from "./ApiRequester";
import axios from 'axios';

class SequenceGameEndpoint extends ApiRequester {

    constructor() {
        super("sequencegame/")
    }

    getContentDetails(gameId, playerId) {
		console.log(this.PATH + gameId + "/" + playerId);
        return axios({
			method: 'GET',
			url: this.PATH + gameId + "/" + playerId,
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
			return this.getContentDetails(gameId, playerId).then((result) => {
                console.log("RESULT", result.data);
              return result.data;  
            });
		}

	
		//boolean checking if statement is correct
		statementCheck(gameId, sentence) {
			return axios({
				method: 'POST',
				url: this.PATH + "/" + gameId,
				headers: {
					'Cache-Control': 'no-cache',
					'Pragma': 'no-cache',
					'Expires': 0,
					'Access-Control-Allow-Origin': '*'
				},
				data: sentence
			});
		}
	
		//Answering the statement
		answerStatement(gameId, sentence) {
			return axios({
				method: 'POST',
				url: this.PATH + "/answer/" + gameId,
				headers: {
					'Cache-Control': 'no-cache',
					'Pragma': 'no-cache',
					'Expires': 0,
					'Access-Control-Allow-Origin': '*'
				},
				answer: sentence
			});
		}
}

export default SequenceGameEndpoint;