#!/usr/bin/env python3
"""
Parse Hanuman (or other deity) names from drikpanchang.com HTML
Handles the specific format where data is in a single line per name
"""

import requests
from bs4 import BeautifulSoup
import re
import json

def parse_drikpanchang_names(url):
    """Parse 108 names from drikpanchang.com"""
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    names = []
    
    # Find all divs or elements that might contain name data
    # The pattern seems to be: Sanskrit + Number + Sanskrit Mantra + English Mantra + Meaning
    content = soup.get_text()
    
    # Pattern: Sanskrit word, number, Om mantra, meaning
    # Example: आञ्जनेय1ॐ आञ्जनेयाय नमः।Om Anjaneyaya Namah।जो देवी अञ्जना के पुत्र हैं
    
    # Split by numbers followed by Om (Devanagari)
    pattern = r'([^\d]+?)(\d+)(ॐ [^।]+।)(Om [^।]+।)([^।]+)'
    
    matches = re.findall(pattern, content, re.UNICODE)
    
    for match in matches:
        sanskrit = match[0].strip()
        number = int(match[1])
        mantra_sanskrit = match[2].strip()
        mantra_english = match[3].strip()
        meaning_hindi = match[4].strip()
        
        # Extract transliteration from English mantra
        # "Om Anjaneyaya Namah" -> "Anjaneya"
        trans_match = re.search(r'Om (.+?)(?:ya|aya)? Namah', mantra_english)
        if trans_match:
            transliteration = trans_match.group(1)
            # Clean up common suffixes
            transliteration = transliteration.replace('ya', '').replace('aya', '').strip()
            if not transliteration:
                # Use the Sanskrit word as fallback
                transliteration = sanskrit
        else:
            transliteration = sanskrit
        
        # We need English meaning, but the page has Hindi
        # For now, use the Hindi meaning (user can translate or we can add translation API)
        meaning = meaning_hindi
        
        name_obj = {
            'number': number,
            'sanskrit': sanskrit,
            'transliteration': transliteration,
            'mantraSanskrit': mantra_sanskrit,
            'mantra': mantra_english.replace('।', ''),
            'meaning': meaning
        }
        
        names.append(name_obj)
        
        if len(names) >= 108:
            break
    
    return names

def format_javascript(names):
    """Format for JavaScript"""
    output = "names: [\n"
    for i, name in enumerate(names):
        comma = "," if i < len(names) - 1 else ""
        output += f"  {{ number: {name['number']}, sanskrit: '{name['sanskrit']}', "
        output += f"transliteration: '{name['transliteration']}', "
        output += f"mantraSanskrit: '{name['mantraSanskrit']}', "
        output += f"mantra: '{name['mantra']}', "
        output += f"meaning: '{name['meaning']}' }}{comma}\n"
    output += "]\n"
    return output

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python parse_drikpanchang.py <url>")
        sys.exit(1)
    
    url = sys.argv[1]
    print(f"Parsing: {url}\n")
    
    names = parse_drikpanchang_names(url)
    
    print(f"✅ Found {len(names)} names\n")
    print("="*80)
    print(format_javascript(names))
    
    # Save JSON
    with open('hanuman_108.json', 'w', encoding='utf-8') as f:
        json.dump(names, f, ensure_ascii=False, indent=2)
    
    print("\n✅ Saved to hanuman_108.json")
