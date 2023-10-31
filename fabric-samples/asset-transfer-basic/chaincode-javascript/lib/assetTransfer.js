/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

// Deterministic JSON.stringify()
const stringify = require("json-stringify-deterministic");
const sortKeysRecursive = require("sort-keys-recursive");
const { Contract } = require("fabric-contract-api");

class AssetTransfer extends Contract {
  async InitLedger(ctx) {
    const additionalRecords = [
      {
        ID: "case1",
        prosecutorDetails: {
          Id: "121",
          FirstName: "hemant",
          LastName: "Patil",
          Age: 35,
          Gender: "Male",
          Address: "123 Main Street",
          Email: "hemant.pat@example.com",
          Phone: "+1 (555) 555-5555",
        },
        defenderDetails: {
          Id: "122",
          FirstName: "Malhar",
          LastName: "Shikhare",
          Age: 35,
          Gender: "Male",
          Address: "123 Main Street",
          Email: "malhar.sikh@example.com",
          Phone: "+1 (555) 555-5555",
        },

        caseDescription: `John Doe is the plaintiff in a personal injury case against ABC Company. 
                On July 15, 2023, Mr. Doe was involved in a car accident caused by the negligence of the 
                defendant's employee. As a result of the accident, Mr. Doe suffered severe injuries, 
                including multiple fractures and head trauma. He incurred substantial medical expenses, 
                lost wages, and experienced significant pain and suffering. This case seeks compensation 
                for the damages and losses incurred by Mr. Doe.`,
        // Additional dummy data

        attorney: {
          prosecutionAttorney: {
            Id: "Attorney1",
            Name: "Jitesh Kamble",
          },
          defenderAttorney: {
            Id: "Attorney1",
            Name: "sai Kamble",
          },
        },

        hearingDate: "2023-10-15",
        documents: {
          clientDocuments: {
            procecutionDocuments: [],
            defenderDocuments: [],
          },
          policeDocuments: [],
          attorneyDocuments: {
            procecutionAttorneyDocuments: [],
            defenderAttorneyDocuments: [],
          },
        },
        hearings: [
          {
            hearingNumber: 1,
            date: "2023-10-20",
            details: "Details recorded during hearing 1...",
            verdict: "Verdict of hearing 1...",
          },
          {
            hearingNumber: 2,
            date: "2023-11-05",
            details: "Details recorded during hearing 2...",
            verdict: "Verdict of hearing 2...",
          },
          // Add more hearing records as needed...
        ],
        currentHearing: {
          hearingNumber: 3,
          date: "2023-12-15",
          details: "Details recorded during the current hearing...",
          verdict: "Verdict of the current hearing...",
        },
        Notes: "Client is seeking compensation for medical expenses and pain and suffering.",
      },
      {
        ID: "case2",
        prosecutorDetails: {
            Id: "123",
            FirstName: "Amit",
            LastName: "Verma",
            Age: 40,
            Gender: "Male",
            Address: "456 Oak Avenue",
            Email: "amit.verma@example.com",
            Phone: "+1 (555) 123-7890",
        },
        defenderDetails: {
            Id: "124",
            FirstName: "Priya",
            LastName: "Sharma",
            Age: 30,
            Gender: "Female",
            Address: "789 Elm Street",
            Email: "priya.sharma@example.com",
            Phone: "+1 (555) 987-6543",
        },
        caseDescription: `Amit Verma is the plaintiff in a personal injury case against XYZ Corporation. 
                    On August 5, 2023, Mr. Verma was injured in a workplace accident due to a faulty machine. 
                    He sustained injuries to his hand and is seeking compensation for medical expenses and lost income.`,
        attorney: {
            prosecutionAttorney: {
                Id: "Attorney2",
                Name: "Rajesh Desai",
            },
            defenderAttorney: {
                Id: "Attorney3",
                Name: "Sneha Mehta",
            },
        },
        hearingDate: "2023-11-10",
        documents: {
            clientDocuments: {
                procecutionDocuments: [],
                defenderDocuments: [],
            },
            policeDocuments: [],
            attorneyDocuments: {
                procecutionAttorneyDocuments: [],
                defenderAttorneyDocuments: [],
            },
        },
        hearings: [
            {
                hearingNumber: 1,
                date: "2023-11-15",
                details: "Details recorded during hearing 1...",
                verdict: "Verdict of hearing 1...",
            },
            {
                hearingNumber: 2,
                date: "2023-12-05",
                details: "Details recorded during hearing 2...",
                verdict: "Verdict of hearing 2...",
            },
            // Add more hearing records as needed...
        ],
        currentHearing: {
            hearingNumber: 3,
            date: "2023-12-20",
            details: "Details recorded during the current hearing...",
            verdict: "Verdict of the current hearing...",
        },
        Notes: "Client is seeking compensation for injuries sustained at the workplace.",
    },
    
    {
    ID: "case3",
    prosecutorDetails: {
        Id: "125",
        FirstName: "Snehal",
        LastName: "Jadhav",
        Age: 32,
        Gender: "Female",
        Address: "789 Pine Lane",
        Email: "snehal.jadhav@example.com",
        Phone: "+1 (555) 987-4321",
    },
    defenderDetails: {
        Id: "126",
        FirstName: "Rahul",
        LastName: "Gupta",
        Age: 38,
        Gender: "Male",
        Address: "101 Main Street",
        Email: "rahul.gupta@example.com",
        Phone: "+1 (555) 123-7890",
    },
    caseDescription: `Snehal Jadhav is pursuing a personal injury claim against GreenFields Sports Club. 
                While playing tennis on June 5, 2023, Ms. Jadhav fell due to a wet court, resulting in a knee injury. 
                She seeks compensation for her medical expenses and the impact on her sports activities.`,
    attorney: {
        prosecutionAttorney: {
            Id: "Attorney4",
            Name: "Manoj Kapoor",
        },
        defenderAttorney: {
            Id: "Attorney5",
            Name: "Pooja Sharma",
        },
    },
    hearingDate: "2023-10-25",
    documents: {
        clientDocuments: {
            procecutionDocuments: [],
            defenderDocuments: [],
        },
        policeDocuments: [],
        attorneyDocuments: {
            procecutionAttorneyDocuments: [],
            defenderAttorneyDocuments: [],
        },
    },
    hearings: [
        {
            hearingNumber: 1,
            date: "2023-11-05",
            details: "Details recorded during hearing 1...",
            verdict: "Verdict of hearing 1...",
        },
        {
            hearingNumber: 2,
            date: "2023-11-20",
            details: "Details recorded during hearing 2...",
            verdict: "Verdict of hearing 2...",
        },
        // Add more hearing records as needed...
    ],
    currentHearing: {
        hearingNumber: 3,
        date: "2023-12-10",
        details: "Details recorded during the current hearing...",
        verdict: "Verdict of the current hearing...",
    },
    Notes: "Client claims negligence in sports club maintenance.",
}

    ];

    for (const asset of additionalRecords) {
      asset.docType = "asset";
      await ctx.stub.putState(
        asset.ID,
        Buffer.from(stringify(sortKeysRecursive(asset)))
      );
    }
  }

