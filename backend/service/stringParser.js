import { actions } from "./constants.js";

export function stringParser(s = "") {
  const array = [];
  for (const char of s) {
    if (char === " ") {
      continue;
    } else if (array.length === 0) {
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