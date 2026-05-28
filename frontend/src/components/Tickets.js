import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Tickets=()=>{
    const [tickets, setTickets]= useState([]);
    const [loading, setLoading]= useState(true);

    const fetchTickets= async()=>{
        try{
            const response= await axios.get('http://localhost:5000/api/ticket/');
            setTickets(response.data.data);
        } catch(err){
            console.error('Error fetching tickets:', err);
        }finally{
            setLoading(false);
        }
    };

    const updateTicketStatus= async(id,status)=>{
        try{
            await axios.patch(`http://localhost:5000/api/ticket/${id}/`,{
                status
            });
            fetchTickets();
        } catch(err){
            console.error('Error updating ticket:', err);
        }
    };

    useEffect(()=>{
        fetchTickets();
    }, []);

    if(loading) return <div className="loading">Loading tickets...</div>;

    return(
        <div className="tickets-container">
            <h2>Support Tickets</h2>
            {tickets.length===0?(
                <p className="no-tickets">No tickets found!</p>
            ):(
        tickets.map(ticket=>(
            <div key={ticket._id} className={`ticket-card ${ticket.status}`}>
                <p className="ticket-query">{ticket.userQuery}</p>
                <div className="ticket-footer">
                    <span className={`ticket-status ${ticket.status}`}>
                        {ticket.status.toUpperCase()}
                    </span>
                    <span className="ticket-date">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                    {ticket.status==='open'?(
                        <button 
                        className="ticket-btn close" onClick={()=> updateTicketStatus(ticket._id,'closed')}> Close Ticket</button>
                    ):(<button className="ticket-btn reopen" onClick={()=> updateTicketStatus(ticket._id, 'open')}>Reopen Ticket</button>)}
                </div>
            </div>
        ))
    )}
        </div>
    );
};

export default Tickets;