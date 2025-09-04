from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from core.supabase import supabase as sb

router = APIRouter()

class WaitlistIn(BaseModel):
    email: EmailStr

@router.post("/waitlist", status_code=status.HTTP_201_CREATED, tags=["Public"])
def join_waitlist(payload: WaitlistIn):
    try:
        result = sb.table("waitlist_email").insert({"email": payload.email}).execute()
        return {"ok": True}
    except Exception as e:
        error_msg = str(e).lower()
        if "duplicate" in error_msg or "unique" in error_msg:
            raise HTTPException(status_code=409, detail="Email already joined")
        raise HTTPException(status_code=500, detail=f"Insert failed: {str(e)}")