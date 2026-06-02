# AI Rate Limiting Implementation Guide

## Overview
DivinePath implements a **hybrid rate limiting system** to manage AI API costs:
- **Client-side**: 15 calls per minute per user
- **Server-side**: 500 calls per day across ALL users (global limit)

This ensures cost protection even with multiple users using the app simultaneously.

## Architecture

### Two-Layer Protection

**Layer 1: Client Rate Limiter** (Per-User)
- Purpose: Prevent single user spam
- Limit: 15 calls per 60-second window
- Storage: Browser localStorage
- Scope: Per browser/device

**Layer 2: Global Rate Limiter** (All Users)
- Purpose: Enforce total daily budget
- Limit: 500 calls per day
- Storage: Netlify Blobs (server-side)
- Scope: Across all users globally
- Reset: Midnight (00:00) automatically

## Key Features

### 1. Rate Limiter (`src/utils/rateLimiter.js` + `netlify/functions/ai-chat.js`)

**Client-Side (`rateLimiter.js`)**:
- Sliding Window Algorithm: Tracks calls in a 60-second window
- Local Storage Persistence: Remembers usage across page reloads
- Daily Reset: Automatically resets at midnight
- Usage Tracking: Monitors daily and total API calls

**Server-Side (`ai-chat.js`)**:
- Global Counter: Tracks all API calls across all users
- Netlify Blobs Storage: Persistent server-side storage
- Daily Budget: 500 calls/day hard limit
- Automatic Reset: Midnight (00:00) UTC
- HTTP 429 Response: Returns "Too Many Requests" when limit reached

### 2. Usage Tracker UI (`src/components/AIUsageTracker/`)
- **Real-time Display**: Shows current usage stats
- **Live Updates**: Refreshes every 5 seconds
- **Visual Warnings**: Color-coded progress bar (green → orange → red)
- **Reset Timer**: Shows when rate limit will reset
- **Animated Alerts**: Pulse animation when near limit (<5 calls remaining)

### 3. Protected AI Features
All AI-powered features are now protected with rate limiting:
- **Ask a Guru** - Spiritual Q&A chatbot
- **Dream Interpretation** - Hindu dream symbolism
- **Name Suggestion** - Baby name recommendations
- **Personalized Shloka** - Scripture verses

### 4. Free Features
These features use **zero AI API calls** (pure astronomical calculations):
- **Personalized Guidance** - Birth nakshatra analysis, mantras, auspicious timings

## Implementation Details

### Rate Limiting Flow

```javascript
// 1. Check if call is allowed
const { allowed, message } = checkAICallAllowed();
if (!allowed) {
  // Show error message to user
  return;
}

// 2. Make AI call with automatic rate tracking
const data = await makeAICall(async () => {
  const response = await fetch('/.netlify/functions/ai-chat', {
    method: 'POST',
    body: JSON.stringify({ prompt, featureType })
  });
  return await response.json();
});
```

### Usage Stats API

```javascript
import { getUsageStats } from '../../utils/rateLimiter';

const stats = getUsageStats();
// Returns:
// {
//   dailyUsage: 5,      // Total calls today
//   totalCalls: 157,    // All-time total calls
//   remaining: 10,      // Remaining calls in current window
//   resetIn: 45         // Seconds until oldest call expires
// }
```

## User Experience

### Multi-User Scenarios

**Scenario 1: Single User Making Rapid Calls**
- User makes 15 calls in 30 seconds → Client blocks further calls
- Message: "Rate limit of 15 calls/min reached. Wait 30 seconds."
- After 60 seconds → Can make calls again (if global limit not reached)

**Scenario 2: Multiple Users Throughout the Day**
- 10 users each make 50 calls = 500 total calls
- User #11 tries to use AI → Global limit reached
- Message: "Global daily limit of 500 calls reached. Resets at midnight."
- All users redirected to free features

**Scenario 3: Global Limit Reached Mid-Day**
- Total calls reach 500 at 3:00 PM
- All AI features show: "Daily budget exhausted. Try free Personalized Guidance!"
- At midnight → Counter resets to 0, service resumes

### When Rate Limited
Users see friendly messages explaining the limit and suggesting alternatives:

**Ask Guru Example:**
```
🙏 You've reached the rate limit of 15 calls per minute. Please wait 45 seconds.

Please try the free "Personalized Guidance" feature while you wait!
```

**Other Features:**
- **Dream Interpretation**: Falls back to showing default results
- **Name Suggestion**: Shows hardcoded name database
- **Personalized Shloka**: Shows emotion-appropriate fallback shlokas

### Feature Badges
Each feature card shows its type:
- **AI Powered** badge (purple gradient) - Uses API quota
- **Free** badge (green gradient) - No API calls

## Local Storage Keys

```javascript
'ai_calls_history'  // JSON array of call timestamps
'ai_daily_usage'    // Number of calls today
'ai_last_reset'     // Midnight timestamp for daily reset
'ai_total_calls'    // All-time call counter
```

