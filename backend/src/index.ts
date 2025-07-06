import { WebSocketServer ,WebSocket } from "ws";

const wss = new WebSocketServer ({port:8080});
interface User {
    ws:WebSocket;
    room:string;
}
const allws:User[] = [];

// [
//     {
//         socket1, room1 
//     }, 
//     {
//         socket 2, room2
//     }
// ]

wss.on('connection', (ws)=>{
    ws.on('message', (message)=>{
        const parsedMessage = JSON.parse(message as unknown as string);
        if(parsedMessage.type === 'join'){
            console.log('Join request initiated');
            console.log("roomId: "+ parsedMessage.payload.roomId);
            allws.push({
                ws, room:parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type === "chat"){
            console.log('Chat request initiated');
            let currentUserRoom = null;
            //finding current user
            for(let i=0; i<allws.length; i++){
                if(ws == allws[i].ws){
                    currentUserRoom = allws[i].room;
                }
            }
            for(let i=0; i<allws.length; i++){
                if(allws[i].room == currentUserRoom){
                    allws[i].ws.send(parsedMessage.payload.message);
                }
            }
        }
    }
)
})
