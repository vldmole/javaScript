//server.js
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../../proto/notes.proto'))
const NotesDefinition = grpc.loadPackageDefinition(protoObject)

const noteService = require('./notes/notes.service');

const server = new grpc.Server();
server.addService(NotesDefinition.NoteService.service, noteService);

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();

console.log('Listening');