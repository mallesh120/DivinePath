const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  // Allow CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const { latitude, longitude, datetime } = event.queryStringParameters;

  if (!latitude || !longitude || !datetime) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing required parameters: latitude, longitude, datetime' }),
    };
  }

  const CLIENT_ID = process.env.PROKERALA_CLIENT_ID;
  const CLIENT_SECRET = process.env.PROKERALA_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'API credentials not configured' }),
    };
  }

  try {
    // Get OAuth token
    const tokenResponse = await fetch('https://api.prokerala.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to obtain access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch Panchang data
    const panchangUrl = `https://api.prokerala.com/v2/astrology/panchang?coordinates=${latitude},${longitude}&ayanamsa=1&datetime=${datetime}`;

    const panchangResponse = await fetch(panchangUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!panchangResponse.ok) {
      throw new Error('Failed to fetch Panchang data');
    }

    const panchangData = await panchangResponse.json();

    // Fetch Inauspicious periods
    const inauspiciousUrl = `https://api.prokerala.com/v2/astrology/inauspicious-period?coordinates=${latitude},${longitude}&ayanamsa=1&datetime=${datetime}`;

    const inauspiciousResponse = await fetch(inauspiciousUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let inauspiciousData = null;
    if (inauspiciousResponse.ok) {
      inauspiciousData = await inauspiciousResponse.json();
    }

    // Combine data
    const result = {
      date: datetime,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      panchang: panchangData.data || panchangData,
      inauspiciousPeriods: inauspiciousData?.data || null,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error fetching Panchangam data:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
