const socket = io();
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtmensaje = document.querySelector('#txtmensaje');
const btnEnviar = document.querySelector('#btnEnviar');

socket.on('connect', () => {
    console.log("Conectado al servidor");
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});
socket.on('enviar-mensaje', (payload) => {
    console.log('Aqui se recibe el mensaje');
    console.log(payload);
});

socket.on('disconnect', () => {
    console.log("Desconectado del servidor");
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

btnEnviar.addEventListener('click', () => {
    payload = {
        mensaje: txtmensaje.value,
        id: socket.id,
        nombre: 'Jesus',
        fecha: new Date().getTime()


    }
    const mensaje = txtmensaje.value;
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Mensaje Enviado!!', id);
    });

});