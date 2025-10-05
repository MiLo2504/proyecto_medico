from fastapi import HTTPException
from database import get_db_connection
from models.user_model import User
from datetime import datetime

def get_all_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user")
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return users

def get_user_by_id(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def create_user(user: User):
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.now()
    cursor.execute("""
        INSERT INTO user (user_name, password, first_name, middle_name, email, date_birthday, address, phone, specialty, id_type_document, id_rol, created_at, updated_at)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """, (
        user.user_name, user.password, user.first_name, user.middle_name, user.email,
        user.date_birthday, user.address, user.phone, user.specialty,
        user.id_type_document, user.id_rol, now, now
    ))
    conn.commit()
    user_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return {"id": user_id, "message": "User created successfully"}

def update_user(user_id: int, user: User):
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.now()
    cursor.execute("""
        UPDATE user
        SET user_name=%s, password=%s, first_name=%s, middle_name=%s, email=%s,
            date_birthday=%s, address=%s, phone=%s, specialty=%s,
            id_type_document=%s, id_rol=%s, updated_at=%s
        WHERE id=%s
    """, (
        user.user_name, user.password, user.first_name, user.middle_name, user.email,
        user.date_birthday, user.address, user.phone, user.specialty,
        user.id_type_document, user.id_rol, now, user_id
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "User updated successfully"}

def delete_user(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM user WHERE id=%s", (user_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "User deleted successfully"}
