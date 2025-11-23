from PIL import Image, ImageDraw, ImageFont

def create_placeholder_image(text, width=200, height=200):
    img = Image.new('RGB', (width, height), color = (73, 109, 137))
    d = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", 20)
    except IOError:
        font = ImageFont.load_default()
    d.text((10,10), text, fill=(255,255,0), font=font)
    return img

if __name__ == '__main__':
    deities = ["Brahma", "Lakshmi", "Parvati", "Saraswati"]
    for deity in deities:
        img = create_placeholder_image(deity)
        img.save(f"src/assets/images/Gods/{deity.lower()}.png")
