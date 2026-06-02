import os
import sys
import re

# Try importing PIL (Pillow), install if missing
try:
    from PIL import Image
except ImportError:
    print("Pillow library is not installed. Installing it now...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def find_images(directory):
    """Find all PNG images in the specified directory and its subdirectories."""
    image_paths = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.png'):
                # Ignore ramayana.png and mahabharata.png if they are small, or keep them if they are fine.
                # Let's convert all PNGs under src/assets/images since they are all web assets.
                image_paths.append(os.path.join(root, file))
    return image_paths

def convert_to_webp(image_path, quality=80):
    """Convert PNG image to WebP format, delete original, return sizes."""
    orig_size = os.path.getsize(image_path)
    
    # Generate new path
    webp_path = os.path.splitext(image_path)[0] + '.webp'
    
    # Open and convert
    with Image.open(image_path) as img:
        # If image has alpha channel, preserve it
        img.save(webp_path, 'WEBP', quality=quality)
        
    new_size = os.path.getsize(webp_path)
    
    # Remove original PNG
    os.remove(image_path)
    
    return orig_size, new_size, webp_path

def update_code_references(src_directory, filename_mappings):
    """Update all code references in JS, JSX, CSS, HTML files from .png to .webp."""
    # Build regex patterns from mappings
    # We want to replace occurrences of 'filename.png' with 'filename.webp'
    count = 0
    for root, dirs, files in os.walk(src_directory):
        for file in files:
            if file.endswith(('.js', '.jsx', '.css', '.html')):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content
                modified = False
                for old_name, new_name in filename_mappings.items():
                    # Match imports or direct string references to the image file
                    # e.g., 'aranya_scene1.png' -> 'aranya_scene1.webp'
                    if old_name in new_content:
                        new_content = new_content.replace(old_name, new_name)
                        modified = True
                
                if modified:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated references in: {file}")
                    count += 1
    return count

def main():
    assets_dir = "/Users/mallesh/DivinePath/src/assets/images"
    src_dir = "/Users/mallesh/DivinePath/src"
    
    if not os.path.exists(assets_dir):
        print(f"Error: Assets directory {assets_dir} does not exist.")
        return
        
    print(f"🔍 Searching for PNG images in {assets_dir}...")
    png_images = find_images(assets_dir)
    print(f"Found {len(png_images)} PNG images.")
    
    if not png_images:
        print("No PNG images found to optimize.")
        return
        
    total_orig_size = 0
    total_new_size = 0
    mappings = {}
    
    print("\n⚡ Converting images to WebP and deleting original PNGs...")
    for idx, img_path in enumerate(png_images):
        filename = os.path.basename(img_path)
        print(f"[{idx+1}/{len(png_images)}] Converting {filename}...")
        try:
            orig_size, new_size, webp_path = convert_to_webp(img_path)
            webp_filename = os.path.basename(webp_path)
            mappings[filename] = webp_filename
            
            saved = orig_size - new_size
            saved_pct = (saved / orig_size) * 100
            print(f"   Original: {orig_size / (1024*1024):.2f} MB | WebP: {new_size / (1024*1024):.2f} MB | Saved: {saved / (1024*1024):.2f} MB ({saved_pct:.1f}%)")
            
            total_orig_size += orig_size
            total_new_size += new_size
        except Exception as e:
            print(f"   ❌ Error converting {filename}: {e}")
            
    print("\n🔄 Updating references in code files...")
    updated_files_count = update_code_references(src_dir, mappings)
    
    saved_total = total_orig_size - total_new_size
    saved_total_pct = (saved_total / total_orig_size) * 100 if total_orig_size > 0 else 0
    
    print("\n🎉 Optimization Complete!")
    print(f"==================================================")
    print(f"Total Original Size: {total_orig_size / (1024*1024):.2f} MB")
    print(f"Total WebP Size:     {total_new_size / (1024*1024):.2f} MB")
    print(f"Total Space Saved:   {saved_total / (1024*1024):.2f} MB ({saved_total_pct:.1f}%)")
    print(f"Updated references in {updated_files_count} code files.")
    print(f"==================================================")

if __name__ == "__main__":
    main()
