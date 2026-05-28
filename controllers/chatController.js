const Message=require('../models/Message');
const Groq=require('groq-sdk');
const Ticket = require('../models/Ticket');

const groq=new Groq({apiKey: process.env.GROQ_API_KEY})

const keywords = ['refund', 'complaint', 'human', 'agent', 'help', 'issue', 'problem', 'cancel'];

const sendMessage=async(req,res)=>{
    try{
        const{userMessage}=req.body;

        const previousMessages=await Message.find()
        .sort({createdAt: -1})
        .limit(10);

        previousMessages.reverse();

        const conversationHistory=previousMessages.map(msg=>([
            {role:"user", content:msg.userMessage},
            {role: "assistant", content:msg.aiResponse}
        ])).flat();

        const completion= await groq.chat.completions.create({
            model:"llama-3.3-70b-versatile",
            messages:[
                {
                    role:"system",
                    content:"You are helpful customer support assistant."
                },
                ...conversationHistory,
                {
                    role:"user",
                    content:userMessage
                }
            ]
        });
        const aiResponse=completion.choices[0].message.content;

        const newMessage=new Message({
            userMessage,
            aiResponse
        });

        await newMessage.save();

        const lowerCaseMessage=userMessage.toLowerCase();
        const shouldCreateTicket=keywords.some(keyword=>
            lowerCaseMessage.includes(keyword)
        );

        let ticket=null;
        if(shouldCreateTicket){
            ticket=new Ticket({userQuery:userMessage});
            await ticket.save();
        }

        res.status(201).json({success: true, data: newMessage, ticketCreated: shouldCreateTicket, ticket: ticket});
    } catch(err){
        res.status(500).json({success:false, error:err.message});
    }
};

const getChatHistory=async(req,res)=>{
    try{
        const messages=await Message.find()
        .sort({createdAt:-1})
        .limit(20);

        messages.reverse();
        res.status(200).json({success:true, data: messages});
    }catch(err){
        res.status(500).json({success:false, error: err.message});
    }
};

module.exports={sendMessage, getChatHistory};