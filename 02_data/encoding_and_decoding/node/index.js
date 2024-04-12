const string = "something from node module"; 

const encodedString = Buffer.from(string).toString('base64');

console.log(encodedString);

const decodedString = Buffer.from(encodedString, 'base64').toString('utf-8');

console.log(decodedString);