import TransactionService from "../services/TransactionService";
import Util from "../utils/Utils";
const util = new Util();

class TransactionController {
  static async test() {
    try {
    } catch (error) {
      console.log("Test" + error);
    }
  }  

  static async fund(req, res) {
    try {
      const transaction = await TransactionService.fund(req.body);
      if (transaction.status) {
        util.setSuccess(200, "Transaction sent", transaction.data);
      } else {
        util.setError(400, "Transaction Filed");
      }
      return util.send(res);
    } catch (error) {
      console.log(JSON.stringify(error));
      util.setError(400, error);
      return util.send(res);
    }
  }
  
  static async transfer(req, res) {
    try {
      const transaction = await TransactionService.transfer(req.body);
      if (transaction.status) {
        util.setSuccess(200, "Transaction sent", transaction.data);
      } else {
        util.setError(400, transaction.message);
      }
      return util.send(res);
    } catch (error) {
      console.log(JSON.stringify(error));
      util.setError(400, error);
      return util.send(res);
    }
  }
  
  
}


export default TransactionController;
