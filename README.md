# AI Chat Support System

A full stack AI powered customer support system built with Node.js, Express.js, MongoDB, and React.js.

## Live Demo
- Frontend: https://ai-chat-support-6xbq.vercel.app
- Backend: https://aichatsupport-x5vaji5z.b4a.run

## Features
- Real time AI chat powered by Groq API (LLaMA 3.3 70B model)
- Context memory — AI remembers previous messages in conversation
- Auto ticket creation — detects keywords like refund, complaint, issue and automatically creates support tickets
- Tickets dashboard — view, close and reopen support tickets
- Chat history — messages persist across page navigation
- WhatsApp style chat UI

## Tech Stack
**Frontend:** React.js, Axios, React Router DOM

**Backend:** Node.js, Express.js, MongoDB Atlas, Groq AI API

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Groq API key

### Installation

**Clone the repository:**
```git clone https://github.com/Smitojit/ai-chat-support.git```

**Backend setup:**
```
cd ai-chat-support
npm install
```

**Create a `.env` file in root folder:**
```
MONGO_URI=your_mongodb_uri 
PORT=5000
GROQ_API_KEY=your_groq_api_key
```

```node server.js```

**Frontend setup:**
```
cd frontend
npm install
npm start
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/chat/ | Send a message |
| GET | /api/chat/history | Get chat history |
| POST | /api/ticket/ | Create a ticket |
| GET | /api/ticket/ | Get all tickets |
| PATCH | /api/ticket/:id | Update ticket status |

## Author
Smitojit Nandy
