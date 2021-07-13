const dbUtil = require('./db-util');

function calculateBMIandUpdateDB(gender, height, weight, db) {
    let bmi = calculteBMI(height/100, weight);
    let getData = getBMICategory(bmi);
    let dbData = {
      "gender": gender,
      "height": height,
      "weight": weight,
      "bmi": bmi,
      "category": getData[0],
      "risk": getData[1]
    }
    dbUtil.updateDB(db, dbData);
}

function calculteBMI(height, weight){
  return parseFloat((weight/height).toFixed(1));
}

function getBMICategory(bmi){
  switch (true) {
      case (bmi <= 18.4):
          return ['Underweight', 'Malnutrition risk'];
      case (bmi>=18.5 && bmi <= 24.9):
          return ['Normal weight', 'Low risk'];
      case (bmi>=25 && bmi <= 29.9):
          return ['Overweight', 'Enhanced risk'];
      case (bmi>=30 && bmi <= 34.9):
          return ['Moderately obese', 'Medium risk'];
      case (bmi>=35 && bmi <= 39.9):
          return ['Severely obese', 'High risk'];
      case (bmi>=40):
          return ['very severely obese', 'Very high risk'];
  }
}

exports.calculateBMIandUpdateDB = calculateBMIandUpdateDB;
