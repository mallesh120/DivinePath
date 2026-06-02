# Rate Limiting Flow Diagram

## Request Flow

```
User clicks "Ask Guru"
         |
         v
[CLIENT-SIDE CHECK]
  - Check localStorage
  - Calls in last 60s < 15?
         |
    +----|----+
    |         |
   NO        YES
    |         |
    v         v
 [BLOCK]   [ALLOW]
 Show:     Continue
 "Wait    
  60s"        |
              v
     [NETLIFY FUNCTION]
       ai-chat.js
              |
              v
     [GLOBAL CHECK]
       - Read Netlify Blobs
       - Total calls today < 500?
              |
         +----|----+
         |         |
        NO        YES
         |         |
         v         v
     [BLOCK]   [ALLOW]
     HTTP 429  Increment counter
     "Global   Save to Blobs
      limit"        |
                    v
              [GEMINI API]
              Generate response
                    |
                    v
              [RETURN TO USER]
              Include: response + remaining quota
```

## Multi-User Scenario

```
Time: 9:00 AM - Global Counter: 0
============================================

User A (Browser 1): Makes 50 calls
  ├─ Client: ✅ Allowed (15/min rate respected)
  └─ Server: ✅ Allowed (50/500 used)
  
Global Counter: 50

User B (Browser 2): Makes 100 calls
  ├─ Client: ✅ Allowed (15/min rate respected)
  └─ Server: ✅ Allowed (150/500 used)
  
Global Counter: 150

User C (Browser 3): Makes 200 calls
  ├─ Client: ✅ Allowed (15/min rate respected)
  └─ Server: ✅ Allowed (350/500 used)
  
Global Counter: 350

User D (Browser 4): Makes 151 calls
  ├─ Client: ✅ Allowed (15/min rate respected)
  ├─ Server: ✅ First 150 allowed (500/500 used)
  └─ Server: ❌ Call #151 → HTTP 429 "Global limit reached"
  
Global Counter: 500 (LIMIT REACHED)

User E (Browser 5): Tries to use AI
  ├─ Client: ✅ Allowed (no local history yet)
  └─ Server: ❌ HTTP 429 "Global limit reached"
  
User sees: "Daily budget exhausted. Resets at midnight."

Time: 12:00 AM (Midnight) - Auto Reset
============================================

Global Counter: 0 (RESET)

All users can now use AI features again!
```

## Storage Architecture

```
CLIENT SIDE (Per Browser)
==========================
localStorage:
  - ai_calls_history: [timestamps]
  - ai_daily_usage: 5
  - ai_total_calls: 157
  - ai_last_reset: "2025-12-12T00:00:00"

Purpose: Prevent single user spam


SERVER SIDE (Global)
====================
Netlify Blobs:
  store: "rate-limit"
  key: "global-calls"
  value: {
    "date": "2025-12-12",
    "count": 350
  }

Purpose: Enforce total daily budget
```

## Error Handling Chain

```
1. CLIENT RATE LIMIT HIT
   └─> Show friendly message
       └─> Suggest free alternatives
           └─> User can retry after 60s

2. GLOBAL RATE LIMIT HIT
   └─> HTTP 429 from server
       └─> Client catches error
           └─> Show "Daily limit reached"
               └─> Redirect to free features
                   └─> User must wait until midnight

3. API KEY MISSING
   └─> HTTP 500 from server
       └─> Show "Service unavailable"

4. NETWORK ERROR
   └─> Client timeout
       └─> Show "Check connection"
           └─> Fallback to cached/default data
```

## Daily Reset Mechanism

```
Every API Request:
==================

1. Read current blob:
   { date: "2025-12-11", count: 450 }

2. Get today's date:
   "2025-12-12"

3. Compare dates:
   "2025-12-11" !== "2025-12-12"
   
4. RESET TRIGGERED:
   { date: "2025-12-12", count: 0 }
   
5. Increment for current request:
   { date: "2025-12-12", count: 1 }
   
6. Save back to blob

This ensures automatic midnight reset
without needing cron jobs or schedulers!
```

## Response Headers

```
SUCCESSFUL REQUEST
==================
HTTP 200 OK
Content-Type: application/json
X-RateLimit-Remaining: 347
X-RateLimit-Limit: 500

{
  "success": true,
  "response": "Your AI-generated wisdom...",
  "rateLimit": {
    "remaining": 347,
    "limit": 500,
    "count": 153
  }
}


GLOBAL LIMIT REACHED
====================
HTTP 429 Too Many Requests
Retry-After: 86400
Content-Type: application/json

{
  "success": false,
  "error": "Global daily limit of 500 API calls reached. Resets at midnight.",
  "globalLimit": true,
  "remaining": 0,
  "resetAt": "2025-12-13T00:00:00.000Z"
}
```

## Cost Protection Proof

```
WORST CASE SCENARIO
===================
100 malicious users try to spam:
  - Each user: 1000 calls/min attempted
  - Total attempted: 100,000 calls

CLIENT LAYER:
  - Each user blocked after 15 calls/min
  - Max from each user: ~360 calls/day
  - Theoretical max: 100 × 360 = 36,000

SERVER LAYER: 🛡️
  - Hard limit: 500 calls/day
  - Actual cost: $0.05/day
  - PROTECTED! ✅

Without global limit:
  - Cost: 36,000 × $0.0001 = $3.60/day
  - Monthly: $108 💸

With global limit:
  - Cost: 500 × $0.0001 = $0.05/day
  - Monthly: $1.50 ✅
  - Savings: $106.50/month!
```
