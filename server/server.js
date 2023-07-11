/*
    Cria um serviço na porta 3000
*/
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Olá, mundo!');
});

const porta = 3000;

/*
Ao usar 'localhost' como o host, o servidor será acessível apenas no próprio 
sistema em que está sendo executado. Isso significa que as conexões para o servidor 
só serão aceitas de dentro do próprio sistema local. 
É uma maneira comum de criar um servidor que esteja disponível apenas localmente.
*/ 
server.listen(porta, 'localhost', () => {
  console.log(`Servidor em execução no http://localhost:${porta}`);
});

/*
    Testa conexão na porta 3000
*/

const net = require('net');

function checkPortAvailability(port) {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        tester.once('close', () => resolve(true)).close();
      })
      .listen(port,'localhost'); 
      //se omitirmos o paramentro 'localhost' pegara 
      //todas as oportas do Sistema Operacional
  });
}

// Exemplo de uso:
const port = 3000;

setTimeout(()=>{
  checkPortAvailability(port)
  .then((isAvailable) => {
    if (isAvailable) {
      console.log(`A porta ${port} está disponível.`);
    } else {
      console.log(`A porta ${port} já está sendo usada.`);
    }
  })
  .catch((err) => {
    console.error(`Erro ao verificar a porta ${port}:`, err);
  });
},500)