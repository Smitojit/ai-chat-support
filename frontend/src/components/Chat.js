import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const Chat=()=>{
    const [messages, setMessages]= useState([]);
    const [userInput, setUserInput]= useState('');
    const [loading, setLoading]= useState(false);
    const messagesEndRef= useRef(null);

    const scrollToBottom=()=>{
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(()=>{
        scrollToBottom();
    },[messages]);

    useEffect(()=>{
        const fetchHistory=async()=>{
            try{
                const response= await axios.get('http://localhost:5000/api/chat/history');
                const historyMessages=response.data.data.flatMap(msg=>([
                    {sender:'user', text:msg.userMessage},
                    {sender:'ai', text: msg.aiResponse}              
                ]));
                setMessages(historyMessages);

            }catch(err){
                console.log('Could not fetch history', err);
            }
        };
        fetchHistory();
    },[]);

    const sendMessage=async()=>{
        if(!userInput.trim()) return;

        const userMessage={sender: 'user', text: userInput};
        setMessages(prev=>[...prev, userMessage]);
        setUserInput('');
        setLoading(true);

        try{
            const response=await axios.post('http://localhost:5000/api/chat/',{
                userMessage: userInput
            });

            const aiMessage={
                sender: 'ai',
                text: response.data.data.aiResponse 
            };
            setMessages(prev=>[...prev, aiMessage]);

            if(response.data.ticketCreated){
                const ticketMessage={
                    sender: 'system',
                    text: '🎫 A support Ticket has been created for your query!'
                };
                setMessages(prev=>[...prev, ticketMessage]);
            }
        }catch(err){
            const errorMessage={
                sender: 'system',
                text: 'Something went wrong. Please try again.'
            };
            setMessages(prev=>[...prev, errorMessage]);
        }finally{
            setLoading(false);
        }
    };

    const handleKeyPress=(e)=>{
        if(e.key=== 'Enter')sendMessage();
    };

    return(
        <div className="chat-container">
            <div className="messages-box">
                {messages.map((msg, index)=>(
                    <div key={index} className={`message ${msg.sender}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
                {loading && (
                    <div className="message ai">
                        <p>Typing...</p>
                    </div>
                )}
                <div ref={messagesEndRef}/>
            </div>
            <div className="input-box">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={userInput}
                  onChange={(e)=> setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={sendMessage} disabled={loading}>
                    {loading? 'Sending...':'Send'}
                </button>
            </div>
        </div>
    );
};

export default Chat;