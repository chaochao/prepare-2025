require('dotenv').config()
import { Router, Request, Response } from 'express';

import OpenAI from 'openai';
const router = Router();

export const SYSTEM_PROMPT = `You are a clinic doctor. When provided with a patient's SOAP note data in JSON format (including subjective, objective, and assessment), generate the 'plan' section in 1-2 concise sentences.`
export const generateUserPrompt = (data: any) => {
  return `Generate a concise 'plan' section based on the following SOAP note data:\n
Subjective: ${data.subjective}\n
Objective: ${JSON.stringify(data.objective)}\n
Assessment: ${data.assessment}\n
Please provide the 'plan' in less than 5 sentences.`;
};
router.post('/generate', async (req, res) => {
  try {
    console.log(req.body)

    const { soapData, model = 'deepseek-chat', max_tokens = 2000 } = req.body;

    if (!soapData || !soapData.subjective || !soapData.objective || !soapData.assessment) {
      return res.status(400).json({ error: 'Invalid input soapData' });
    }
    const userPrompt = generateUserPrompt(soapData);
    const openai = new OpenAI({
        baseURL: process.env.DEEPSEEK_BASE_URL,
        apiKey: process.env.DEEPSEEK_API_KEY
});
   const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: 'user', content: userPrompt }],
    model: model || "deepseek-chat",
    max_tokens: max_tokens || 500,
    temperature: 0.7,
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