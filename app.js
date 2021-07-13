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
// Use connect method to connect to the server
client.connect((err) => {
  console.log("error", err);
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  dbObj= db;
  console.log(dbObj);
  processData(dbObj)
  // client.close();
});
function processData(dbObj){
  fileSystemObject.readFile('./sample.json', 'utf-8', (err, data)=> {
    var dateFromFile = JSON.parse(data);
    console.log(dbObj);
    dateFromFile.forEach((singleData)=> {
      bmiObj.calculateBMIandUpdateDB(singleData.gender,singleData.height,singleData.weight, dbObj);
    });
    client.close();
  })
}
// fileSystemObject.readFile('./sample.json', 'utf-8', (err, data)=> {
//   var dateFromFile = JSON.parse(data);
//   console.log(dbObj);
//   dateFromFile.forEach((singleData)=> {
//     bmiObj.calculateBMIandUpdateDB(singleData.gender,singleData.height,singleData.weight, dbObj);
//   });
//   client.close();
// })
