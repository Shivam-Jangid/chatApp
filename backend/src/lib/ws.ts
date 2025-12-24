import { WebSocketServer,WebSocket } from "ws";
import http from "http";
import {URL} from "url";


export const idMap = new Map<string, WebSocket>();
const replaced_sockets = new Set<WebSocket>();
const onLineUsers = new Set<string>();

export const setupWebSocketServer = (server:http.Server) =>{
    const wsServer = new WebSocketServer({server});
    wsServer.on('connection',async (socket, req) =>{
        let id:string | null = null;
        try{
            if(req.url){
                const url = new URL(req.url,`ws://${req.headers.host}`);
                id = url.searchParams.get('id');
                if(!id){
                    console.log('not a valid user');
                    return;
                }
                const id_socket = idMap.get(id);
                if(id_socket){
                   replaced_sockets.add(id_socket);
                }
                idMap.set(id,socket);
                onLineUsers.add(id);
                 for (let i of idMap){
                    const pair = i;
                    const current_socket = pair[1];
                    const sendingObj = {
                        type: "info",
                        onlineusers:Array.from(onLineUsers)
                    }
                    current_socket.send(JSON.stringify(sendingObj));
                }
            }
        }
        catch(err){
            console.log('no id present');
            return;
        };

        socket.on('message', (data) =>{
            const jsonData = JSON.parse(data.toString());

        })


        socket.on('close', () =>{
            if(id){
                const curr_sock = idMap.get(id);
                if(curr_sock == socket){
                    idMap.delete(id);
                }
                onLineUsers.delete(id);
                for (let i of idMap){
                    const pair = i;
                    const current_socket = pair[1];
                    const sendingObj = {
                        type: "info",
                        onlineusers:Array.from(onLineUsers)
                    }
                    current_socket.send(JSON.stringify(sendingObj));
                }
            }
            return;
        })

        const clean_up = () =>{
            for(let i of replaced_sockets) {
                i.close();
            }
            replaced_sockets.clear();
        }
        clean_up();
    })
}