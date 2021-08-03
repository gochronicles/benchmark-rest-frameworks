import os
import uvicorn
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def hello():
    return "Hello World"


if __name__ == "__main__":
    workers = os.cpu_count()
    print(f"Number of CPUs: {workers}")
    uvicorn.run(app, host="0.0.0.0", port=3000, workers=workers, log_level="critical")
