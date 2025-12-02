#!/bin/bash
# Scrape Additional Deities - Most Popular First

echo "🕉️  Scraping Additional Deities from Drik Panchang"
echo "=========================================="

# Gods
echo ""
echo "📿 GODS:"
echo ""

node scripts/scrape-universal.js \
  "https://www.drikpanchang.com/deities-namavali/gods/lord-ganesha/108-ganesha-names.html" \
  "ganesha" \
  "Lord Ganesha" \
  "god" \
  "The Remover of Obstacles, son of Shiva and Parvati"

sleep 3

node scripts/scrape-universal.js \
  "https://www.drikpanchang.com/deities-namavali/gods/lord-brahma/108-brahma-names.html" \
  "brahma" \
  "Lord Brahma" \
  "god" \
  "The Creator, one of the Trimurti"

sleep 3

node scripts/scrape-universal.js \
  "https://www.drikpanchang.com/deities-namavali/gods/lord-kartikeya/108-kartikeya-names.html" \
  "kartikeya" \
  "Lord Kartikeya" \
  "god" \
  "The God of War, son of Shiva and Parvati"

sleep 3

node scripts/scrape-universal.js \
  "https://www.drikpanchang.com/deities-namavali/gods/lord-narasimha/108-narasimha-names.html" \
  "narasimha" \
  "Lord Narasimha" \
  "god" \
  "The Man-Lion avatar of Vishnu"

sleep 3

node scripts/scrape-universal.js \
  "https://www.drikpanchang.com/deities-namavali/gods/lord-kuber/108-kuber-names.html" \
  "kuber" \
  "Lord Kuber" \
  "god" \
  "The God of Wealth and Prosperity"

sleep 3

node scripts/scrape-universal.js \
  "https://www.drikpanchang.com/deities-namavali/gods/lord-narayan/108-satyanarayan-names.html" \
  "satyanarayan" \
  "Lord Satyanarayan" \
  "god" \
  "A form of Lord Vishnu"

sleep 3

# Goddesses
echo ""
echo "🌸 GODDESSES:"
echo ""

node scripts/scrape-universal.js \
  "https://www.drikpanchang.com/deities-namavali/goddesses/radharani/108-radharani-names.html" \
  "radha" \
  "Goddess Radha" \
  "goddess" \
  "The consort of Lord Krishna, embodiment of divine love"

sleep 3

node scripts/scrape-universal.js \
  "https://www.drikpanchang.com/deities-namavali/goddesses/sita/108-sita-names.html" \
  "sita" \
  "Goddess Sita" \
  "goddess" \
  "The consort of Lord Rama, embodiment of virtue"

sleep 3

node scripts/scrape-universal.js \
  "https://www.drikpanchang.com/deities-namavali/goddesses/ganga/108-ganga-names.html" \
  "ganga" \
  "Goddess Ganga" \
  "goddess" \
  "The sacred river goddess"

sleep 3

node scripts/scrape-universal.js \
  "https://www.drikpanchang.com/deities-namavali/goddesses/lalita/108-lalita-names.html" \
  "lalita" \
  "Goddess Lalita" \
  "goddess" \
  "A form of the Divine Mother"

sleep 3

echo ""
echo "=========================================="
echo "✅ Scraping Complete!"
echo ""
echo "📊 Summary:"
ls -lh scripts/output/*.js | wc -l | xargs echo "Total deity files:"
echo ""
echo "📁 Files saved in: scripts/output/"
