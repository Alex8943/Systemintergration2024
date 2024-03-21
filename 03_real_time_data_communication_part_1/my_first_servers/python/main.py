from fastapi  import FastAPI;

app = FastAPI()

@app.get("/")
def root(): 
    return { "Message:": "Hello World!"}

@app.get("/firstroute")
def firstroute(): 
    return { "Message:": "THIS IS MY FIRST ROUTE!"}

