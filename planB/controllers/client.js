const {initialize, prettyJSONString, handleS3Upload} = require("../utils/utils.js")
const AWS = require('aws-sdk');
const dummyUser = {
  userId1: "client1",
  userId2: "client2",
  userId3:"client3",
  userId4: "admin1",
  userId5: "admin2",
  userId6: "attorney1",
  userId7:"attorney2",
  password: "pass",
};


const handleGetClient = async (req, res) => {
    const userId = req.params.id;
    const caseId = req.query.caseId;
    
    try {
      const gateway = await initialize(userId)
      const network = await gateway.getNetwork(process.env.CHANNEL_NAME);
      const contract = network.getContract(process.env.CC_NAME);
      // await contract.submitTransaction('InitLedger');
      const caseDetails = await contract.evaluateTransaction("ReadAsset", caseId);
      console.log(JSON.parse(caseDetails))
      const parsedResult = JSON.parse(caseDetails.toString());
      // console.log(parsedResult.documents.clientDocuments.defenderDocuments[0])
      res.send(JSON.stringify(parsedResult))
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).json({ error: error.message });
    }
  }



const handlePostClient = async(req,res)=>{

  const userId = dummyUser.userId1;
  const caseId = dummyUser.caseId;
  const file = req.file;
  if (!file)  return res.status(400).send('No file uploaded.');
  
 const fileUrl = await handleS3Upload(file)
  
  try {
    const gateway = await initialize(userId)
    console.log("got the gateway")
    const network = await gateway.getNetwork(process.env.CHANNEL_NAME);
    const contract = network.getContract(process.env.CC_NAME);
    console.log("got the gateway")
    const caseDetails = await contract.evaluateTransaction("ReadAsset", "case1");
    const parsedResult = JSON.parse(caseDetails);
    console.log(parsedResult.prosecutorDetails.Id)
    if(parsedResult.prosecutorDetails.Id==121) {
       parsedResult.documents.clientDocuments.defenderDocuments.push(fileUrl)
    }
    else if(parsedResult.defenderDetails.Id==userId){
      parsedResult.documents.clientDocuments.defenderDocuments.append(fileUrl)
    }
    else {
      console.log("wrong")
      res.status(400).send("wrong user id")
    }
    const serializedParsedResult = JSON.stringify(parsedResult);
    const updatedAsset =await contract.submitTransaction("UpdateAsset", "case1", serializedParsedResult);
    const result = JSON.parse(updatedAsset.toString())
    console.log(result)
    res.status(200).send('file uploaded successfully to the aws s3')
  }catch(e){
      console.log(e)
  }

}
module.exports={handleGetClient, handlePostClient}