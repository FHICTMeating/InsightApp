import ApiRequester from "./ApiRequester";

export class JoinGameEndpoint extends ApiRequester {
  constructor() {
    super('isPresent/');
  }
}
