const {initialize} = require("../utils/utils")


const handleGetAdmin = async (req, res) => {
  const adminId = req.params.id;
  const caseId = req.query.caseId;
  console.log("Hit this route for admin ID:", adminId);
  console.log("Query parameter caseId:", caseId);
  const gateway = await initialize(adminId)
  const network = await gateway.getNetwork(process.env.CHANNEL_NAME);
  const contract = network.getContract(process.env.CC_NAME);

  // await contract.submitTransaction('InitLedger');
  const caseDetails = await contract.evaluateTransaction("GetAllAssets");
  const parsedResult = JSON.parse(caseDetails.toString());
  console.log(parsedResult);
  res.send(JSON.stringify(parsedResult))

}


const handleAdminPost = async (req, res) => {
    const data = req.body;
    console.log(data);
    const gateway = await initialize("admin1")
    const network = await gateway.getNetwork(process.env.CHANNEL_NAME);
    const contract = network.getContract(process.env.CC_NAME);
     
    const temp = {
      ID:data.ID,
      prosecutorDetails: {
        Id: data.prosecutorId,
        FirstName: data.prosecutorDetails.FirstName,
        LastName:data.prosecutorDetails.LastName,
        Age: data.prosecutorDetails.Age,
        Gender: data.prosecutorDetails.Gender,
        Address: data.prosecutorDetails.Address,
        Email: data.prosecutorDetails.Email,
        Phone: data.prosecutorDetails.Phone,
      },
      defenderDetails: {
        Id: data.defenderId,
        FirstName: data.DefenderDetails.FirstName,
        LastName: data.DefenderDetails.LastName,
        Age: data.DefenderDetails.Age,
        Gender: data.DefenderDetails.Gender,
        Address: data.DefenderDetails.Address,
        Email: data.DefenderDetails.Email,
        Phone: data.DefenderDetails.Phone,
      },
      caseDescription: data.caseDescription,
      attorney: {
        prosecutionAttorney: {
          Id: data.Attorney.prosecutionAttorney.Id,
          Name: data.Attorney.prosecutionAttorney.Name,
        },
        DefenderAttorney: {
          Id: data.Attorney.DefenderAttorney.Id,
          Name: data.Attorney.DefenderAttorney.Name,
        },
      },
      hearingDate:data.HearingDate,
      documents: {
        clientDocuments: [],
        policeDocuments:[],
        AttorneyDocuments:[]
      },
      hearings:[],
      currentHearing:{
        hearingNumber: 3,
        date: "2023-12-10",
        details: "Details recorded during the current hearing...",
        verdict: "Verdict of the current hearing...",
      },
      Notes:data.Notes
    }
    const result = await contract.submitTransaction("CreateAsset", JSON.stringify(temp));
    console.log(JSON.parse(result))
  }

module.exports = {handleGetAdmin ,handleAdminPost}
