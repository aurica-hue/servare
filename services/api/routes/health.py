from fastapi import APIRouter

router = APIRouter()

@router.get("/healthz", tags=["Internal"])
async def health():
    return {"status": "ok"}