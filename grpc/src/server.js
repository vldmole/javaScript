//server.js
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../proto/notes.proto'))
const NotesDefinition = grpc.loadPackageDefinition(protoObject)


const notes = [
   { id: 1, title: 'Note 1', description: 'Content 1' },
   { id: 2, title: 'Note 2', description: 'Content 2' }
]

function list(_, callback)
{
   return callback(null, { notes });
}

function find({ request: { id } }, callback)
{
   const note = notes.find((note) => note.id === id);

   if (!note)
      return callback(new Error('Not found "id: ' + id + '"' ), null);
   
   return callback(null, { note })
}


const server = new grpc.Server();
server.addService(NotesDefinition.NoteService.service, { list, find });

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();

console.log('Listening');