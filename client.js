const io = require('socket.io-client');
const socket = io() 
let name; 
let textarea = 
document.querySelector('#textarea ') 
let messageArea = 
document.querySelector('.me ssage__area')
 do { name = prompt('Please enter your name: ') }

while(!name) textarea.addEventListener('keyup', (e) => { if(e.key ===
'Enter') { sendMessage(e.target.value) } }) 
function sendMessage(message) {
let msg = { user: name, message: message.trim() } // Append 
appendMessage(msg, 'outgoing') 
textarea.value = ''
 scrollToBottom() 
//Send to server
 socket.emit('message', msg) } function 
appendMessage(msg, type) { 
     mainDiv = document.createElement('div') 

 mainDiv.classList.add(className, 'message')
let markup = `${msg.user} ${msg.message}`
mainDiv.innerHTML = markup
 messageArea.appendChild(mainDiv) }
//Recieve messages
socket.on('message', (msg) => { appendMessage(msg, 'incoming') 
scrollToBottom() }) 
function scrollToBottom()
{ messageArea.scrollTop = messageArea.scrollHeight; } server.js 
const express = require('express') 
const app = express()

 http = require('http').createServer(app)
const PORT = process.env.PORT || 3000
 http.listen(PORT, () => { 
console.log(`Listening on port ${PORT}`) }) 
app.use(express.static(__dirname + '/public'))
 app.get('/', (req, res) =>
 { res.sendFile(__dirname + '/index.html') }) 
 const io = require('socket.io')(http)
 io.on('connection', (socket) => 
{ console.log('Connected...') 
socket.on('message', (msg) => { 
socket.broadcast.emit('message', msg) }) })