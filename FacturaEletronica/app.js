import * as fs from 'fs'

async function go() 
{
   console.log("hello world");

   const directoyPath = './files';
   if (fs.existsSync(directoyPath))
   {
      console.log("Already created !!");
      fs.promises.rmdir(directoyPath)
         .then(() => { console.log("Removed1"); });
      console.log("em sequência sincrono");
   }
   console.log("Will create !!");
   await fs.promises.mkdir('./files');
   console.log("Now created !!");
}
go();

function get()
{
   return {
      c: 5
   };

}
console.log(get().c)

import builder from 'xmlbuilder2';
function xmlBuilder()
{
   var xml = builder.create()
      .ele('root')
      .ele('xmlbuilder')
         .ele('repo', { 'type': 'git' })
            .txt('git://github.com/oozcitak/xmlbuilder-js.git')
         .up()
         .ele('outro').txt('conteúdo')
         .up()
      .end({ pretty: true });

   console.log(xml);
}
xmlBuilder();
