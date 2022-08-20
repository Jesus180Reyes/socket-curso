
// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblCola = document.querySelector('h4');
const lblPendientes = document.querySelector('#lblPendientes');
const socket = io();
const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');

};

const escritorio = searchParams.get('escritorio');
divAlerta.style.display = 'none';

lblEscritorio.innerText = 'Escritorio N° ' + escritorio;
console.log({ escritorio });
socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true;
});
socket.on('tickets-pendientes', (payload) => {
    lblPendientes.innerText = payload;
});
socket.on('ultimo-ticket', (ultimo) => {
    // lblNuevoTicket.innerText = 'Ticket N° ' + ultimo;
});



btnAtender.addEventListener('click', () => {
    // socket.emit('siguiente-ticket', null, (ticket) => {
    //     console.log('Desde el server', ticket);
    //     lblNuevoTicket.innerText = ticket;
    // });

    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg, ticketCantidad }) => {
        if (!ok) {
            lblTicket.innerText = 'Nadie';
            return divAlerta.style.display = 'inline';
        }
        lblTicket.innerText = 'Ticket ' + ticket.numero;
    });

});