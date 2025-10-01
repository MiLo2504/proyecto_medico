from database import get_db_connection

def create_patient(patient):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = """
        INSERT INTO patient (name, date_birthday, address, phone, id_user, id_doctor, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW())
    """
    values = (patient.name, patient.date_birthday, patient.address, patient.phone, patient.id_user, patient.id_doctor)
    cursor.execute(sql, values)
    conn.commit()
    patient_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return {"id_patient": patient_id, "message": "Paciente creado exitosamente"}

def get_all_patients():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM patient")
    patients = cursor.fetchall()
    cursor.close()
    conn.close()
    return patients

def get_patient_by_id(patient_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM patient WHERE id_patient = %s", (patient_id,))
    patient = cursor.fetchone()
    cursor.close()
    conn.close()
    return patient

def update_patient(patient_id: int, patient):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = """
        UPDATE patient
        SET name=%s, date_birthday=%s, address=%s, phone=%s, id_user=%s, id_doctor=%s, updated_at=NOW()
        WHERE id_patient=%s
    """
    values = (patient.name, patient.date_birthday, patient.address, patient.phone, patient.id_user, patient.id_doctor, patient_id)
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Paciente actualizado exitosamente"}

def delete_patient(patient_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM patient WHERE id_patient=%s", (patient_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Paciente eliminado exitosamente"}
