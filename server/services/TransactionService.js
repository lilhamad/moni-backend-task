import database from "../infrastructure/models";
require('dotenv').config();
import Auth from "../utils/auth";
import axiosCall from '../utils/axioscall';
const {create,update, findByPk, findOneNative} = require('./RepositoryStatic');

let { PAYSTACK_URL } = process.env;

class TransactionService {

    static async fund(body){
      console.log("🚀 ~ body", body)
      try {
        let user = await findOneNative("User", {
          where: { id: body.userId },
          attributes: { exclude:  ['userId'], },
          include: [{ model: database.Credential}],
          // raw: true          
        });
        console.log("🚀 ~ user secret", user.Credential.secret)
        console.log("🚀 ~ await Auth.setHeader()", await Auth.setHeader(user.Credential.secret))
        const {data, error} = await axiosCall({
          url: PAYSTACK_URL,
          method: 'post',
          headers: await Auth.setHeader(user.Credential.secret),
          data:body
        });
        if(error) {
          console.log("🚀 ~ error", error)
          walletData.response = error;
          let newwallet = await create("wallets", JSON.stringify(walletData));
          return { status:false, message: "code:dw400 " + JSON.stringify(error?.data?.message)};
        }
        console.log("🚀 ~ data", data)
        let user2 = await findOneNative("wallets", {where: {  userId: body.userId}});
        let newData = { balance : Number(user.Wallet.balance) + body.amount } 
        let newwallet = await update("wallets", JSON.stringify(dnewDta));
        return { status:true, data: data };
      } catch (error) {
        console.log("🚀 ~ error", error)
        return {status: false, message: "create: error" + JSON.stringify(error) + error.message};
      }
    }

    static async transfer(body){
      try {
        let sender = await findOneNative("wallets", {where: {  userId: body.userId}});
        let senderData = { balance : Number(sender.balance) + body.amount } 
        let senderUpdate = await update("wallets", JSON.stringify(data));        
        
        let receiver = await findOneNative("wallets", {where: {  userId: body.userId}});
        let receiverData = { balance : Number(receiver.balance) + body.amount } 
        let receiverUpdate = await update("wallets", JSON.stringify(data));

        return { status:true, data: data };
      } catch (error) {
        return {status: false, message: "create: error" + JSON.stringify(error) + error.message};
      }
    }
  }
export default TransactionService;
