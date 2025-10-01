from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class User(BaseModel):
    id_user: Optional[int]  # opcional al crear
    user_name: str
    password: str
    first_name: str
    middle_name: Optional[str] = None
    email: EmailStr
    id_type_document: int
    id_rol: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
