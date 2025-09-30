from src.dataset import ChestXrayDataset
from torchvision import transforms

# Paths
csv_file = "../Data/chestxray14/Data_Entry_2017_v2020.csv"
images_dir = "../Data/chestxray14/images"

# Transformación simple para ver que cargue
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

dataset = ChestXrayDataset(csv_file, images_dir, transform=transform)

print("Tamaño del dataset:", len(dataset))
img, label = dataset[0]
print("Primera imagen shape:", img.shape)
print("Etiqueta:", label)
