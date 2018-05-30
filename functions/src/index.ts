import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const env = functions.config();

import * as algoliasearch from 'algoliasearch';

// Initialize the Algolia Client
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('zoo_search');

exports.indexAnimal = functions.firestore
  .document('zoo/{animalId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectId = snap.id;

    // Add the data to the algolia index
    return index.addObject({
      objectId,
      ...data
    });
});

exports.unindexAnimal = functions.firestore
  .document('zoo/{animalId}')
  .onDelete((snap, context) => {
    const objectId = context.params.animalId;

    // Delete an ID from the index
    return index.deleteObject(objectId);
});
