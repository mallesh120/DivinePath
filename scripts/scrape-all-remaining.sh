#!/bin/bash
# Comprehensive Deity Scraper - All Remaining Deities

echo "🕉️  Scraping All Deities from Drik Panchang"
echo "=========================================="
echo ""

SUCCESS=0
FAILED=0
TOTAL=0

scrape_deity() {
    local url=$1
    local id=$2
    local title=$3
    local category=$4
    local desc=$5
    
    TOTAL=$((TOTAL + 1))
    
    echo "[$TOTAL] Scraping: $title..."
    
    if node scripts/scrape-universal.js "$url" "$id" "$title" "$category" "$desc" 2>&1 | grep -q "✅ Scraping completed successfully"; then
        SUCCESS=$((SUCCESS + 1))
        echo "   ✅ Success"
    else
        FAILED=$((FAILED + 1))
        echo "   ❌ Failed"
    fi
    
    sleep 2
}

# GODS
echo "📿 GODS:"
echo ""

scrape_deity \
    "https://www.drikpanchang.com/deities-namavali/gods/lord-kartikeya/108-kartikeya-names.html" \
    "kartikeya" \
    "Lord Kartikeya" \
    "god" \
    "The God of War, son of Shiva and Parvati"

scrape_deity \
    "https://www.drikpanchang.com/deities-namavali/gods/lord-narasimha/108-narasimha-names.html" \
    "narasimha" \
    "Lord Narasimha" \
    "god" \
    "The Man-Lion avatar of Vishnu"

scrape_deity \
    "https://www.drikpanchang.com/deities-namavali/gods/lord-kuber/108-kuber-names.html" \
    "kuber" \
    "Lord Kuber" \
    "god" \
    "The God of Wealth and Prosperity"

scrape_deity \
    "https://www.drikpanchang.com/deities-namavali/gods/lord-narayan/108-satyanarayan-names.html" \
    "satyanarayan" \
    "Lord Satyanarayan" \
    "god" \
    "A form of Lord Vishnu"

scrape_deity \
    "https://www.drikpanchang.com/deities-namavali/gods/lord-hayagriva/108-hayagriva-names.html" \
    "hayagriva" \
    "Lord Hayagriva" \
    "god" \
    "The horse-headed avatar of Vishnu"

scrape_deity \
    "https://www.drikpanchang.com/deities-namavali/gods/lord-bhairava/108-batuka-bhairava-names.html" \
    "bhairava" \
    "Lord Bhairava" \
    "god" \
    "A fierce manifestation of Shiva"

scrape_deity \
    "https://www.drikpanchang.com/deities-namavali/gods/lord-murugan/108-murugan-names.html" \
    "murugan" \
    "Lord Murugan" \
    "god" \
    "The Tamil God, another name for Kartikeya"

# GODDESSES
echo ""
echo "🌸 GODDESSES:"
echo ""

scrape_deity \
    "https://www.drikpanchang.com/deities-namavali/goddesses/radharani/108-radharani-names.html" \
    "radha" \
    "Goddess Radha" \
    "goddess" \
    "The consort of Lord Krishna, embodiment of divine love"

scrape_deity \
    "https://www.drikpanchang.com/deities-namavali/goddesses/sita/108-sita-names.html" \
    "sita" \
    "Goddess Sita" \
    "goddess" \
    "The consort of Lord Rama, embodiment of virtue"

scrape_deity \
    "https://www.drikpanchang.com/deities-namavali/goddesses/ganga/108-ganga-names.html" \
    "ganga" \
    "Goddess Ganga" \
    "goddess" \
    "The sacred river goddess"

scrape_deity \
    "https://www.drikpanchang.com/deities-namavali/goddesses/lalita/108-lalita-names.html" \
    "lalita" \
    "Goddess Lalita" \
    "goddess" \
    "A form of the Divine Mother"

scrape_deity \
    "https://www.drikpanchang.com/deities-namavali/goddesses/tulasi/108-tulasi-names.html" \
    "tulasi" \
    "Goddess Tulasi" \
    "goddess" \
    "The sacred plant goddess, consort of Vishnu"

echo ""
echo "=========================================="
echo "📊 FINAL SUMMARY:"
echo "   ✅ Successful: $SUCCESS/$TOTAL"
echo "   ❌ Failed: $FAILED/$TOTAL"
echo ""
echo "📁 All files saved in: scripts/output/"
echo ""

# Show all deities we have
echo "📋 Complete Deity List:"
ls -1 scripts/output/*-ashtottaram.js | sed 's/.*\///' | sed 's/-ashtottaram.js//' | nl

echo ""
echo "✅ Scraping Complete!"
