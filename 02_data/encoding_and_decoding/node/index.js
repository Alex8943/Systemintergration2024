const string = "Hello world"; 

const encodedString = Buffer.from(string).toString('base64');

console.log("Encoded value: " + encodedString);


const decodedString = Buffer.from(encodedString, 'base64').toString('utf-8');

console.log(decodedString);