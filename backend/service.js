const ADD = "+";
const SUB = "-";
const MULTI = "*";
const DIVISION = "/";
const actions = [ADD, SUB, MULTI, DIVISION];

function stringParser(s = "") {
  const array = [];
  for (const char of s) {
    if (array.length === 0) {
      array.push(char);
    } else if (actions.includes(char)) {
      array.push(char);
    } else {
      if (actions.includes(array[array.length - 1])) {
        array.push(char);
      } else {
        array[array.length - 1] += char;
      }
    }
  }
  return array;
}

const array = stringParser("-55+8-9+10+5");

function calculate(array) {
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
  if (i === 1) {
    result += Number(array[i - 1]) + Number(array[i + 1]);
  } else {
    result += Number(array[i + 1]);
  }
  return result;
}

function sub(i, array, result) {
  if (i === 1) {
    result += Number(array[0]) - Number(array[i + 1]);
  } else {
    result -= Number(array[i + 1]);
  }
  return result;
}

const final = calculate(array);
console.log(final);
