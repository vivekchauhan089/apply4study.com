const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors  = require("cors");
const Groq = require("groq-sdk");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/generate-blog-new", async (req, res) => {
  try {
    
    const aiModel = "openai/gpt-oss-20b";
    const { topic, tone = "informative", wordCount = 600 } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `Write a ${wordCount}-word ${tone} blog post about: "${topic}". Include intro, headings, and conclusion.`,
        },
      ],
      model: aiModel,
    })
    .then((chatCompletion) => {
      // console.log(chatCompletion.choices[0]?.message?.content || "");
      console.log(`Response is generated with model "${aiModel}"`);
      const blogText = chatCompletion.choices[0]?.message?.content || "";
      res.json({ topic, blog: blogText });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/create-blog-new", async (req, res) => {
  try {
    
    const aiModel = "openai/gpt-oss-20b";
    const { topic, tone = "informative", wordCount = 600 } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `Write a ${wordCount}-word ${tone} blog post about: "${topic}". Include intro, headings, and conclusion.`,
        },
      ],
      model: aiModel,
    })
    .then((chatCompletion) => {
      // console.log(chatCompletion.choices[0]?.message?.content || "");
      console.log(`Response is generated with model "${aiModel}"`);
      const blogText = chatCompletion.choices[0]?.message?.content || "";
      res.json({ topic, blog: blogText });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// API Route: Generate Blog Post
app.post("/generate-blog", async (req, res) => {
  try {

    const apiUsage = await fetch('https://openrouter.ai/api/v1/key', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    });
    console.log("Ai Model Api Usages : ", apiUsage);

    const { topic, tone = "informative", wordCount = 600 } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: "openrouter/auto", // you can change to mistral, llama-2, etc. mistralai/mistral-7b-instruct, openai/gpt-3.5-turbo
        messages: [
          {
            role: "system",
            content: `You are an expert blog writer. Write detailed, SEO-friendly posts.`,
          },
          {
            role: "user",
            content: `Write a ${wordCount}-word ${tone} blog post about: "${topic}". Include intro, headings, and conclusion.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const blogText = response.data.choices[0].message.content;
    res.json({ topic, blog: blogText });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
);
