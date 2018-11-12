const https = require('https');

var options = {
	hostname: 'fcm.googleapis.com',
	port: 443,
	path: '/fcm/send',
	method: 'POST',
	headers: {
  		'Authorization': 'key=' + process.env.FIREBASEKEY,
       	'Content-Type': 'application/json'
 	}
};

var req = https.request(options, (res)=>{
	res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});


var notificar = function(titulo, texto, destino){
	

	var postData = JSON.stringify({
	    'data' : {
	    	'title': titulo,
	    	'text': texto
	    },
	    'to': '/topics/' + destino,
	    'priority': 'high'
	});

	//req.write(postData);
	req.end(postData);
}

module.exports = {
  notificar: (titulo, texto, destino) => {
    return notificar(titulo, texto, destino);
  }
}