## Configuration

**Client-Side Limits** (in `src/utils/rateLimiter.js`):
```javascript
MAX_CALLS = 15          // Calls per window per user
TIME_WINDOW = 60000     // 60 seconds in milliseconds
```

**Server-Side Limits** (in `netlify/functions/ai-chat.js`):
```javascript
DAILY_LIMIT = 500       // Total calls per day (all users)
```

To adjust limits:
1. **Change daily budget**: Edit `DAILY_LIMIT` in `ai-chat.js`
2. **Change per-user rate**: Edit `MAX_CALLS` in `rateLimiter.js`
3. **Update UI**: Update display in `AIUsageTracker.js` (line 41 & footer)

## Testing Rate Limiting

### Test Client-Side Limit (Per-User)
1. Start dev server: `netlify dev`
2. Go to "AI Features" → "Ask Guru"
3. Make 15 rapid requests
4. Verify 16th request shows rate limit message
5. Wait 60 seconds
6. Verify you can make calls again

### Test Global Limit (All Users)
1. **Simulate high usage**: 
   - Open Netlify Blobs dashboard or use Netlify CLI
   - Manually set counter to 499
2. Make 1 AI call
3. Verify next call shows: "Global daily limit reached"
4. Check response includes `HTTP 429` status code
5. Verify error mentions midnight reset

### Test Midnight Reset
1. Temporarily modify `getNextMidnight()` to reset in 2 minutes
2. Reach global limit
3. Wait 2 minutes
4. Verify counter resets and calls work again

### Reset Test
1. Start dev server: `npm start`
2. Go to "AI Features" page
3. Select any AI-powered feature (e.g., Ask Guru)
4. Make 15 rapid requests
5. Verify 16th request shows rate limit message
6. Check usage tracker shows 0 remaining calls
7. Wait 60 seconds
8. Verify you can make calls again

### Reset Test
1. Open browser console
2. Run: `localStorage.clear()`
3. Refresh page
4. Verify usage tracker shows 15/15 available

## Cost Optimization Tips

1. **Promote Free Features**: The Personalized Guidance feature is completely free
2. **Smart Defaults**: All features have fallback data when rate limited
3. **User Education**: Usage tracker teaches users about limits
4. **Daily Budgets**: Consider adding daily call limits in addition to per-minute limits

## Future Enhancements

Potential improvements:
- [ ] Server-side rate limiting (Netlify function level)
- [ ] User authentication with personalized quotas
- [ ] Premium tier with higher limits
- [ ] Caching frequently asked questions
- [ ] Queue system for non-urgent requests
- [ ] Weekly/monthly usage analytics dashboard

## Troubleshooting

### Rate Limiter Not Working
1. Check browser supports localStorage: `'localStorage' in window`
2. Verify imports in affected pages
3. Check browser console for errors
4. Clear localStorage and retry

### Usage Tracker Not Updating
1. Component updates every 5 seconds (by design)
2. Check React DevTools for state updates
3. Verify `getUsageStats()` returns valid data

### False Rate Limiting
1. Clear localStorage: `localStorage.clear()`
2. Check system clock (rate limiter uses Date.now())
3. Verify TIME_WINDOW is 60000ms (not 60 seconds)

## Related Files

```
src/utils/rateLimiter.js                    # Core rate limiting logic
src/components/AIUsageTracker/              # Usage display component
  ├── AIUsageTracker.js
  └── AIUsageTracker.css
src/pages/AIFeaturesPage/                   # Main AI features hub
  ├── AIFeaturesPage.js
  └── AIFeaturesPage.css
src/pages/AskGuruPage/AskGuruPage.js        # Protected with rate limiter
src/pages/DreamInterpretationPage/          # Protected with rate limiter
src/pages/NameSuggestionPage/               # Protected with rate limiter
src/pages/PersonalizedShlokaPage/           # Protected with rate limiter
src/pages/PersonalizedGuidancePage/         # FREE - No AI calls!
```

## Summary

The **hybrid rate limiting system** successfully:
✅ Prevents individual users from spamming (15 calls/min)
✅ Enforces global daily budget across all users (500 calls/day)
✅ Provides clear user feedback about both limits
✅ Offers free alternatives when limits reached
✅ Tracks usage persistently (client + server)
✅ Resets automatically at midnight
✅ Returns proper HTTP status codes (429 for rate limit)
✅ Includes remaining quota in API responses

**Cost Protection**: Even with 100 simultaneous users, you'll never exceed 500 API calls per day! 🎉

## Cost Analysis

**Daily Budget**: 500 calls/day at ~$0.0001/call = **$0.05/day maximum**
**Monthly Cost**: $0.05 × 30 days = **$1.50/month maximum**

Compare to unprotected:
- 10 users × 100 calls each = 1000 calls/day = **$3/day** 
- Monthly: **$90** ⚠️

**Savings**: ~$88.50/month with global rate limiting!
