import { configuration } from "../config/index.js";
import { OpenAIApi } from "openai";

const openai = new OpenAIApi(configuration);

// Create Image Using Dall-E
export const createimage = async (req, res) => {
  const { prompt, size } = req.body;
  console.log(prompt);
  const response = await openai.createImage({
    prompt: `${prompt}`,
    n: 1,
    size: "1024x1024",
  });
  const image_url = response.data.data[0].url;
  res.status(200).json({
    status: "Successful",
    image: image_url,
    description: prompt,
  });

  res.end();
};
// Create Chats using Chat-GPT
export const chat = async (req, res) => {
  const { prompt, size } = req.body;
  // const response = await openai.createCompletion({
  //   prompt: prompt,
  //   n: 1,
  // });
  // const reply = response.data.data[0].url;

  try {
    const reply = await openai.createCompletion({
      n: 1,
      max_tokens: 580,
      prompt: prompt,
      model: "text-davinci-003",
    });
    res.status(200).json({
      status: "Successful",
      reply: reply.data.choices[0].text,
      message: prompt,
    });
  } catch (error) {
    res.status(200).json({
      status: "Successful",
      reply: error.message,
    });
  }
};
