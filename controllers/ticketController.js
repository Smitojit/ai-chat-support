const Ticket=require('../models/Ticket');

exports.createTicket= async(req, res)=>{
    try{
        const {userQuery}=req.body;

        const newTicket=new Ticket({userQuery});
        await newTicket.save();

        res.status(201).json({success: true, data: newTicket});
    }catch(err){
        res.status(500).json({success: false, message: err.message});
    }
};

exports.getAllTickets=async (req, res)=>{
    try{
        const tickets=await Ticket.find().sort({createdAt:-1});
        res.status(200).json({success: true, data: tickets});
    }catch(err){
        res.status(500).json({success:false, message: err.message});
    }
};

exports.updateTicket=async(req,res)=>{
    try{
        const {id}=req.params;
        const {status}=req.body;

        const ticket=await Ticket.findByIdAndUpdate(
            id,
            {status},
            {new: true} 
        );

        if(!ticket){
            return res.status(404).json({success:false, message:"Ticket not found"});
        }

        res.status(200).json({success:true, data: ticket});
    }catch(err){
        res.status(500).json({success:false, message:err.message});
    }
};