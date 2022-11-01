const { notes } = require('./notes.data.js');

//---------------------------------------------------------------------------
function list(_, callback)
{
   return callback(null, { notes });
}


//---------------------------------------------------------------------------
function find({ request: { id } }, callback)
{
   const note = notes.find((note) => note.id === id);

   if (!note)
      return callback(new Error('Not found "id: ' + id + '"' ), null);
   
   return callback(null, { note })
}


//---------------------------------------------------------------------------
module.exports = NotesService = {
   list,
   find
}