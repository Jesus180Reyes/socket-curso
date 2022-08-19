const express = require('express');
const cors = require('cors');
const { socketCotroller } = require('../sockets/controller');
class Server {

    constructor() {
        // Inicializar variables
        this.port = process.env.PORT;
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        // MiddleWare;
        this.middlewares();
        // Path de usuarios
        this.paths = {};
        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';
        // Conectar a Base DE datos

        // Rutas de la API
        this.routes();
        this.sockets();

    }

    middlewares() {
        // Cors
        this.app.use(cors());

        this.app.use(express.static('public'));

    }
    routes() {
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }
    sockets() {
        this.io.on('connection', socketCotroller);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;