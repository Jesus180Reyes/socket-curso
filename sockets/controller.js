const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();
const socketCotroller = (socket) => {

    // console.log("Cliente conectado", socket.id);

    // socket.on('disconnect', () => {
    //     console.log('desconectado');
    // });
    socket.emit('ultimo-ticket', ticketControl.ultimo);

    socket.on('siguiente-ticket', (payload, callback) => {

        const sigueinte = ticketControl.siguiente();
        callback(sigueinte);
        // TODO: NOtificar que hay un nuevo ticket pendiente de asignar

    });
};

module.exports = {
    socketCotroller
}