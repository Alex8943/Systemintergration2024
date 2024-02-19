import { parseString } from 'xml2js';
import fs from 'fs';


function removeNestetArrays(obj) {
    for (const key in obj) {
        if (Array.isArray(obj[key]) && obj[key].length === 1) {
            obj[key] = obj[key][0];

            // Convert numeric strings to numbers
            if (!isNaN(obj[key])) {
                obj[key] = Number(obj[key]);
            }
        } else if (typeof obj[key] === 'object') {
            removeNestetArrays(obj[key]);
        }
    }
}


export function parseTxtToJson() {
    try {
        const filePath = '../my_files/my.txt';
        const txtContent = fs.readFileSync(filePath, 'utf8');
        const lines = txtContent.split('\n');

        const result = {};

        lines.forEach(line => {
            // Split each line into key and value
            const [key, value] = line.split(':').map(part => part.trim());

            // Add key-value pair to the result object
            result[key] = value;
        });

        const jsonResult = JSON.stringify(result, null, 2);

        return jsonResult;

    } catch (error) {
        console.error("Error with txt file: ", error);
    }
}


export function parseYamlToJson(){
    try{
        const filePath = '../my_files/my.yaml';
        const yamlContent = fs.readFileSync(filePath, 'utf8');
        const lines = yamlContent.split('\n');

        const jsonResult = {};
        for(const line of lines){
            const [key, value] = line.split(':').map(part => part.trim());

            jsonResult[key] = value;
        }
        
        return JSON.stringify(jsonResult, null, 2);

    }catch(error){
        console.error("Error with yaml file: ", error)
    }
}

export function parseCSVToJson() {
    try {

        const filePath = '../my_files/my.csv';
        const csvContent = fs.readFileSync(filePath, 'utf8');

        const jsonResult = [];

        const lines = csvContent.split('\n');
        const headers = lines[0].split(',');
        
        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].split(',');
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j];

                if (headers[j].includes('\r')) {
                    obj[headers[j].replace('\r', '')] = obj[headers[j]];
                    delete obj[headers[j]];
                }
            }
            jsonResult.push(obj);
        }
    
        return JSON.stringify(jsonResult, null, 2);

    } catch (error) {
        console.error("Error with csv file: ", error);
    }
}

export function parseXmlToJson() {
    try {
        const filePath = '../my_files/my.xml';
        const xmlContent = fs.readFileSync(filePath, 'utf8');

        let jsonResult;

        parseString(xmlContent, { trim: true, merge: true }, (err, result) => {
            if (err) {
                throw err;
            }

            // The 'result' is the parsed JavaScript object
            jsonResult = result;

            // Remove arrays from the parsed object
            removeNestetArrays(jsonResult);
        });

        const formattedJsonString = JSON.stringify(jsonResult, null, 2);

        return formattedJsonString;

    } catch (error) {
        console.error("Error with xml file: ", error);
    }
}


export function parseJsonToTxt(){
    try{
        const filePath = '../my_files/my.json';
        const jsonContent = fs.readFileSync(filePath, 'utf8');
        const obj = JSON.parse(jsonContent);
        const result = Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join('\n');
        return result;
    }catch(error){
        console.error("Error with json file: ", error);
    }
}


