from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class Patient(BaseModel):
    id_patient: Optional[int]  # lo dejamos opcional porque al crear no se envía
    name: str
    date_birthday: date
    address: str
    phone: str
    id_user: int
    id_doctor: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
