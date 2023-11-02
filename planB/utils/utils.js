
const { Gateway, Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const fs = require('fs')
const AWS = require('aws-sdk')
const {
  buildCAClient,
  registerAndEnrollUser,
  enrollAdmin,
} = require("../../fabric-samples/test-application/javascript/CAUtil");

const {
  buildCCPOrg1,
  buildWallet,
} = require("../../fabric-samples/test-application/javascript/AppUtil");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-south-1',
});

const s3 = new AWS.S3();


async function initialize(user) {
  const mspOrg1 = "Org1MSP";
  const walletPath = path.join(__dirname, "../wallet");
  const org1UserId = user;
   
    const ccp = buildCCPOrg1();
    const caClient = buildCAClient(FabricCAServices, ccp, "ca.org1.example.com");
    const wallet = await buildWallet(Wallets, walletPath);
    await enrollAdmin(caClient, wallet, mspOrg1);
    await registerAndEnrollUser(
      caClient,
      wallet,
      mspOrg1,
      org1UserId,
      "org1.department1"
    );
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });
    console.log("i m in gateway")
    return gateway;
  }
  

function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  }


async function handleS3Upload(file){
  const uniqueFilename = uuidv4() + '-' + file.originalname;

  const fileStream = fs.createReadStream(file.path);

  const params = {
    Bucket: 'myawsbucket0510sank/sih_uploads',
    Key: uniqueFilename,
    Body: fileStream,
    ContentType: 'application/pdf', // Set the content type for the browser to understand the file type
    ContentDisposition: 'inline', // Display the file in the browser
  };
  

  try {
    const data = await s3.upload(params).promise();
    console.log(`File uploaded to ${data.Location}`);
    fs.unlinkSync(file.path);
    return data.Location
  } catch (err) {
    console.error('Error uploading file to S3', err);
    
  }
}
module.exports = {initialize, prettyJSONString ,handleS3Upload}