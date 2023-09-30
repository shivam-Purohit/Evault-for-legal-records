'use strict';

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../fabric-samples/test-application/javascript/CAUtil');
const { buildCCPOrg1, buildWallet } = require('../fabric-samples/test-application/javascript/AppUtil');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'sumit';

const ejs = require('ejs');
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Use 'templates' as the folder name

// Get the contract from the network.

function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function initialize() {
    const ccp = buildCCPOrg1();
    // const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
    const wallet = await buildWallet(Wallets, walletPath);
    // await enrollAdmin(caClient, wallet, mspOrg1);
    // await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }
    });
    return gateway;
}

// Initialize the gateway and contract
const initializePromise = initialize();
// Serve static files from the 'public' directory

app.listen(8003, () => {
    console.log('Server is running on port 8003');
});

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/client', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'client.html'));
});

app.post('/client', (req, res) => {
    // Get the client ID from the request body
    console.log(req.body.clientID)
    const clientID = req.body.clientID;
    // Assuming you want to construct the /client:<userid> route
    const redirectRoute = `/client/${clientID}`;
    // Redirect to the constructed route
    res.redirect(redirectRoute);
});

// Get the client using the client id
app.get('/client/:id', async (req, res) => {
    const userId = req.params.id;
    console.log('\n--> Evaluate Transaction: ReadAsset, function returns an asset with a given assetID');
    try {
        const gateway = await initializePromise; // Wait for the initialization to complete
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        await contract.submitTransaction('InitLedger');
        const result = await contract.evaluateTransaction('ReadAsset', userId);
        console.log(`*** Result: ${prettyJSONString(result.toString())}`);

        // Send the result as JSON in the response
        const parsedResult = JSON.parse(result.toString());
        res.render('client-details', { clientDetails: parsedResult });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: error.message });
    }
});

app.get('/admin', async (req, res) => {
    try {
        const gateway = await initializePromise; // Wait for the initialization to complete
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        // Fetch the result from your contract's transaction here
        const result = await contract.evaluateTransaction('GetAllAssets'); // Replace 'YourAdminTransaction' with the actual admin transaction

        

        // Send the result as JSON in the response
        const parsedResult = JSON.parse(result.toString());
        res.render('admin-details', { clients: parsedResult });
        
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: error.message });
    }
});

app.post('/admin', async (req, res) => {
    // Implement your POST admin route logic here
});

app.get('/admin/add-client', async(req,res)=>{
     res.render('add-client')
})

app.post('/admin/add-client', async (req, res) => {
    const data = req.body;
    console.log(data);
    const gateway = await initializePromise; // Wait for the initialization to complete
    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    const result = await contract.submitTransaction(
        'CreateAsset',
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
});
