const {initialize} = require("../utils/utils")


const handleGetAdmin = async (req, res) => {
  const adminId = req.params.id;
  const caseId = req.query.caseId;
  console.log("Hit this route for admin ID:", adminId);
  console.log("Query parameter caseId:", caseId);
  const gateway = await initialize(adminId)
  const network = await gateway.getNetwork(process.env.CHANNEL_NAME);
  const contract = network.getContract(process.env.CC_NAME);

  await contract.submitTransaction('InitLedger');
  const caseDetails = await contract.evaluateTransaction("GetAllAssets");
  // const detail =  await contract.evaluateTransaction("ReadAsset", caseId)
  // console.log(detail)
  console.log(caseDetails)
  const parsedResult = JSON.parse(caseDetails.toString());
  console.log(parsedResult);
  res.send(JSON.stringify(parsedResult))

}


const handleAdminPost = async (req, res) => {
    const data = req.body;
    console.log(data);
    const gateway = await initialize; 
    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
  
    const result = await contract.submitTransaction(
      "CreateAsset",
      data.ID,
      data.firstName,
      data.lastName,
      data.caseNo,
      data.caseDescription,
      data.Age,
      data.Gender,
      data.Address,
      data.Email,
      data.Phone,
      data.Attorney,
      data.HearingDate,
      data.Documents,
      data.Notes
    );
    console.log("Successfully added the client");
  }

module.exports = {handleGetAdmin ,handleAdminPost}