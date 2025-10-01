from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import controllers.user_controller as user_controller

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

# Schema de entrada
class User(BaseModel):
    name: str
    email: str
    password: str

@router.post("/")
def create_user(user: User):
    return user_controller.create_user(user)

@router.get("/")
def get_users():
    return user_controller.get_all_users()

@router.get("/{user_id}")
def get_user(user_id: int):
    user = user_controller.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@router.put("/{user_id}")
def update_user(user_id: int, user: User):
    return user_controller.update_user(user_id, user)

@router.delete("/{user_id}")
def delete_user(user_id: int):
    return user_controller.delete_user(user_id)
