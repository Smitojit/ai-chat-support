const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');

dotenv.config();

const connectDB=require('./config/db');
connectDB();


const app=express();
app.use(express.json());
app.use(cors());

const chatRoutes=require('./routes/chatRoutes');
const ticketRoutes=require('./routes/ticketRoutes');

app.use('/api/chat', chatRoutes);
app.use('/api/ticket', ticketRoutes);

app.get('/',(req,res)=>{
    res.send('AI Chat Support backend is running');
});

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});