/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
            
            {
                ID: 'client1',
                FirstName: 'John',
                LastName: 'Doe',
                caseNo: '12345',
                caseDescription: `John Doe is the plaintiff in a personal injury case against ABC Company. 
                On July 15, 2023, Mr. Doe was involved in a car accident caused by the negligence of the 
                defendant's employee. As a result of the accident, Mr. Doe suffered severe injuries, 
                including multiple fractures and head trauma. He incurred substantial medical expenses, 
                lost wages, and experienced significant pain and suffering. This case seeks compensation 
                for the damages and losses incurred by Mr. Doe.`,
                // Additional dummy data
                Age: 35,
                Gender: 'Male',
                Address: '123 Main Street',
                Email: 'john.doe@example.com',
                Phone: '+1 (555) 555-5555',
                Attorney: 'Jane Smith',
                HearingDate: '2023-10-15',
                Documents: ['Document 1', 'Document 2', 'Document 3'],
                Notes: 'Client is seeking compensation for medical expenses and pain and suffering.',
            },
            {
                ID: 'client2',
                FirstName: 'Alice',
                LastName: 'Smith',
                caseNo: '54321',
                caseDescription: `Alice Smith is the plaintiff in a personal injury case against XYZ Corporation. 
                On September 10, 2023, Ms. Smith was injured in a slip-and-fall accident at one of the 
                defendant's retail stores. She suffered a broken arm and other injuries due to the 
                hazardous conditions. Ms. Smith is seeking compensation for her medical expenses and 
                the pain and suffering she endured.`,
                Age: 28,
                Gender: 'Female',
                Address: '456 Elm Street',
                Email: 'alice.smith@example.com',
                Phone: '+1 (555) 123-4567',
                Attorney: 'John Johnson',
                HearingDate: '2023-11-20',
                Documents: ['Photographs', 'Medical Records'],
                Notes: 'Client is claiming negligence on the part of the store.',
            },
            
            {
                ID: 'client3',
                FirstName: 'David',
                LastName: 'Wilson',
                caseNo: '98765',
                caseDescription: `David Wilson has filed a personal injury lawsuit against ACME Construction 
                Company. On March 5, 2023, Mr. Wilson was injured at a construction site due to a 
                scaffolding collapse. He sustained severe back injuries and is seeking compensation for 
                his medical bills, lost income, and ongoing rehabilitation.`,
                Age: 40,
                Gender: 'Male',
                Address: '789 Oak Avenue',
                Email: 'david.wilson@example.com',
                Phone: '+1 (555) 789-0123',
                Attorney: 'Sarah Davis',
                HearingDate: '2023-12-10',
                Documents: ['Accident Report', 'Witness Statements'],
                Notes: 'Client alleges construction company negligence.',
            }, {
                ID: 'client4',
                FirstName: 'Emily',
                LastName: 'Brown',
                caseNo: '24680',
                caseDescription: `Emily Brown is pursuing a personal injury claim against Oceanview Resorts. 
                During her vacation on August 8, 2023, she slipped and fell near the pool area, 
                sustaining injuries to her knee and wrist. Ms. Brown is seeking compensation for her 
                medical expenses and the impact on her holiday experience.`,
                Age: 32,
                Gender: 'Female',
                Address: '101 Beach Boulevard',
                Email: 'emily.brown@example.com',
                Phone: '+1 (555) 987-6543',
                Attorney: 'Michael Miller',
                HearingDate: '2023-11-05',
                Documents: ['Incident Report', 'Medical Bills'],
                Notes: 'Client claims negligence in resort maintenance.',
            }, {
                ID: 'client5',
                FirstName: 'Robert',
                LastName: 'Johnson',
                caseNo: '13579',
                caseDescription: `Robert Johnson is the plaintiff in a personal injury lawsuit against 
                Sunshine Motors. On June 20, 2023, Mr. Johnson was involved in a car accident caused by 
                a defective brake system in his new car. He suffered neck and back injuries and is 
                seeking compensation for medical costs and vehicle damage.`,
                Age: 45,
                Gender: 'Male',
                Address: '321 Pine Lane',
                Email: 'robert.johnson@example.com',
                Phone: '+1 (555) 321-9876',
                Attorney: 'Laura Lewis',
                HearingDate: '2023-10-25',
                Documents: ['Accident Report', 'Vehicle Repair Receipts'],
                Notes: 'Client alleges product liability against the car manufacturer.',
            },{
                ID: 'client6',
                FirstName: 'Sophia',
                LastName: 'Davis',
                caseNo: '86420',
                caseDescription: `Sophia Davis is pursuing a personal injury claim against GreenFields 
                Sports Club. While playing tennis on May 12, 2023, Ms. Davis slipped on a wet court, 
                leading to a knee injury. She seeks compensation for her medical bills and the impact 
                on her sports activities.`,
                Age: 26,
                Gender: 'Female',
                Address: '567 Park Avenue',
                Email: 'sophia.davis@example.com',
                Phone: '+1 (555) 567-4321',
                Attorney: 'Daniel White',
                HearingDate: '2023-11-15',
                Documents: ['Incident Report', 'Medical Records'],
                Notes: 'Client claims negligence in sports club maintenance.',
            }
            
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }
    async CreateAsset(ctx, ID, FirstName, LastName, caseNo, caseDescription, Age, Gender, Address, Email, Phone, Attorney, HearingDate, Documents, Notes) {
        const exists = await this.AssetExists(ctx, ID);
        if (exists) {
            throw new Error(`The client with ID ${ID} already exists`);
        }
    
        const client = {
            ID,
            FirstName,
            LastName,
            caseNo,
            caseDescription,
            Age,
            Gender,
            Address,
            Email,
            Phone,
            Attorney,
            HearingDate,
            Documents,
            Notes,
        };
    
        // We insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(ID, Buffer.from(stringify(sortKeysRecursive(client))));
        return JSON.stringify(client);
    }
    

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, id, color, size, owner, appraisedValue) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            ID: id,
            Color: color,
            Size: size,
            Owner: owner,
            AppraisedValue: appraisedValue,
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    async TransferAsset(ctx, id, newOwner) {
        const assetString = await this.ReadAsset(ctx, id);
        const asset = JSON.parse(assetString);
        const oldOwner = asset.Owner;
        asset.Owner = newOwner;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldOwner;
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = AssetTransfer;
