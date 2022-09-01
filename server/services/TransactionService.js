import database from "../infrastructure/models";
require('dotenv').config();
import Auth from "../utils/auth";
import axiosCall from '../utils/axioscall';
const {create, update, findByPk, findOneNative} = require('./RepositoryStatic');

let { PAYSTACK_URL } = process.env;

class TransactionService {
  
  static async fund(body){
    const {userId, amount } = body;
    try {
      const {user} = await this.getUser(userId, "Credential");
      const { data, error } = await axiosCall({
        url: PAYSTACK_URL,
        method: 'post',
        headers: await Auth.setHeader(user.Credential.secret),
        data:{
          ...body,
          email : user.email
        }
      });
      if(error) {
        return { status:false, message: "code:dw400 " + JSON.stringify(error?.data?.message)};
      }
      //asuming the user has passed card info and i have receive a callback data of the success status
      let userUpdate = await this.getUser(userId, "Wallet");
      let newData = { balance : Number(userUpdate.user.Wallet.balance) + amount } 
      let updateWallet = await update("Wallet", { id: userUpdate.user.Wallet.id }, newData);
      return { status:true, data: data };
    } catch (error) {
      return {status: false, message: "create: error" + JSON.stringify(error) + error.message};
    }
  }
  
  static async transfer(body){
    const {senderId, recipientId, amount } = body;
    try {
      let sender = await findOneNative("Wallet", { where: { userId: senderId }});
      let recipient = await findOneNative("Wallet", { where: { userId: recipientId }});
      if(Number(sender.balance) < amount){
        return { status: false, message: "insuficient balance" };
      }
      let senderData = { balance : Number(sender.balance) - amount.toFixed(2) } 
      let updateSenderWallet = await update("Wallet", { userId: sender.id }, senderData);
      let recipientData = { balance : Number(recipient.balance) + amount.toFixed(2) } 
      let updateRecipientWallet = await update("Wallet", { userId: recipient.id }, recipientData);
      return { status:true, data: "Transfer success" };
    } catch (error) {
      console.log("🚀 ~ error", error)
      return {status: false, message: "fund: error" + JSON.stringify(error) + error.message};
    }
  }

  static async getUser(userId, childModel){
    try {
      let user = await findOneNative("User", {
        where: { id: userId },
        attributes: { exclude:  ['userId'], },
        include: [{ model: database[childModel]}],   
      });
      return { status:true, user: user };
    } catch (error) {
      return {status: false, message: "fund: error" + JSON.stringify(error) + error.message};
    }
  }
  
  
}
export default TransactionService;
