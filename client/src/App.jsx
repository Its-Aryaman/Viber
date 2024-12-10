import React, { useEffect,useMemo,useState } from 'react'
import {io} from "socket.io-client"
import { Button, Container, Stack, TextField, Typography } from "@mui/material";

function App() {


  const socket = useMemo(() => io("http://localhost:3000/"), [])

  const [message, setmessage] = useState("");
  const [Room, setRoom] = useState("");
  const [Socket, setSocket] = useState("")
  const [messages, setMessages] = useState([]);

  console.log(messages);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message, Room});
    setmessage("");


  }


  useEffect(()=> {
    socket.on("connect",() => {
      setSocket(socket.id);
      console.log("connected",socket.id);
    });
    socket.on("welcome",(s)=>{ 
      console.log(s)
    });
    socket.on("broadcast", (s)=> {
      console.log(s);
    })
    socket.on("message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data.message]);
    })



    return () => { socket.disconnect()}
  },[socket]);



  return (
    <Container maxWidth="sm" sx={{ paddingTop: 9 }}>
    <Typography variant='h1' component="div" gutterBottom>
      Welcome to Viber
    </Typography>


    <Typography variant='h5' component="div" gutterBottom>
        {Socket}
      </Typography>



    <form onSubmit={handleSubmit}>
      <TextField value={message} onChange={ (e)=> {setmessage(e.target.value)}} id='outlined-basic' label='Message' variant='outlined' />
      <TextField value={Room} onChange={ (e)=> {setRoom(e.target.value)}} id='outlined-basic' label='Room' variant='outlined' />
      <Button type='submit' variant='contained' color='primary'>Send</Button>
    </form>


    <Stack>
      {
        messages.map((m,i) => (
          <Typography key={i} variant='h6' component="div" gutterBottom>
            {m}
          </Typography>
        ))
      }
    </Stack>



  </Container>)
}

export default App