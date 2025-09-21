import { Request, Response } from "express";
import User from "../models/userModel";
interface reqBody extends Request { 
    user?:any
}


async function getMessages(req: reqBody, res: Response) {  
    try{
        
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

export { getMessages,getusers }; 