
var soap = require('soap');
var url = "http://localhost:3030/bmicalculator?wsdl";
var args = {weight:120.7, height:1.94};

/*soap.createClientAsync(url, function (err, client)
{
    if(err)
        console.error(err);
    else 
    {
        client.calculateBMI(args, function (err, response)
        {
            if (err)
                console.error(err);
            else 
            {
                console.log(response);
            }
        })
    }
});*/

async function calBMi()
{
    var client = await soap.createClientAsync(url);
    
    client.calculateBMI(args, function (err, response)
    {
        if (err)
            console.error(err);
        else 
        {
            console.log(response);
        }
    });
}
calBMi();
