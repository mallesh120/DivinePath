#!/usr/bin/env python3
"""
Convert pasted 108 names text to JavaScript format
Usage: python convert_text_to_js.py input.txt

Input format (each line or group):
Sanskrit
Transliteration  
Number
Sanskrit Mantra
English Mantra
Meaning
"""

import sys
import re

def parse_names_from_text(text):
    """Parse names from pasted text"""
    names = []
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    
    i = 0
    while i < len(lines):
        try:
            # Try to identify Sanskrit (Devanagari characters)
            sanskrit = lines[i]
            i += 1
            
            # Transliteration
            transliteration = lines[i] if i < len(lines) else ""
            i += 1
            
            # Number
            number_str = lines[i] if i < len(lines) else str(len(names) + 1)
            number = int(number_str) if number_str.isdigit() else len(names) + 1
            i += 1
            
            # Sanskrit Mantra
            mantra_sanskrit = lines[i] if i < len(lines) else f"ॐ {sanskrit} नमः।"
            i += 1
            
            # English Mantra  
            mantra = lines[i] if i < len(lines) else f"Om {transliteration} Namah"
            i += 1
            
            # Meaning
            meaning = lines[i] if i < len(lines) else ""
            i += 1
            
            name_obj = {
                'number': number,
                'sanskrit': sanskrit,
                'transliteration': transliteration,
                'mantraSanskrit': mantra_sanskrit,
                'mantra': mantra,
                'meaning': meaning
            }
            
            names.append(name_obj)
            
        except Exception as e:
            print(f"Error parsing at line {i}: {e}")
            i += 1
            continue
    
    return names

def format_for_javascript(names):
    """Format names array for JavaScript"""
    output = "names: [\n"
    
    for i, name in enumerate(names):
        comma = "," if i < len(names) - 1 else ""
        
        # Escape single quotes in strings
        sanskrit = name['sanskrit'].replace("'", "\\'")
        transliteration = name['transliteration'].replace("'", "\\'")
        mantra_sanskrit = name['mantraSanskrit'].replace("'", "\\'")
        mantra = name['mantra'].replace("'", "\\'")
        meaning = name['meaning'].replace("'", "\\'")
        
        output += f"  {{ number: {name['number']}, "
        output += f"sanskrit: '{sanskrit}', "
        output += f"transliteration: '{transliteration}', "
        output += f"mantraSanskrit: '{mantra_sanskrit}', "
        output += f"mantra: '{mantra}', "
        output += f"meaning: '{meaning}' }}{comma}\n"
    
    output += "]"
    return output

def main():
    if len(sys.argv) < 2:
        print("Usage: python convert_text_to_js.py input.txt")
        print("\nOr paste text directly (press Ctrl+D when done):")
        text = sys.stdin.read()
    else:
        input_file = sys.argv[1]
        with open(input_file, 'r', encoding='utf-8') as f:
            text = f.read()
    
    names = parse_names_from_text(text)
    
    if names:
        print(f"✅ Parsed {len(names)} names\n")
        print("="*80)
        print("COPY THIS TO ashtottaramData.js:")
        print("="*80 + "\n")
        print(format_for_javascript(names))
    else:
        print("❌ No names found. Check input format.")

if __name__ == "__main__":
    main()
