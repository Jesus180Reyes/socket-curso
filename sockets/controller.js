const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();
const socketCotroller = (socket) => {

    // console.log("Cliente conectado", socket.id);

    // socket.on('disconnect', () => {
    //     console.log('desconectado');
    // });
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);
    socket.emit('estado-actual', ticketControl.ultimo4);
    socket.on('siguiente-ticket', (payload, callback) => {
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
        const sigueinte = ticketControl.siguiente();
        callback(sigueinte);
        // TODO: NOtificar que hay un nuevo ticket pendiente de asignar

    });
    socket.emit('estado-actual', (ticketControl.ultimo4));
    socket.broadcast.emit('tickets-pendientes', (ticketControl.tickets.length));
    socket.on('atender-ticket', (escritorio, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: "El Objeto escritorio es necesario"
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        socket.broadcast.emit('estado-actual', ticketControl.ultimo4);
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        const cantidadTickets = ticketControl.tickets.length;
        if (!ticket) {
            return callback({
                ok: false,
                msg: "No hay tickets disponibles"

            });

        }
        callback({
            ok: true,
            msg: "Ticket asignado",
            ticket,
            cantidadTickets
        });
    });
};

module.exports = {
    socketCotroller
}