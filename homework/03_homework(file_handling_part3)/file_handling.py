import json
import csv
import yaml
import xml.etree.ElementTree as ET


def parse_txt_to_json():
    try:
        file_path = '../my_files/my.txt'
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()

        result = {}

        for line in lines:
            key, value = map(str.strip, line.split(':'))
            result[key] = value

        json_result = json.dumps(result, indent=2)

        return json_result

    except Exception as error:
        print("Error with txt file:", error)

def parse_yaml_to_json():
    try:
        file_path = '../my_files/my.yaml'
        with open(file_path, 'r', encoding='utf-8') as file:
            yaml_content = file.read()

        json_result = yaml.safe_load(yaml_content)

        return json.dumps(json_result, indent=2)

    except Exception as error:
        print("Error with yaml file:", error)

def parse_csv_to_json():
    try:
        file_path = '../my_files/my.csv'
        with open(file_path, 'r', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file)
            json_result = [row for row in csv_reader]

        return json.dumps(json_result, indent=2)

    except Exception as error:
        print("Error with csv file:", error)

def parse_xml_to_json():
    try:
        file_path = '../my_files/my.xml'
        with open(file_path, 'r', encoding='utf-8') as file:
            xml_content = file.read()

        root = ET.fromstring(xml_content)
        xml_dict = {}

        for child in root:
            xml_dict[child.tag] = child.text

        json_result = json.dumps(xml_dict, indent=2)

        return json_result

    except Exception as error:
        print("Error with xml file:", error)

def parse_json_to_txt():
    try:
        file_path = '../my_files/my.json'
        with open(file_path, 'r', encoding='utf-8') as file:
            json_content = file.read()

        obj = json.loads(json_content)
        result = '\n'.join([f"{key}: {value}" for key, value in obj.items()])

        return result

    except Exception as error:
        print("Error with json file:", error)

def remove_nested_arrays(obj):
    for key, value in obj.items():
        if isinstance(value, list) and len(value) == 1:
            obj[key] = value[0]
            
            # Convert numeric strings to numbers
            if isinstance(obj[key], str) and obj[key].replace('.', '', 1).isdigit():
                obj[key] = float(obj[key])
        elif isinstance(value, dict):
            remove_nested_arrays(value)

