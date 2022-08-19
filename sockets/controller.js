

const socketCotroller = (socket) => {

    console.log("Cliente conectado", socket.id);

    socket.on('disconnect', () => {
        console.log('desconectado');
    });

    socket.on('enviar-mensaje', (payload, callback) => {
        const id = 12343456789
        callback(id);
        socket.broadcast.emit('enviar-mensaje', payload);
    });
};

module.exports = {
    socketCotroller
}