from fastapi import FastAPI
import requests
from datetime import datetime

app = FastAPI()

@app.get("/pythonData")
def get_date():
    return {"date": [1, 2, 3, 4, 5]}

@app.get("/datefromexpress")
def get_data_from_express(): 
    response = requests.get("http://localhost:8080/expressData").json()

    return response



