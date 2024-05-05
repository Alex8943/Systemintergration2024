from fastapi import APIRouter
from pydantic import BaseModel

class Spacecraft(BaseModel):
    name: str

Spacecraft = [
    Spacecraft(name="Apollo 13"),
    Spacecraft(name="Apollo 15"),
    Spacecraft(name="Apollo 18"),
    Spacecraft(name="Apollo 19"),
]

router = APIRouter()

@router.get("/api/spacecraft/")
async def _(): 
    return Spacecraft