const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log("MONGODB connected");
    }catch(err){
        console.error("MONGODB connection failed", err.message);
        process.exit(1);
    }
};

module.exports=connectDB;