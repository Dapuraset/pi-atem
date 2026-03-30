from fastapi import FastAPI
from relayer import process_user

app = FastAPI()

@app.post("/process")
def process(data: dict):
    user = data["user"]
    address = data["address"]

    result = process_user(user, address)

    return result
