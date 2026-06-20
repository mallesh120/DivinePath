#!/bin/bash

# Test script for rate limiting
# Usage: ./test-rate-limit.sh

echo "🧪 Testing DivinePath Rate Limiting System"
echo "=========================================="
echo ""

# Check if netlify dev is running
if ! curl -s http://localhost:8888 > /dev/null 2>&1; then
  echo "❌ Error: Please start the dev server first:"
  echo "   netlify dev"
  echo ""
  exit 1
fi

echo "✅ Server is running"
echo ""

# Function to make a test API call
make_call() {
  curl -s -X POST \
    http://localhost:8888/.netlify/functions/ai-chat \
    -H "Content-Type: application/json" \
    -d '{"prompt":"Test","featureType":"ask-guru"}' \
    -w "\nHTTP Status: %{http_code}\n"
}

echo "📊 Test 1: Making single API call"
echo "--------------------------------"
response=$(make_call)
echo "$response" | head -20
echo ""

# Extract remaining quota
remaining=$(echo "$response" | grep -o '"remaining":[0-9]*' | grep -o '[0-9]*')
echo "Remaining calls: $remaining/500"
echo ""

echo "🔄 Test 2: Making 5 rapid calls"
echo "-------------------------------"
for i in {1..5}; do
  echo -n "Call $i... "
  status=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
    http://localhost:8888/.netlify/functions/ai-chat \
    -H "Content-Type: application/json" \
    -d '{"prompt":"Test '$i'","featureType":"ask-guru"}')
  
  if [ "$status" == "200" ]; then
    echo "✅ Success"
  elif [ "$status" == "429" ]; then
    echo "⏱️  Rate limited (expected after 15 calls)"
  else
    echo "❌ Error: $status"
  fi
  
  sleep 0.5
done
echo ""

echo "📈 Test 3: Checking current usage"
echo "---------------------------------"
response=$(make_call)
remaining=$(echo "$response" | grep -o '"remaining":[0-9]*' | grep -o '[0-9]*')
count=$(echo "$response" | grep -o '"count":[0-9]*' | grep -o '[0-9]*')

if [ -z "$remaining" ]; then
  echo "⚠️  Rate limited or error occurred"
else
  echo "✅ API calls today: $count"
  echo "✅ Remaining: $remaining/500"
  echo ""
  
  # Calculate percentage
  percent=$((count * 100 / 500))
  echo "📊 Usage: $percent% of daily budget"
fi

echo ""
echo "🎯 Quick Commands"
echo "================"
echo ""
echo "To reset localStorage (client-side):"
echo "  Open browser console → localStorage.clear()"
echo ""
echo "To check Netlify Blobs (global counter):"
echo "  netlify blobs:list"
echo "  netlify blobs:get rate-limit global-calls"
echo ""
echo "To manually reset global counter:"
echo "  netlify blobs:delete rate-limit global-calls"
echo ""
echo "✅ Testing complete!"
