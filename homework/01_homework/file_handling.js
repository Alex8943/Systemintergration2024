import { parseString } from 'xml2js';
import fs from 'fs';


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

        const result = {};

        lines.forEach(line => {
            // Split each line into key and value
            const [key, value] = line.split(' ').map(part => part.trim());

            // Add key-value pair to the result object
            result[key] = value;
        });

        const jsonResult = JSON.stringify(result, null, 2);

        return jsonResult;

    }catch(error){
        console.error("Error with yaml file: ", error)
    }

}

export function parseCSVToJson() {
    try {
        const filePath = '../my_files/my.csv';
        const csvContent = fs.readFileSync(filePath, 'utf8');
        const lines = csvContent.split('\n');

        const result = [];

        const headers = lines[0].split(',').map(part => part.trim());

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const values = line.split(',').map(part => part.trim());

            // Create an object with key-value pairs for the current line
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index];
            });

            // Add the object to the result array
            result.push(row);
        }

        const jsonResult = JSON.stringify(result, null, 2);

        return jsonResult;

    } catch (error) {
        console.error("Error with csv file: ", error);
    }
}


export function parseXmlToJson() {
    try {
        const filePath = '../my_files/my.xml';
        const xmlContent = fs.readFileSync(filePath, 'utf8');

        let jsonResult;

        parseString(xmlContent, { trim: true }, (err, result) => {
            if (err) {
                throw err;
            }

            // The 'result' is the parsed JavaScript object
            jsonResult = result;
        });

        return JSON.stringify(jsonResult, null, 2);

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


