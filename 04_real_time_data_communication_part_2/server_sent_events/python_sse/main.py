from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import StreamingResponse
from datetime import datetime
import asyncio

app = FastAPI()
template = Jinja2Templates(directory="templates")


@app.get("/")
async def read_root(request: Request):
    return template.TemplateResponse("index.html", {"request": request})


#Denne function viser, at hvert sekund vil der blive sendt en ny dato til klienten
async def dateGenerator():
    while True:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        yield f"data:{now}\n\n"
        await asyncio.sleep(1)
        
@app.get("/sse")
def sse(): 
    return StreamingResponse(dateGenerator(), media_type="text/event-stream")