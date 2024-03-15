from fastapi import FastAPI, Request, Response
import json

app = FastAPI()

#Github wekbook fungere således: 
#Når vi laver en push til vores repository, så vil github sende en POST request til vores server
#Serveren vil så modtage POST requesten og udføre en handling på det endpoint
#Så ved redeliver knappen i github så faker vi en POST request til vores server, fordi github tror at der er sket en ændring men det har det ikke. 
@app.post("/githubwebhookjson")
async def githubwebhook(request: Request):
    data = await request.body()
    #data is of type bytes, so its byte string
    print(json.loads(data))
    return


@app.post("/githubwebhookform")
async def githubwebhook(request: Request, response: Response):
    if(request.headers.get("content-type") == "application/x-www-form-urlencoded"):
        form_data = await request.form()
        payload = form_data["payload"]
        print(payload)
        response.status_code = 200
    else: 
        response.status_code = 400