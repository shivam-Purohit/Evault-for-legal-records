/**
 * @desc Execute this file to create and enroll an admin at court2.
 */

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, enrollAdmin } = require('./CAUtil.js');
const { buildCCPcourt2, buildWallet } = require('./AppUtil.js');
const adminCourt2 = 'court2admin';
const adminCourt2Passwd = 'court2lithium';

const mspCourt2 = 'court2MSP';
const walletPath = path.join(__dirname, './wallet');

// Temporary DB
// const { addUser } = require('./Court2LocalDB.js');

/**
 * @description This function enrolls the admin of court2
 */
exports.enrollAdmincourt2 = async function() {
  try {
    // build an in-memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPcourt2();

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org2.example.com');

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);

    // to be executed only once per organization. Enrolls admin and creates admin in the wallet
    await enrollAdmin(caClient, wallet, mspCourt2, adminCourt2, adminCourt2Passwd);

    console.log('msg: Successfully enrolled admin user ' + adminCourt2 + ' and imported it into the wallet');
  } catch (error) {
    console.error(`Failed to enroll admin user ' + ${adminCourt2} + : ${error}`);
    process.exit(1);
  }
};
