//client.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../../proto/notes.proto'));
const NotesDefinition = grpc.loadPackageDefinition(protoObject);

const client = new NotesDefinition.NoteService('localhost:50051', grpc.credentials.createInsecure());

function callAsync(client, method, parameters)
{
   return new Promise((resolve, reject) =>
   {
      client[method](parameters, (err, response) =>
      {
         if (err)
            reject(err);

         resolve(response)
      })
   })
}

console.log('-----------------------------------------------------------');

callAsync(client, 'list', {}).then(console.log).catch(console.error);
callAsync(client, 'find', { id: 2 }).then(console.log).catch(console.error);
