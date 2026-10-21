import { ADD, DIVISION, MULTI, SUB } from "./constants.js";
import { stringParser } from "./stringParser.js";

function calculateAddAndSub(array) {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === ADD) {
      result = add(i, array, result);
    } else if (array[i] === SUB) {
      result = sub(i, array, result);
    } else continue;
  }
  return result;
}

function add(i, array, result) {
  if (![ADD, SUB].includes(array[i - 2]) && i !== 0) {
    result += Number(array[i - 1]) + Number(array[i + 1]);
  } else {
    result += Number(array[i + 1]);
  }
  return result;
}

function sub(i, array, result) {
  if (![ADD, SUB].includes(array[i - 2]) && i !== 0) {
    result += Number(array[i - 1]) - Number(array[i + 1]);
  } else {
    result -= Number(array[i + 1]);
  }
  return result;
}

function calculateMultiAndDiv(array) {
  let multiAndDividResults = [];
  for (let i = 0; i < array.length; i++) {
    if (
      ![MULTI, DIVISION].includes(array[i]) &&
      ![MULTI, DIVISION].includes(array[i + 1]) &&
      ![MULTI, DIVISION].includes(array[i - 1])
    ) {
      multiAndDividResults.push(array[i]);
    }
    if (array[i] === MULTI) {
      multiAndDividResults = multi(array, i, multiAndDividResults);
    } else if (array[i] === DIVISION) {
      multiAndDividResults = division(array, i, multiAndDividResults);
    } else continue;
  }
  return multiAndDividResults;
}

function multi(array, i, multiAndDividResults) {
  if (i === 1 || ![MULTI, DIVISION].includes(array[i - 2])) {
    const multiResult = Number(array[i - 1]) * Number(array[i + 1]);
    multiAndDividResults.push(multiResult);
  } else {
    const multiResult =
      multiAndDividResults[multiAndDividResults.length - 1] *
      Number(array[i + 1]);
    multiAndDividResults.push(multiResult);
  }
  return multiAndDividResults;
}

function division(array, i, multiAndDividResults) {
  if (i === 1 || ![MULTI, DIVISION].includes(array[i - 2])) {
    const divResult = Number(array[i - 1]) / Number(array[i + 1]);
    multiAndDividResults.push(divResult);
  } else {
    const divResult =
      multiAndDividResults[multiAndDividResults.length - 1] /
      Number(array[i + 1]);
    multiAndDividResults.push(divResult);
  }
  return multiAndDividResults;
}

function mainCalculator(array) {
  let result = 0;
  const solveMultiAndDiv = calculateMultiAndDiv(array);
  if (solveMultiAndDiv.includes(ADD) || solveMultiAndDiv.includes(SUB)) {
    result = calculateAddAndSub(solveMultiAndDiv);
  } else {
    result = solveMultiAndDiv[solveMultiAndDiv.length - 1];
  }
  return result;
}

const array = stringParser("5*5+8");
const final = mainCalculator(array);
console.log(final);
console.log(5 * 5+8);
