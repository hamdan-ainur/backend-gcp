const express = require('express')
const app = express()
const http = require('http').createServer(app)
const auth = require('./router/auth')
const customer = require('./router/customer')
const admin = require('./router/admin')
const io = require('socket.io')(http);

//middleware
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({extended:true}));
app.use('/public',express.static('./files'))
app.set('io', io)
//router
app.get('/', (req, res)=>{
	res.json(
		{
			message : 'Dukcapil'
		}
	)
})

app.use('/auth', auth)
app.use('/customer', customer)
app.use('/admin', admin)

http.listen(5000, () =>{
	console.log('server is running in port 5000');
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
	
});
