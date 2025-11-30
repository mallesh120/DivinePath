const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { prompt, featureType } = JSON.parse(event.body);

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Prompt is required' })
      };
    }

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'API key not configured. Please set GEMINI_API_KEY environment variable.',
          success: false
        })
      };
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Customize system prompt based on feature type
    let systemContext = '';
    
    switch(featureType) {
      case 'ask-guru':
        systemContext = `You are a knowledgeable Hindu spiritual guru and teacher. Provide wisdom based on Hindu scriptures like Bhagavad Gita, Upanishads, Vedas, and Puranas. 
        - Be compassionate, wise, and thoughtful in your responses
        - Include relevant scripture references when applicable
        - Keep responses concise but meaningful (2-4 paragraphs)
        - Use simple language that anyone can understand
        - If asked about other religions, politely redirect to Hindu teachings`;
        break;
        
      case 'dream-interpretation':
        systemContext = `You are an expert in Hindu dream interpretation and symbolism. Interpret dreams based on:
        - Hindu scriptures and texts on dream symbolism
        - Swapna Shastra (science of dreams)
        - Cultural and spiritual significance in Hinduism
        - Provide 3-4 possible interpretations
        - Keep responses focused and practical
        - Include any relevant scriptural references`;
        break;
        
      case 'name-suggestion':
        systemContext = `You are an expert in Hindu names and their meanings. When suggesting names:
        - Provide 5-8 meaningful Hindu names based on the criteria given
        - Include the meaning and significance of each name
        - Consider Sanskrit origins and cultural appropriateness
        - Mention any deity associations or scriptural references
        - Format as: Name (meaning) - brief description`;
        break;
        
      case 'personalized-shloka':
        systemContext = `You are an expert in Hindu shlokas and Sanskrit verses. Provide:
        - A relevant shloka in Sanskrit (with transliteration)
        - English translation
        - Meaning and context
        - Why it's appropriate for the user's situation
        - Which scripture it's from (Bhagavad Gita, Upanishads, etc.)
        - Keep it inspirational and practical`;
        break;
        
      default:
        systemContext = 'You are a helpful Hindu spiritual guide providing wisdom based on ancient scriptures.';
    }

    const fullPrompt = `${systemContext}\n\nUser Query: ${prompt}`;

    // Generate content
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        response: text,
        success: true 
      })
    };

  } catch (error) {
    console.error('AI Error:', error);
    console.error('Error details:', error.message, error.stack);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Failed to generate AI response',
        details: error.message,
        success: false
      })
    };
  }
};
