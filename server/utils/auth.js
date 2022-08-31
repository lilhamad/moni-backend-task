import { Cypher } from './cypher';
let { AES_KEY, IV_KEY} = process.env;
const cypher = new Cypher(AES_KEY, IV_KEY);


let {KEY } = process.env;

export default class Auth {


  static async setHeader () {
    try {
      return {
        'Authorization':'Bearer' + KEY
      };
    } catch (error) {
      return {status: false, message: "getAll " + JSON.stringify(error) + error.message};
    }
  };
}