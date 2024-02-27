from fastapi import FastAPI

app = FastAPI()

#import datetime
# print(datetime.datetime.now())

from datetime import datetime
print(datetime.now())


print(datetime.now().strftime("%Y-%m-%d"))

# problemer med dato
# Skudår
# Fra sommer tid til vinter tid
# Unix timestamp - https://www.unixtimestamp.com/ 

#ngrok 
