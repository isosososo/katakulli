from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance, ImageFilter

src = Path('C:/Users/İsmail/Desktop/6165e080-f9ab-42a3-bf39-76b5a7ffd147.png')
dst = Path('C:/Users/İsmail/Desktop/katakulli-qr-stage-main/public/uploads/ismail-sait-erdogan.png')

img = Image.open(src).convert('RGB')
width, height = img.size

crop = img.crop((int(width * 0.12), int(height * 0.06), int(width * 0.88), int(height * 0.96)))
img = crop.resize((int(crop.width * 2.2), int(crop.height * 2.2)), Image.Resampling.LANCZOS)
img = ImageOps.autocontrast(img)
img = ImageEnhance.Contrast(img).enhance(2.7)
img = ImageEnhance.Brightness(img).enhance(1.12)
img = ImageEnhance.Sharpness(img).enhance(5.0)
img = img.filter(ImageFilter.UnsharpMask(radius=2.2, percent=300, threshold=1))
img = ImageEnhance.Color(img).enhance(0.8)

img.save(dst, format='PNG', optimize=True, compress_level=9)
print(f'Saved: {dst}')
print(f'Size: {img.size[0]}x{img.size[1]}')
