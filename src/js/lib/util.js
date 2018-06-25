import {pick, assign} from 'lodash';

export const isEven = n => n === parseFloat(n)? !(n%2) : void 0;
export const isPathName = n => window.location.pathname === n ? true : false;
export const getbytype = (arr, type) => arr.filter(o => o.type === type);
export const createValidString = str => str.split(' ').join('-').toLowerCase().replace(/[.,_`~()]/g,"");
export const getrandomInt = arr => arr[Math.floor(Math.random() * arr.length)];

export const splitIntoLines = (input, len) => {
    let i;
    let temp;
    let lineSoFar = "";
    const output = [];
    const words = input.split(' ');

    for (i = 0; i < words.length;) {
        temp = addWordOntoLine(lineSoFar, words[i]);
        if (temp.length > len) {
            if (lineSoFar.length === 0) {
                lineSoFar = temp;
                i++;
            }
            output.push(lineSoFar);
            lineSoFar = "";
        } else {
            lineSoFar = temp;
            i++;
        }
    }
    if (lineSoFar.length > 0) {
        output.push(lineSoFar);
    }
    return(output);
}

export const addWordOntoLine = (line, word) => {
    if (line.length !== 0) {
        line += " ";
    }
    return(line += word);
}

export const buildBody = (data, values, extra) => {
  data = pick(data, values);
  if (extra) data = assign(data, extra);
  return JSON.stringify(data);
};

export const getRandom = (a, n) => {
  const tmp = [];
  const arr = a.slice(0);
  const t = n > arr.length ? arr.length : n;

  for (let i = 0; i < t; i++) {
    const x = Math.floor(Math.random() * arr.length);
    tmp.push(arr[x]);
    arr.splice(x, 1);

  }

  return tmp;
}

export default {
  isEven,
  isPathName,
  splitIntoLines,
  addWordOntoLine,
  buildBody,
  getbytype,
  createValidString,
  getrandomInt,
  getRandom
}
