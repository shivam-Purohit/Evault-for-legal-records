
const {initialize} = require("../utils/utils")
const handleGetAttorney = async(req,res)=>{
    try{
        const attorneyId = req.params.id;
        const caseId = req.query.caseId;
        console.log("Hit this route for admin ID:", attorneyId);
        console.log("Query parameter caseId:", caseId);
        const gateway = await initialize(attorneyId)
        const network = await gateway.getNetwork(process.env.CHANNEL_NAME);
        const contract = network.getContract(process.env.CC_NAME);

        const caseDetails = await contract.evaluateTransaction("ReadAsset", caseId);
        const parsedResult = JSON.parse(caseDetails.toString());
        console.log(parsedResult);  
        res.send(JSON.stringify(parsedResult))
    }
    catch(e){
        console.log(e);
    }
}



module.exports={handleGetAttorney}