export default {
  getObjectFromObjectArray: (arr, id) => {
    return arr.find(el => el.id === id);
  },
  getIndexFromObjectArray: (arr, id) => {
    return arr.findIndex((obj) => obj.id === id);
  },
  getCountObject: (tags) => {
    const tempObj = {};

    for (const i in tags) {
      if (tempObj[tags[i]]) {
        tempObj[tags[i]] += 1;
      } else {
        tempObj[tags[i]] = 1;
      }
    }

    return tempObj;
  },
  getTagArrayFromString: (tagString) => {

    const delimeterReg = /([\W])/g;
    const splits = tagString.split(delimeterReg);
    const tags = [];

    for (const i in splits) {
      if (splits[i].includes('#') && splits[+i + 1] && !delimeterReg.test(splits[+i + 1])) {
        tags.push(splits[i] + splits[+i + 1]);
      }
    }

    return tags;
  },
  getDuplicateTags(tags) {
    let duplicates = [], tempObj = {};

    console.log("running");

    tempObj = this.getCountObject(tags);

    for (const k in tempObj) {
      if (tempObj[k] > 1) {
        duplicates.push(k);
      }
    }

    return duplicates;
  },
  removeDuplicateTags(tags) {
    let sanitized = [], tempObj = {};

    tempObj = this.getCountObject(tags);

    for (const k in tempObj) {
      sanitized.push(k);
    }

    return sanitized;
  },
  excludeTags(tags, exclude) {
    let sanitized = [], tempObj = {};

    tempObj = this.getCountObject(tags);

    for (const i in exclude) {
      if (tempObj[exclude[i]]) {
        tempObj[exclude[i]] = 0;
      }
    }

    for (const k in tempObj) {
      if (tempObj[k] > 0) {
        sanitized.push(k);
      }
    }

    return sanitized;
  },
  stringArrayToString: (arr) => {
    let str = '';

    for (const i in arr) {
      str += arr[i] + ' ';
    }

    return str;
  },
  shuffleAndPrune: (tags, limit) => {
    let index = tags.length, temp, r, out = [];

    while (0 !== index) {
      r = Math.floor(Math.random() * index);
      index -= 1;

      temp = tags[index];
      tags[index] = tags[r];
      tags[r] = temp;
    }

    if (limit < tags.length) {
      for (let i = 0; i < limit; i++) {
        out.push(tags[i]);
      }
    } else {
      out = tags;
    }

    return out;
  }
}