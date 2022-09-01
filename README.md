# Moni wallet task


run:
npm run start:dev

migrate:
npm run migrate

seed:
npm run seed

Fund endpoint:
url:{baseUrl}/transactions/fund
payload : 
pass {
    "userId" : 1,
    "amount" : 10
}

baseUrl : https://moni-wall.herokuapp.com/api/v1

Transfer endpoint:
url:{baseUrl}/transactions/transfer
payload:
{
    "senderId" : 1,
    "amount" : 1.149,
    "recipientId" : 2
}