  //create asset function
  async CreateAsset(ctx, caseDetails) {
    const objectCaseDetails = JSON.parse(caseDetails)
    const {
      ID,
      prosecutorDetails: {
        Id: prosecutorId,
        FirstName: prosecutorFirstName,
        LastName: prosecutorLastName,
        Age: prosecutorAge,
        Gender: prosecutorGender,
        Address: prosecutorAddress,
        Email: prosecutorEmail,
        Phone: prosecutorPhone,
      },
      defenderDetails: {
        Id: defenderId,
        FirstName: defenderFirstName,
        LastName: defenderLastName,
        Age: defenderAge,
        Gender: defenderGender,
        Address: defenderAddress,
        Email: defenderEmail,
        Phone: defenderPhone,
      },
      caseDescription,
      attorney: {
        prosecutionAttorney: {
          Id: prosecutionAttorneyId,
          Name: prosecutionAttorneyName,
        },
        DefenderAttorney: {
          Id: defenderAttorneyId,
          Name: defenderAttorneyName,
        },
      },
      hearingDate,
      documents: {
        clientDocuments: {
          procecutionDocuments: prosecutionDocuments,
          defenderDocuments,
        },
        policeDocuments,
        AttorneyDocuments: {
          procecutionAttorneyDocuments,
          defenderAttorneyDocuments,
        },
      },
      hearings,
      currentHearing,
      Notes,
    } = objectCaseDetails

    const exists = await this.AssetExists(ctx, ID);
    if (exists) {
      throw new Error(`The client with ID ${ID} already exists`);
    }

    const client = {
      ID,
      prosecutorDetails: {
        Id: prosecutorId,
        FirstName: prosecutorFirstName,
        LastName: prosecutorLastName,
        Age: prosecutorAge,
        Gender: prosecutorGender,
        Address: prosecutorAddress,
        Email: prosecutorEmail,
        Phone: prosecutorPhone,
      },
      defenderDetails: {
        Id: defenderId,
        FirstName: defenderFirstName,
        LastName: defenderLastName,
        Age: defenderAge,
        Gender: defenderGender,
        Address: defenderAddress,
        Email: defenderEmail,
        Phone: defenderPhone,
      },
      caseDescription,
      attorney: {
        prosecutionAttorney: {
          Id: prosecutionAttorneyId,
          Name: prosecutionAttorneyName,
        },
        defenderAttorney: {
          Id: defenderAttorneyId,
          Name: defenderAttorneyName,
        },
      },
      hearingDate,
      documents: {
        clientDocuments: {
          procecutionDocuments: prosecutionDocuments,
          defenderDocuments,
        },
        policeDocuments,
        attorneyDocuments: {
          procecutionAttorneyDocuments,
          defenderAttorneyDocuments,
        },
      },
      hearings,
      currentHearing,
      Notes,
    };
    // We insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    await ctx.stub.putState(
      ID,
      Buffer.from(stringify(sortKeysRecursive(client)))
    );
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
    async UpdateAsset(ctx, id,serializedCaseDetails) {
      const caseDetails = JSON.parse(serializedCaseDetails);
      return  ctx.stub.putState(
        id,
        Buffer.from(stringify(sortKeysRecursive(caseDetails)))
      )
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
    await ctx.stub.putState(
      id,
      Buffer.from(stringify(sortKeysRecursive(asset)))
    );
    return oldOwner;
  }

  // GetAllAssets returns all assets found in the world state.
  async GetAllAssets(ctx) {
    const allResults = [];
    // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
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
