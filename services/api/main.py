from fastapi import FastAPI

app = FastAPI()

@app.get("/healthz")
async def h(): 
    return {"status":"ok"}
