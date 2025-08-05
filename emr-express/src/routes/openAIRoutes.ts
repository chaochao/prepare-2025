require('dotenv').config()
import { Router } from 'express';
import OpenAI from 'openai';
const router = Router();


// OpenAI client setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get('/generate', async (req, res) => {
  try {
    const { prompt, model = 'gpt-3.5-turbo', max_tokens = 500 } = req.body;

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: 'You are a helpful assistant' },
        { role: 'user', content: 'what is 1+1' }
      ],
      max_tokens,
      temperature: 0.7
    });

    res.json({
      result: completion.choices[0].message.content,
      usage: completion.usage
    });
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to process request'
    });
  }
});

export default router;