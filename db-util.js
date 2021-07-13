const assert = require('assert');

function updateDB(dbObj, dataToUpdate) {
  const collect= dbObj.collection('bmiData');
  collect.insertOne(dataToUpdate, function(err, result) {
    // assert.equal(err, null);
    // assert.equal(1, result.result.n);
    console.log("inserted succesfully");
  })
}

exports.updateDB = updateDB;
