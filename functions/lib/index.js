"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const env = functions.config();
const algoliasearch = require("algoliasearch");
// Initialize the Algolia Client
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('zoo_search');
exports.indexAnimal = functions.firestore
    .document('zoo/{animalId}')
    .onCreate((snap, context) => {
    const data = snap.data();
    const objectId = snap.id;
    // Add the data to the algolia index
    return index.addObject(Object.assign({ objectId }, data));
});
exports.unindexAnimal = functions.firestore
    .document('zoo/{animalId}')
    .onDelete((snap, context) => {
    const objectId = snap.id;
    // Delete an ID from the index
    return index.deleteObject(objectId);
});
//# sourceMappingURL=index.js.map