import os
import pandas as pd
import torch
from torch.utils.data import Dataset
from PIL import Image

class ChestXrayDataset(Dataset):
    def __init__(self, csv_file, img_dir, transform=None):
        self.labels = pd.read_csv(csv_file)
        self.img_dir = img_dir
        self.transform = transform
        self.diseases = ['Atelectasis', 'Cardiomegaly', 'Consolidation', 'Edema', 
                         'Effusion', 'Emphysema', 'Fibrosis', 'Hernia', 'Infiltration', 
                         'Mass', 'Nodule', 'Pleural_Thickening', 'Pneumonia', 'Pneumothorax']

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        img_name = self.labels.iloc[idx]["Image Index"]
        if not img_name.endswith(".png"):
            img_name += ".png"
        img_path = os.path.join(self.img_dir, img_name)
        try:
            image = Image.open(img_path).convert("RGB")
        except FileNotFoundError:
            print(f"Archivo no encontrado: {img_path}")
            image = Image.new("RGB", (128, 128), (0, 0, 0))

        finding = self.labels.iloc[idx]["Finding Labels"]
        label = [1 if disease in finding else 0 for disease in self.diseases]
        label = torch.FloatTensor(label)

        if self.transform:
            image = self.transform(image)

        return image, label