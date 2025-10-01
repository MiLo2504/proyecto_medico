from database import get_db_connection

def create_user(user):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = """
        INSERT INTO user (name, email, password, created_at, updated_at)
        VALUES (%s, %s, %s, NOW(), NOW())
    """
    values = (user.name, user.email, user.password)
    cursor.execute(sql, values)
    conn.commit()
    user_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return {"id_user": user_id, "message": "Usuario creado exitosamente"}

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
    cursor.execute("SELECT * FROM user WHERE id_user = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    return user

def update_user(user_id: int, user):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = """
        UPDATE user
        SET name=%s, email=%s, password=%s, updated_at=NOW()
        WHERE id_user=%s
    """
    values = (user.name, user.email, user.password, user_id)
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Usuario actualizado exitosamente"}

def delete_user(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM user WHERE id_user=%s", (user_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Usuario eliminado exitosamente"}
