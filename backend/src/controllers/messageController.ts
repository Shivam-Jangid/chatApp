import { Request, Response } from "express";
import User from "../models/userModel";
import message from "../models/messageModel";
import { idMap } from "../lib/ws";
interface reqBody extends Request { 
    user?:any
}

function formatDateTime(date: Date) {
    const day = date.getDate();
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 
                       'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    const minutesStr = minutes.toString().padStart(2, '0');


    const dateTimeObj = {
        date:`${day} ${monthName} ${year}`,
        time:`${hours}:${minutesStr} ${ampm}`
    }

    return dateTimeObj;
}


async function getMessages(req: reqBody, res: Response) {  
    try{
          const Recieversid = req.params.id;
          const sendersId = req.user.id;

          const messages = await message.find({
            $or:[
                {senderId:sendersId, receiverId:Recieversid},
                {senderId:Recieversid, receiverId:sendersId}
            ]
          }).lean();

          const formattedMessage = messages.map((mes) => ({...mes,date:formatDateTime(mes.createdAt).date,time:formatDateTime(mes.createdAt).time}));
          res.status(200).json({allMessages:formattedMessage}); 
        
    }
    catch(error){
        res.status(500).json({message: 'Internal server error at getMessagesController', error});
    }

}

async function getusers(req: reqBody, res: Response) {  
    try{
        const loggedInUserId = req.user._id;
        const users = await User.find({_id: {$ne: loggedInUserId}}).select('-password');
        res.status(200).json({alllUsers:users});
    }       
    catch(error){     
        res.status(500).json({message: 'Internal server error at getusersController', error});
    }

}

async function sendMessage (req:reqBody,res: Response) {
  try {
    const receiverId = req.params.id;
    const senderId = req.user.id;
    const text = req.body.text;
    
    const newMessage = await message.create({
      senderId,
      receiverId,
      text
    });

    const receiverSocket = idMap.get(receiverId);
    if (receiverSocket) {
      const formattedMessage = {
        _id: newMessage._id.toString(),
        senderId: newMessage.senderId.toString(),
        receiverId: newMessage.receiverId.toString(),
        text: newMessage.text,
        createdAt: newMessage.createdAt,
        updatedAt: newMessage.updatedAt,
        date: formatDateTime(newMessage.createdAt).date,
        time: formatDateTime(newMessage.createdAt).time
      };

      receiverSocket.send(JSON.stringify({
        type: "message",
        data: formattedMessage 
      }));
    }
    const formattedResponse = {
      ...newMessage.toObject(),
      date: formatDateTime(newMessage.createdAt).date,
      time: formatDateTime(newMessage.createdAt).time
    };

    res.status(200).json({ 
      message: 'Message sent successfully', 
      newMessage: formattedResponse 
    });
  } 
    catch(error){
        res.status(500).json({message: 'Internal server error at sendMessageController', error});
    }
}

export { getMessages,getusers, sendMessage };
