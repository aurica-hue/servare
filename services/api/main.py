from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import health, waitlist

app = FastAPI(title="Servare API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://<PROJECT>.vercel.app", "https://servare.ai"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(waitlist.router)

