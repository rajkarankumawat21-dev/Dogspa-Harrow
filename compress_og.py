from PIL import Image
import os

def compress_for_whatsapp(filepath):
    try:
        img = Image.open(filepath)
        
        # Convert to RGB (in case of PNG with transparency)
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
            
        # Resize to standard OG size 1200x630
        img = img.resize((1200, 630), Image.Resampling.LANCZOS)
        
        # Save as JPEG to drastically reduce file size
        new_filepath = filepath.replace('.png', '.jpg')
        img.save(new_filepath, 'JPEG', quality=75)
        
        # Remove the old PNG
        if os.path.exists(filepath):
            os.remove(filepath)
            
        print(f"Success! Compressed image saved to {new_filepath}")
        print(f"New size: {os.path.getsize(new_filepath) / 1024:.2f} KB")
        
    except Exception as e:
        print(f"Error: {e}")

# Compress for dogspa
dogspa_path = r"c:\Users\rajka\OneDrive\Documents\Desktop\WEBPAGES\Antigravity Test\dogspa\src\app\opengraph-image.png"
if os.path.exists(dogspa_path):
    compress_for_whatsapp(dogspa_path)
