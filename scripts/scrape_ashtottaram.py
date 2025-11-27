#!/usr/bin/env python3
"""
Script to scrape Ashtottara Shatanamavali (108 Names) from drikpanchang.com
Usage: python scrape_ashtottaram.py <deity-url>
Example: python scrape_ashtottaram.py https://www.drikpanchang.com/hindu-names/god-names/lakshmi-names.html
"""

import sys
import requests
from bs4 import BeautifulSoup
import json
import re

def clean_text(text):
    """Clean and normalize text"""
    if not text:
        return ""
    return text.strip().replace('\n', ' ').replace('\r', '')

def extract_deity_name(soup):
    """Extract deity name from page title"""
    title = soup.find('title')
    if title:
        # Extract name from title like "108 Names of Lord Ganesha"
        match = re.search(r'108 Names of (?:Lord |Goddess |Shri |Sri )?(.+?)(?:\s*-|\s*\|)', title.text)
        if match:
            return match.group(1).strip()
    return "Unknown"

def scrape_ashtottaram(url):
    """Scrape 108 names from drikpanchang.com"""
    print(f"Fetching data from: {url}")
    
    try:
        # Add headers to mimic a browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract deity name
        deity_name = extract_deity_name(soup)
        print(f"Deity: {deity_name}")
        
        names_list = []
        
        # Find the table containing the 108 names
        # Drikpanchang typically uses a table with class 'dpTableContent' or similar
        tables = soup.find_all('table')
        
        for table in tables:
            rows = table.find_all('tr')
            
            for row in rows[1:]:  # Skip header row
                cols = row.find_all('td')
                
                if len(cols) >= 3:  # At least 3 columns: Number, Name, Meaning
                    try:
                        number = clean_text(cols[0].text)
                        
                        # Column 1 might have both Sanskrit and transliteration
                        name_cell = cols[1]
                        name_text = clean_text(name_cell.text)
                        
                        # Try to separate Sanskrit and transliteration
                        # Often they use different tags or classes
                        sanskrit_elem = name_cell.find(class_=re.compile('devanagari|sanskrit', re.I))
                        if sanskrit_elem:
                            sanskrit = clean_text(sanskrit_elem.text)
                            transliteration = name_text.replace(sanskrit, '').strip()
                        else:
                            # If no specific class, try to split by newline or pattern
                            parts = name_text.split('\n')
                            if len(parts) >= 2:
                                sanskrit = parts[0].strip()
                                transliteration = parts[1].strip()
                            else:
                                # Try to detect Devanagari script
                                devanagari_pattern = re.compile('[\u0900-\u097F]+')
                                sanskrit_match = devanagari_pattern.search(name_text)
                                if sanskrit_match:
                                    sanskrit = sanskrit_match.group(0)
                                    transliteration = name_text.replace(sanskrit, '').strip()
                                else:
                                    sanskrit = ""
                                    transliteration = name_text
                        
                        meaning = clean_text(cols[2].text)
                        
                        # Generate mantras
                        # Remove any existing "Om" or "Namah" from transliteration for mantra generation
                        clean_trans = transliteration.replace('Om', '').replace('Namah', '').strip()
                        
                        # Detect the case ending and generate appropriate Sanskrit mantra
                        if clean_trans.endswith('aya') or clean_trans.endswith('āya'):
                            mantra_sanskrit = f"ॐ {sanskrit} नमः।"
                            mantra_english = f"Om {clean_trans} Namah"
                        elif clean_trans.endswith('e') or clean_trans.endswith('ē'):
                            mantra_sanskrit = f"ॐ {sanskrit} नमः।"
                            mantra_english = f"Om {clean_trans} Namah"
                        elif clean_trans.endswith('yai') or clean_trans.endswith('ai'):
                            mantra_sanskrit = f"ॐ {sanskrit} नमः।"
                            mantra_english = f"Om {clean_trans} Namah"
                        else:
                            # Default case
                            mantra_sanskrit = f"ॐ {sanskrit} नमः।"
                            mantra_english = f"Om {clean_trans} Namah"
                        
                        name_obj = {
                            'number': int(number) if number.isdigit() else len(names_list) + 1,
                            'sanskrit': sanskrit,
                            'transliteration': transliteration,
                            'mantraSanskrit': mantra_sanskrit,
                            'mantra': mantra_english,
                            'meaning': meaning
                        }
                        
                        names_list.append(name_obj)
                        
                    except Exception as e:
                        print(f"Error parsing row: {e}")
                        continue
        
        if not names_list:
            print("No names found. The page structure might be different.")
            print("Trying alternative parsing methods...")
            
            # Try alternative parsing for different page structures
            # Look for divs or lists that might contain the names
            name_containers = soup.find_all(['div', 'li'], class_=re.compile('name|mantra', re.I))
            
            for container in name_containers[:108]:  # Limit to 108
                # Extract text and try to parse
                text = clean_text(container.text)
                if text and len(text) > 3:
                    print(f"Found potential name: {text[:50]}...")
        
        print(f"\nSuccessfully extracted {len(names_list)} names")
        
        if names_list:
            # Format output for easy copy-paste into JavaScript
            print("\n" + "="*80)
            print("FORMATTED OUTPUT FOR ashtottaramData.js:")
            print("="*80 + "\n")
            
            print("names: [")
            for i, name in enumerate(names_list):
                comma = "," if i < len(names_list) - 1 else ""
                print(f"  {{ number: {name['number']}, sanskrit: '{name['sanskrit']}', transliteration: '{name['transliteration']}', mantraSanskrit: '{name['mantraSanskrit']}', mantra: '{name['mantra']}', meaning: '{name['meaning']}' }}{comma}")
            print("]")
            
            # Also save to JSON file
            output_file = f"{deity_name.lower().replace(' ', '_')}_108_names.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump({
                    'deity': deity_name,
                    'total': len(names_list),
                    'names': names_list
                }, f, ensure_ascii=False, indent=2)
            
            print(f"\n✅ Data also saved to: {output_file}")
        
        return names_list
        
    except requests.RequestException as e:
        print(f"Error fetching URL: {e}")
        return []
    except Exception as e:
        print(f"Error parsing data: {e}")
        import traceback
        traceback.print_exc()
        return []

def main():
    if len(sys.argv) < 2:
        print("Usage: python scrape_ashtottaram.py <url>")
        print("\nExamples:")
        print("  python scrape_ashtottaram.py https://www.drikpanchang.com/hindu-names/god-names/lakshmi-names.html")
        print("  python scrape_ashtottaram.py https://www.drikpanchang.com/hindu-names/god-names/durga-names.html")
        sys.exit(1)
    
    url = sys.argv[1]
    scrape_ashtottaram(url)

if __name__ == "__main__":
    main()
