# test_model.py

import os
import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models
from PIL import Image

# Configuración
device = torch.device("cpu")
model_path = "modelo_mejor.pth"

# Transformaciones (iguales a las de validación)
test_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Cargar modelo
model = models.resnet50(weights=None)  # Sin pesos preentrenados, usaremos los guardados
num_classes = 14
model.fc = nn.Linear(model.fc.in_features, num_classes)
model.load_state_dict(torch.load(model_path, map_location=device))
model = model.to(device)
model.eval()

# Función para predecir una imagen desde una ruta manual
def predict_image(image_path):
    try:
        # Cargar y transformar la imagen
        image = Image.open(image_path).convert("RGB")
        image = test_transform(image).unsqueeze(0).to(device)  # Añade dimensión de batch

        with torch.no_grad():
            output = model(image)
            probs = torch.sigmoid(output).cpu().numpy()[0]  # Probabilidades por clase

        diseases = ['Atelectasis', 'Cardiomegaly', 'Consolidation', 'Edema', 
                    'Effusion', 'Emphysema', 'Fibrosis', 'Hernia', 'Infiltration', 
                    'Mass', 'Nodule', 'Pleural_Thickening', 'Pneumonia', 'Pneumothorax']
        predictions = {disease: prob for disease, prob in zip(diseases, probs)}

        # Generar mensaje
        detected_conditions = [disease for disease, prob in predictions.items() if prob > 0.5]
        message = "Análisis completado. "
        if detected_conditions:
            message += f"Se detectaron las siguientes condiciones: {', '.join(detected_conditions)}."
        else:
            message += "No se detectaron condiciones significativas (probabilidad < 0.5 para todas)."

        return predictions, message, diseases
    except Exception as e:
        print(f"Error al procesar la imagen: {str(e)}")
        return None, None, None

# Solicitar ruta de la imagen al usuario
image_path = input("Ingresa la ruta completa de la imagen (ej. C:\\ruta\\a\\imagen.png): ")
predictions, message, diseases = predict_image(image_path)

# Imprimir resultados si la predicción fue exitosa
if predictions:
    print(f"\n{message}")
    print("\nDetalles de probabilidades:")
    for disease, prob in predictions.items():
        print(f"{disease}: {prob:.4f} {'(Presente)' if prob > 0.3 else ''}")

    # Opcional: Comparar con etiqueta real si la imagen está en el CSV
    import pandas as pd
    csv_file = r"C:\Users\MiLo\Desktop\proyecto_medico\Data\chestxray14\Data_Entry_2017_v2020.csv"
    df = pd.read_csv(csv_file)
    img_name = os.path.basename(image_path)
    match = df[df['Image Index'] == img_name.replace('.png', '')]
    if not match.empty:
        finding = match.iloc[0]['Finding Labels']
        true_label = [1 if disease in finding else 0 for disease in diseases]
        print("\nEtiquetas reales (1 = presente, 0 = ausente):")
        for disease, val in zip(diseases, true_label):
            print(f"{disease}: {val}")