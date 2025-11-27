// A simple in-memory cache to store data for the day
let cachedData = null;
let cacheDate = null;

exports.handler = async function (event, context) {
  // Use a simple date string (e.g., "8/21/2025") to identify the current day
  const today = new Date().toLocaleDateString();

  // 1. If we have fresh data from today in our cache, return it immediately
  if (cachedData && cacheDate === today) {
    return {
      statusCode: 200,
      body: JSON.stringify(cachedData),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  // --- If no cache, proceed with fetching new data ---
  const { latitude, longitude } = event.queryStringParameters;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const authUrl = 'https://api.prokerala.com/token';
  const now = new Date();
  now.setHours(now.getHours() - 4);
  const isoDateTime = now.toISOString();
  
  const panchangUrl = `https://api.prokerala.com/v2/astrology/panchang?coordinates=${latitude},${longitude}&ayanamsa=1&datetime=${isoDateTime}`;
  const inauspiciousUrl = `https://api.prokerala.com/v2/astrology/inauspicious-period?coordinates=${latitude},${longitude}&ayanamsa=1&datetime=${isoDateTime}`;

  try {
    // --- AUTHENTICATION ---
    const authBody = new URLSearchParams();
    authBody.append('grant_type', 'client_credentials');
    authBody.append('client_id', clientId);
    authBody.append('client_secret', clientSecret);
    const authResponse = await fetch(authUrl, { method: 'POST', body: authBody });
    const authData = await authResponse.json();
    if (!authData.access_token) throw new Error('Authentication failed.');
    const accessToken = authData.access_token;
    const authHeader = { 'Authorization': `Bearer ${accessToken}` };

    // --- FETCH DATA FROM BOTH ENDPOINTS ---
    const [panchangResponse, inauspiciousResponse] = await Promise.all([
      fetch(panchangUrl, { method: 'GET', headers: authHeader }),
      fetch(inauspiciousUrl, { method: 'GET', headers: authHeader })
    ]);

    if (!panchangResponse.ok || !inauspiciousResponse.ok) {
      throw new Error('Failed to fetch data from Prokerala API.');
    }

    const panchangData = await panchangResponse.json();
    const inauspiciousData = await inauspiciousResponse.json();

    // --- COMBINE AND CACHE THE RESULTS ---
    const combinedData = {
      ...panchangData.data,
      muhurat: inauspiciousData.data.muhurat
    };

    // 2. Store the newly fetched data and the current date in our cache
    cachedData = combinedData;
    cacheDate = today;

    return {
      statusCode: 200,
      body: JSON.stringify(combinedData),
      headers: { 'Content-Type': 'application/json' }
    };

  } catch (error) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};