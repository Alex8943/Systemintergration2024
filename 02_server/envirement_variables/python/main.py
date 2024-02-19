from dotenv import dotenv_values, load_dotenv
import os 

#example 1
val = dotenv_values()
print(val)

# exmaple 2
load_dotenv()
print(os.getenv('DB_USER'))



