from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date

class User(BaseModel):
    id: Optional[int] = None
    user_name: str
    password: str
    first_name: str
    middle_name: Optional[str] = None
    email: str
    date_birthday: Optional[date] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    specialty: Optional[str] = None
    id_type_document: Optional[int] = None
    id_rol: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
