import { Cypher } from '../utils/cypher';

class Response {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.statusCode = null;
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  json(payload) {
    return this.res.status(this.statusCode).json(payload);
  }
}
export default Response;
