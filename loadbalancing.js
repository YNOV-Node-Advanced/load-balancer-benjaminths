const net = require("net");
const PORT = process.env.PORT || 5000;

let hosts = [{ port: 5001 }, { port: 5002 }];

let server = net.createServer(function(socket) {
  connectOptions = hosts[0];

  const client = net.createConnection({ port: 5001 });

  client.pipe(socket);
  client.pipe(client);

  client.on("data", data => {
    console.log(data);
  });

  client.on("error", err => {
    console.log(err);
    client.end();
  });

  socket.on("end", err => {
    console.log(err);
    client.end();
  });
});

server.listen(PORT);
