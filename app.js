const bmiObj = require('./calculateBMIandUpdateDB.js');
var fileSystemObject = require('fs');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
// const url = 'mongodb://localhost:27017';
const url = 'mongodb+srv://prongs:albus@cluster0.hrpbc.mongodb.net/vamst?retryWrites=true&w=majority'

// Database Name
// const dbName = 'nodetest1';
const dbName = 'vamst';
const client = new MongoClient(url);
var dbObj;

client.connect((err) => {
  console.log("error", err);
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  processData(db);
});
function processData(dbObj){
  fileSystemObject.readFile('./sample.json', 'utf-8', (err, data)=> {
    var dateFromFile = JSON.parse(data);
    dateFromFile.forEach((singleData)=> {
      bmiObj.calculateBMIandUpdateDB(singleData.gender,singleData.height,singleData.weight, dbObj);
    });
    client.close();
  })
}
