const http = require('http');

const myServer = http.createServer((req , res)=>{
    console.log("New Req rec...");
    res.end("Hello From server ");
});
/* run server
PS D:\BACKEND\LearnNode> node index.js
Server Started!
*/
myServer.listen(8000 , ()=>console.log("Server Started!"));  