require('dotenv').config()
import { Router, Request, Response } from 'express';

import OpenAI from 'openai';
const router = Router();


router.get('/generate', async (req, res) => {
  try {
    const { messages, model = 'deepseek-chat', max_tokens = 500 } = req.body;

    const openai = new OpenAI({
        baseURL: process.env.DEEPSEEK_BASE_URL,
        apiKey: process.env.DEEPSEEK_API_KEY
});
   const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }, { role: 'user', content: 'tell me more about you' }],
    model: "deepseek-chat",
  });


  console.log(completion.choices[0].message.content);

    res.json({
      result: completion.choices[0].message.content,
    });
  } catch (error: any) {
    
    res.status(500).json({ 
      error: error.response?.data?.error?.message || 'Failed to process request'
    });
  }
});

export default router;