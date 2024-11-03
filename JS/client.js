const socket = io('http://localhost:8000');

const form = document.getElementById('send_message');

const message = document.getElementById('message_in');

const message_container = document.querySelector(".container");

var m = document.cookie.match(RegExp('User=([^;]+)'));
const named = decodeURIComponent(m[1]);

var audio = new Audio('nf_sound.mp3');

socket.emit('new-user-joined', named);

const append = (message,position) =>{
        const MessageElement = document.createElement('div');
        MessageElement.innerText = message;
        MessageElement.classList.add('message');
        MessageElement.classList.add(position);
        message_container.append(MessageElement);
        message_container.scrollTop = message_container.scrollHeight;
        if (position != 'right') {
            audio.play();
        }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message_send = message.value;
    append(`You: ${message_send}`,'right');
    socket.emit('send', message_send); 
    message.value = '';
})

socket.on('user-joined',named=>{
    append(`${named} joined the chat`, 'middle');
})

socket.on('recevie',data=>{
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('left',name=>{
    append(`${name} left the chat`, 'middle');
})