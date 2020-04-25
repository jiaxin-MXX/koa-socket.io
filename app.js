const Koa = require('koa');
const static = require('koa-static')
const path = require('path')
const Router = require("koa-router")
const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
app.use(
    static(path.join(__dirname , './public'))
)
io.on('connection', socket => {
    //发送客户端唯一id
    socket.emit('sendid', socket.id);
    socket.on('send', (data) => {
         socket.broadcast.emit('getMsg',data);
    })
})

server.listen(4000);