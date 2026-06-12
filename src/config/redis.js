const { createClient }= require( 'redis');

const client = createClient({
    username: 'default',
    password:process.env.PREDIS_PASS,
    socket: {
        host: process.env.HOST,
        port: 16447
    }
});

module.exports=client;
