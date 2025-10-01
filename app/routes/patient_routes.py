from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import date
import controllers.patient_controller as patient_controller

router = APIRouter(
    prefix="/patients",
    tags=["patients"]
)

# Schema de entrada
class Patient(BaseModel):
    name: str
    date_birthday: date
    address: str
    phone: str
    id_user: int
    id_doctor: int

@router.post("/")
def create_patient(patient: Patient):
    return patient_controller.create_patient(patient)

@router.get("/")
def get_patients():
    return patient_controller.get_all_patients()

@router.get("/{patient_id}")
def get_patient(patient_id: int):
    patient = patient_controller.get_patient_by_id(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")
    return patient

@router.put("/{patient_id}")
def update_patient(patient_id: int, patient: Patient):
    return patient_controller.update_patient(patient_id, patient)

@router.delete("/{patient_id}")
def delete_patient(patient_id: int):
    return patient_controller.delete_patient(patient_id)
