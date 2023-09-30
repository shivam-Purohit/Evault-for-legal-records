const express = require('express')
const app = express();
const cors = require('cors')
const path = require('path')
app.use(cors())
const port = 8001
app.use(express.static(path.join(__dirname, 'views')));





const redis = require('redis')
const {enrollAdmincourt1} =  require('./enrollCourt1.js')
const {enrollAdmincourt2} = require('./enrollCourt2.js')
app.listen(port,async()=>{
    // console.log(`listening at ${port}`)
    // const ccp = buildCCPOrg1();
    // const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
	// const wallet = await buildWallet(Wallets, walletPath);

	// await enrollAdmin(caClient, wallet, mspOrg1);


	// await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
	// console.log("listening at 8000")
    await enrollAdmincourt1();
    await enrollAdmincourt2();
    await initRedis();
    await enrollAndRegisterLawyers();
 
})

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function initRedis() {
    let redisUrl = 'redis://127.0.0.1:6379';
    let redisPassword = 'hosp1lithium';
    let redisClient = redis.createClient(redisUrl);
    redisClient.AUTH(redisPassword);
    redisClient.SET('hosp1admin', redisPassword);
    redisClient.QUIT();
  
    redisUrl = 'redis://127.0.0.1:6380';
    redisPassword = 'hosp2lithium';
    redisClient = redis.createClient(redisUrl);
    redisClient.AUTH(redisPassword);
    redisClient.SET('hosp2admin', redisPassword);
    console.log('Done');
    redisClient.QUIT();
    return;
  }

async function enrollAndRegisterLawyers() {
    try {
      const jsonString = fs.readFileSync('./initDoctors.json');
      const lawyers = JSON.parse(jsonString);
      for (let i = 0; i < lawyers.length; i++) {
        const attr = {firstName: lawyers[i].firstName, lastName: lawyers[i].lastName, role: 'lawyer', speciality: lawyers[i].speciality};
        // Create a redis client and add the doctor to redis
        lawyers[i].hospitalId = parseInt(lawyers[i].hospitalId);
        const redisClient = createRedisClient(lawyers[i].hospitalId);
        (await redisClient).SET('HOSP' + lawyers[i].hospitalId + '-' + 'DOC' + i, 'password');
        await enrollRegisterUser(lawyers[i].hospitalId, 'HOSP' + lawyers[i].hospitalId + '-' + 'DOC' + i, JSON.stringify(attr));
        (await redisClient).QUIT();
      }
    } catch (error) {
      console.log(error);
    }
  };