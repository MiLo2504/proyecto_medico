import os
import pandas as pd

# Ruta al dataset
dataset_dir = os.path.join("..", "Data", "chestxray14")
csv_path = os.path.join(dataset_dir, "Data_Entry_2017_v2020.csv")

# Cargar CSV
df = pd.read_csv(csv_path)
print("Tamaño del dataset:", df.shape)
print("Primeras filas del archivo CSV:")
print(df.head())

# Seleccionamos una imagen de ejemplo
example_image = df.iloc[0]["Image Index"]
print("Ejemplo de imagen:", example_image)

# Construimos la ruta
img_path = os.path.join(dataset_dir, "images", example_image)

print("Buscando en:", img_path)
print("¿Existe?", os.path.exists(img_path))
