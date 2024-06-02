from fastapi import FastAPI
import requests
from file_handling import (
    parse_txt_to_json,
    parse_yaml_to_json,
    parse_csv_to_json,
    parse_xml_to_json,
    parse_json_to_txt
)

app = FastAPI()

@app.get("/node/txt")
def read_txt():
    response = requests.get("http://localhost:8080/txt").json()
    return response

@app.get("/node/csv")
def read_csv():
    response = requests.get("http://localhost:8080/csv").json()
    return response

@app.get("/node/json")
def read_json():
    response = requests.get("http://localhost:8080/json").json()
    return response

@app.get("/node/xml")
def read_xml():
    response = requests.get("http://localhost:8080/xml").json()
    return response

@app.get("/node/yaml")
def read_yaml():
    response = requests.get("http://localhost:8080/yaml").json()
    return response


@app.get("/p/txt")
def read_p_txt():
    return parse_txt_to_json()

@app.get("/p/csv")
def read_p_csv():
    return parse_csv_to_json()

@app.get("/p/json")
def read_p_json():
    return parse_json_to_txt()

@app.get("/p/xml")
def read_p_xml():
    return parse_xml_to_json()

@app.get("/p/yaml")
def read_p_yaml():
    return parse_yaml_to_json()