import express from "express";
import { Server } from "socket.io";
import {createServer} from "http"


const port= 3000;

const app=express();
const server= createServer(app);


const io= new Server(server,{
    cors: {
        origin: 'http://localhost:5173',
        methods:["GET","POST"],
        credentials:true
    }
});


app.get('/',(req,res)=>{
    res.send("Hello World");
});

io.on("connection",(socket)=>{
    console.log("User Connected",socket.id);
    // socket.emit("welcome",`Welcome to the server ${socket.id}`);
    // socket.broadcast.emit("broadcast",` User ${socket.id} has joined the group`);
    socket.on("disconnect",() => {
        console.log(`User disconnected ${socket.id}`);
    })

    socket.on("message",(data) => {
        console.log(data);
        io.to(data.Room).emit("message",data);
    });

});



server.listen(port, () => {
    console.log(`Server is Running ${port}`);
});