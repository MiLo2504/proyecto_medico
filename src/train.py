# train.py

import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, random_split
import torchvision.transforms as transforms
import torchvision.models as models
from sklearn.metrics import roc_auc_score
import numpy as np

# Importamos nuestra clase del dataset
from dataset import ChestXrayDataset

if __name__ == '__main__':
    # ==========================
    # Configuración inicial
    # ==========================

    dataset_dir = r"C:\Users\MiLo\Desktop\ia_medica"

    batch_size = 4  # Manteniendo bajo para CPU
    num_epochs = 10
    learning_rate = 0.0001  # Reducido para afinación fina

    device = torch.device("cpu")
    print(f"Entrenando en: {device}")

    # ==========================
    # Preparar el dataset
    # ==========================

    csv_file = r"C:\Users\MiLo\Desktop\entrenamiento_IA\src\Data_Entry_2017_v2020.csv"
                
    train_transform = transforms.Compose([
        transforms.Resize((224, 224)),  # Ajustado para ResNet50
        transforms.RandomHorizontalFlip(p=0.5),
        transforms.RandomRotation(10),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalización ImageNet
    ])

    val_transform = transforms.Compose([
        transforms.Resize((224, 224)),  # Ajustado para ResNet50
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalización ImageNet
    ])

    train_dataset_full = ChestXrayDataset(csv_file, dataset_dir, transform=train_transform)
    val_dataset_full = ChestXrayDataset(csv_file, dataset_dir, transform=val_transform)

    train_size = int(0.8 * len(train_dataset_full))
    val_size = len(train_dataset_full) - train_size
    train_dataset, val_dataset = random_split(train_dataset_full, [train_size, val_size])

    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=0)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, num_workers=0)

    print(f"Total de imágenes: {len(train_dataset_full)}")
    print(f"Entrenamiento: {len(train_dataset)}, Validación: {len(val_dataset)}")

    # ==========================
    # Definir la red neuronal
    # ==========================

    model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
    # Congelar todas las capas excepto las últimas (layer4)
    for param in model.parameters():
        param.requires_grad = False
    for param in model.layer4.parameters():
        param.requires_grad = True  # Descongelar layer4 para afinación
    num_classes = 14
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    model = model.to(device)

    print("Modelo cargado con ResNet50 (layer4 descongelado)")
    print(f"Número de clases: {num_classes}")

    # ==========================
    # Función de pérdida y optimizador
    # ==========================

    criterion = nn.BCEWithLogitsLoss()

    optimizer = optim.Adam(model.parameters(), lr=learning_rate)

    # ==========================
    # Loop de entrenamiento con early stopping
    # ==========================

    best_val_loss = float("inf")
    patience = 3
    epochs_no_improve = 0

    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        correct_train = 0
        total_train = 0

        for images, labels in train_loader:
            print("Procesando lote")
            images, labels = images.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
            preds = torch.sigmoid(outputs) > 0.5
            correct_train += (preds == labels).sum().item()
            total_train += labels.numel()

        train_loss = running_loss / len(train_loader)
        train_acc = correct_train / total_train

        model.eval()
        val_loss = 0.0
        correct_val = 0
        total_val = 0
        all_preds = []
        all_labels = []

        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)
                val_loss += loss.item()
                preds = torch.sigmoid(outputs)
                all_preds.append(preds.cpu().numpy())
                all_labels.append(labels.cpu().numpy())
                binary_preds = preds > 0.5
                correct_val += (binary_preds == labels).sum().item()
                total_val += labels.numel()

        val_loss /= len(val_loader)
        val_acc = correct_val / total_val
        all_preds = np.concatenate(all_preds)
        all_labels = np.concatenate(all_labels)
        auc = roc_auc_score(all_labels, all_preds, average='macro') if all_labels.shape[1] > 1 else 0.0

        print(f"Época [{epoch+1}/{num_epochs}]")
        print(f" Pérdida entrenamiento: {train_loss:.4f}, Precisión: {train_acc:.4f}")
        print(f" Pérdida validación:   {val_loss:.4f}, Precisión: {val_acc:.4f}")
        print(f" AUC-ROC validación:   {auc:.4f}")

        torch.save(model.state_dict(), "modelo.pth")
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save(model.state_dict(), "modelo_mejor.pth")
            print("✅ Modelo mejorado guardado")
            epochs_no_improve = 0
        else:
            epochs_no_improve += 1

        if epochs_no_improve >= patience:
            print("Early stopping activado")
            break

    print("Entrenamiento terminado")