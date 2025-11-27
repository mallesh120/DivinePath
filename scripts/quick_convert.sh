#!/bin/bash
# Quick converter: Copy text from browser, run this script, paste result into code

echo "📋 Converting clipboard content to JavaScript format..."
echo ""

cd "$(dirname "$0")"

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
else
    echo "⚠️  Virtual environment not found. Creating one..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -q requests beautifulsoup4 lxml
fi

# Check if pbpaste is available (macOS)
if command -v pbpaste &> /dev/null; then
    pbpaste | python convert_text_to_js.py
else
    # Linux alternative
    if command -v xclip &> /dev/null; then
        xclip -o | python convert_text_to_js.py
    else
        echo "❌ No clipboard tool found. Please install pbpaste (macOS) or xclip (Linux)"
        echo "Or paste text manually:"
        python convert_text_to_js.py
    fi
fi
