from pathlib import Path
from PIL import Image

src = Path('C:/Users/İsmail/Desktop/WhatsApp Image 2026-09-06 at 12.59.23.jpeg')
dst = Path('C:/Users/İsmail/Desktop/katakulli-qr-stage-main/public/uploads/serkan-aynaci.png')

img = Image.open(src).convert('RGB')
img.save(dst, format='PNG', optimize=True)
print(f'Copied: {dst}')
print(f'Size: {img.size[0]}x{img.size[1]}')
