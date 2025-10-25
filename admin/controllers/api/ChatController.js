let router = require('express').Router();
let config = require('../../config/config');
let APIBody = require('../../lib/APIBody');
let BodyCheck = require('../../lib/bodyCheck');
var request = require('request');

const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: config.GROQ_API_KEY });

var Chat = require.main.require('./models/Chat');

// 🔹 Cache (in-memory)
const cache = new Map(); // key: session_id, value: last reply

// Generate automatic replies from the system
async function createReply (req,res,next) {
	let body = APIBody.find(e => e.method == 'post' && e.name == 'create_chat_reply');
    if(!(BodyCheck.checkBody(req.body,body.body)).success) {
		console.log('parameter not find');
		res.status(200).json({success : false ,message : 'Required parameter is missing'});
	} else {
		try {
	    const aiModel = "openai/gpt-oss-20b";
	    const { query, tone = "informative", wordCount = 100 } = req.body;
	    if (!query) {
	      res.status(400).json({ error: "query is required" });
        return;
	    }

	    if (query.toString().includes("hello")) return res.status(200).json({ query, reply: "Hi there! How can I assist you today?" });
      if (query.toString().includes("apply to")) return res.status(200).json({ query, reply: "You can apply directly from our Apply4Study portal!" });
      if (query.toString().includes("thanks")) return res.status(200).json({ query, reply: "You're welcome 😊" });

      var session_id = req.headers['x-access-token']; 

      // 1️⃣ Retrieve last few messages for context
      const history = await Chat.find({ session_id })
        .sort({ created_at: -1 })
        .limit(5)
        .lean();

      // Prepare conversation context
      const messages = [
        { role: "system", content: "You are an assistant for Apply4Study students. Limit your answers to 100 words maximum." },
        ...history.reverse().map(m => ({ role: "user", content: m.query })),
        ...history.reverse().map(m => ({ role: "assistant", content: m.reply })),
        { role: "user", content: query }
      ];

      var fullReply = "";
      const completion = await groq.chat.completions
	    .create({
	      /*messages: [
	        {
	          role: "user",
	          content: `Write blog post about: "${query}". Include intro, headings, examples and conclusion.`,
	        },
	      ],*/
	      messages,
	      model: aiModel
	    })
	    .then(async(chatCompletion) => {
	      // console.log(chatCompletion.choices[0]?.message?.content || "");
	      const content = chatCompletion?.choices?.[0]?.message?.content || "";
	      console.log(`Response is generated with model "${aiModel}" & content: ${content}`);
        if (content) {
          fullReply += content;
          // res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
        }        

	      // 3️⃣ Save message pair to MongoDB
        const chat = new Chat({ session_id, query, content });
        await chat.save();

        // 🔹 Cache last reply
    		cache.set(session_id, fullReply);

	      res.status(200).json({ query, reply: content });
	      return;
	    });
	  } catch (err) {
	    console.error(err.message);
	    res.status(500).json({ error: "Something went wrong" });
	  }
	}
}

// 📜 Paginated History
async function history (req, res) {
  try {
    const { page = 1, limit = 10 } = req.body;
    const session_id = req.headers['x-access-token'];
    if (!session_id)
      return res.status(400).json({ success: false, message: "session_id required" });

    const skip = (page - 1) * limit;

    const [chats, total] = await Promise.all([
      Chat.find({ session_id }).sort({ created_at: 1 }).skip(skip).limit(Number(limit)),
      Chat.countDocuments({ session_id })
    ]);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      chats
    });
  } catch (err) {
    console.error("Chat History Error:", err);
    res.status(500).json({ success: false, message: "Failed to load chat history" });
  }
}

// ⚡ Get Last Cached Reply
async function lastReply (req, res) {
  const session_id = req.headers['x-access-token'];
  const reply = cache.get(session_id);
  if (reply) {
    res.json({ success: true, cached: true, reply });
  } else {
    res.json({ success: false, cached: false, message: "No cached reply" });
  }
}

module.exports = {createReply, history, lastReply};