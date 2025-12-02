#!/bin/bash

# Download Deity Images from Drik Panchang
# This script downloads images for all 22 deities

BASE_URL="https://www.drikpanchang.com"
GODS_DIR="src/assets/images/Gods"
GODDESSES_DIR="src/assets/images/Goddesses"

# Create directories if they don't exist
mkdir -p "$GODS_DIR"
mkdir -p "$GODDESSES_DIR"

echo "🕉️  Downloading Deity Images from Drik Panchang"
echo "================================================"

# Function to download and convert image
download_image() {
    local url=$1
    local output_path=$2
    local deity_name=$3
    
    echo "📥 Downloading: $deity_name..."
    
    # Download the image
    curl -s "$BASE_URL$url" -o "$output_path.tmp"
    
    # Check if download was successful
    if [ -f "$output_path.tmp" ]; then
        # Convert to PNG if needed (using sips on macOS)
        if command -v sips &> /dev/null; then
            sips -s format png "$output_path.tmp" --out "$output_path" > /dev/null 2>&1
            rm "$output_path.tmp"
        else
            mv "$output_path.tmp" "$output_path"
        fi
        echo "   ✅ Saved: $output_path"
    else
        echo "   ❌ Failed to download"
        return 1
    fi
}

echo ""
echo "🕉️  GODS (Male Deities)"
echo "----------------------"

# Gods
download_image "/images/lyrics/gods/xlord_ganesha.png.pagespeed.ic.WSttxeVvHi.png" "$GODS_DIR/ganesha.png" "Ganesha"
download_image "/images/lyrics/gods/xlord_vishnu.png.pagespeed.ic.tZfMry7uui.png" "$GODS_DIR/vishnu.png" "Vishnu"
download_image "/images/lyrics/gods/xnataraj.png.pagespeed.ic.Wg3iYciAp-.png" "$GODS_DIR/shiva.png" "Shiva"
download_image "/images/lyrics/gods/lord_krishna.png.pagespeed.ce.p9thlOHqIl.png" "$GODS_DIR/krishna.png" "Krishna"
download_image "/images/lyrics/gods/xlord_rama.png.pagespeed.ic.3YWrewErFI.png" "$GODS_DIR/rama.png" "Rama"
download_image "/images/lyrics/gods/xlord_hanuman.png.pagespeed.ic.joqilab8XC.png" "$GODS_DIR/hanuman.png" "Hanuman"
download_image "/images/lyrics/gods/xlord_brahma.png.pagespeed.ic.lOfEcS11f1.jpg" "$GODS_DIR/brahma.png" "Brahma"
download_image "/images/lyrics/gods/xlord_kartikeya.png.pagespeed.ic.lF6LoHBSdp.png" "$GODS_DIR/kartikeya.png" "Kartikeya"
download_image "/images/lyrics/gods/xlord_narasimha.png.pagespeed.ic.wlfq8f3ezC.png" "$GODS_DIR/narasimha.png" "Narasimha"
download_image "/images/lyrics/gods/xlord_kubera.png.pagespeed.ic.mLEyxdDoFh.png" "$GODS_DIR/kuber.png" "Kuber"
download_image "/images/lyrics/gods/xsatyanarayan_puja.png.pagespeed.ic.9WHZ7pXRvG.png" "$GODS_DIR/satyanarayan.png" "Satyanarayan"
download_image "/images/lyrics/gods/xlord_hayagriva.png.pagespeed.ic.BJzI1L_wMC.png" "$GODS_DIR/hayagriva.png" "Hayagriva"
download_image "/images/lyrics/gods/lord_kalabhairav.png.pagespeed.ce.MRjvFCEJTY.png" "$GODS_DIR/bhairava.png" "Bhairava"
download_image "/images/lyrics/gods/xlord_kartikeya.png.pagespeed.ic.lF6LoHBSdp.png" "$GODS_DIR/murugan.png" "Murugan"

echo ""
echo "🌸 GODDESSES (Female Deities)"
echo "-----------------------------"

# Goddesses
download_image "/images/lyrics/goddesses/xgoddess_lakshmi.png.pagespeed.ic.P0aKGmGy88.png" "$GODDESSES_DIR/lakshmi.png" "Lakshmi"
download_image "/images/lyrics/goddesses/xmata_durga.png.pagespeed.ic.Evj54yd4JF.png" "$GODDESSES_DIR/durga.png" "Durga"
download_image "/images/lyrics/goddesses/xmata_saraswati.png.pagespeed.ic.ooHAaeD2up.png" "$GODDESSES_DIR/saraswati.png" "Saraswati"
download_image "/images/lyrics/goddesses/xgoddess_radha.png.pagespeed.ic.1nd1QxWp8l.png" "$GODDESSES_DIR/radha.png" "Radha"
download_image "/images/festivals/120x120/xsita_navami.png.pagespeed.ic.CPlOgsOGof.png" "$GODDESSES_DIR/sita.png" "Sita"
download_image "/images/lyrics/goddesses/maa_ganga.png.pagespeed.ce.DY5kxc5rjS.png" "$GODDESSES_DIR/ganga.png" "Ganga"
download_image "/images/lyrics/goddesses/lalita_mata.png.pagespeed.ce.DpGn3iEldt.png" "$GODDESSES_DIR/lalita.png" "Lalita"
download_image "/images/lyrics/goddesses/xtulasi_mata.png.pagespeed.ic.z5XKxwnhzu.png" "$GODDESSES_DIR/tulasi.png" "Tulasi"

echo ""
echo "================================================"
echo "📊 SUMMARY"
echo "================================================"

# Count downloaded images
gods_count=$(ls -1 "$GODS_DIR"/*.png 2>/dev/null | wc -l | xargs)
goddesses_count=$(ls -1 "$GODDESSES_DIR"/*.png 2>/dev/null | wc -l | xargs)
total_count=$((gods_count + goddesses_count))

echo "✅ Gods images: $gods_count/14"
echo "✅ Goddesses images: $goddesses_count/8"
echo "✅ Total images: $total_count/22"
echo ""
echo "🎉 Image download complete!"
echo ""
echo "📁 Images saved to:"
echo "   - $GODS_DIR/"
echo "   - $GODDESSES_DIR/"
echo ""
