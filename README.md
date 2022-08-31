# Moni wallet task


run:
npm run start:dev

migrate:
npm run migrate

seed:
npm run seed

Fund endpoint:
url:{baseUrl}/fund
payload : 
pass {
    "userId" : 1,
    "amount" : 10
}


Transfer endpoint:
url:{baseUrl}/transfer
payload:
{
    "senderId" : 1,
    "amount" : 1.149,
    "recipientId" : 2
}