import {
  ADD,
  CLOSES_BRACKET,
  DIVISION,
  MULTI,
  OPEN_BRACKET,
  SUB,
} from "./constants.js";
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
  if (array[i + 1] == 0) {
    const error = new Error("Cannot divide by zero");
    throw error;
  }
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

function methCalculator(array) {
  let result = 0;
  const solveMultiAndDiv = calculateMultiAndDiv(array);
  if (solveMultiAndDiv.includes(ADD) || solveMultiAndDiv.includes(SUB)) {
    result = calculateAddAndSub(solveMultiAndDiv);
  } else {
    result = solveMultiAndDiv[solveMultiAndDiv.length - 1];
  }
  return result;
}

function calculateBrackets(array) {
  const bracketsResult = [];
  let arrayForCalculate = [];
  let isBracket = false;
  for (let i = 0; i < array.length; i++) {
    if (
      isBracket === true &&
      ![OPEN_BRACKET, CLOSES_BRACKET].includes(array[i])
    ) {
      arrayForCalculate.push(array[i]);
    } else if (array[i] === OPEN_BRACKET) {
      if (isBracket === true) {
        const error = new Error("Invalid bracket");
        throw error;
      }
      isBracket = true;
    } else if (array[i] === CLOSES_BRACKET) {
      if (isBracket === false) {
        const error = new Error("Invalid bracket");
        throw error;
      }
      isBracket = false;
      const result = methCalculator(arrayForCalculate);
      arrayForCalculate = [];
      bracketsResult.push(result);
    } else {
      bracketsResult.push(array[i]);
    }
  }
  if (isBracket === true) {
    const error = new Error("Invalid bracket");
    throw error;
  }
  return bracketsResult;
}

export function mainCalculator(string) {
  try {
    const array = stringParser(string);
    const result = calculateBrackets(array);
    const finalResult = methCalculator(result);
    return finalResult;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

