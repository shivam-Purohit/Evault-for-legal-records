/**
 * @desc Execute this file to create and enroll an admin at court1.
 */

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, enrollAdmin } = require('./CAUtil');
const { buildCCPcourt1, buildWallet } = require('./AppUtil.js');
const adminCourt1 = 'court1admin';
const adminCourt1Passwd = 'court1lithium';

const mspCourt1 = 'court1MSP';
const walletPath = path.join(__dirname, './wallet');

// Temporary DB
// const { addUser } = require('./Court1LocalDB.js');

/**
 * @description This functions enrolls the admin of court1
 */
exports.enrollAdmincourt1 = async function() {
  try {
    // build an in-memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPcourt1();

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.court1.lithium.com');

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);

    // to be executed only once per organization. Enrolls admin and creates admin in the wallet
    await enrollAdmin(caClient, wallet, mspCourt1, adminCourt1, adminCourt1Passwd);

    console.log('msg: Successfully enrolled admin user ' + adminCourt1 + ' and imported it into the wallet');
  } catch (error) {
    console.error(`Failed to enroll admin user ' + ${adminCourt1} + : ${error}`);
    process.exit(1);
  }
};
