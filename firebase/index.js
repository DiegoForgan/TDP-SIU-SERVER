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

var req = https.request(options);

req.on('error', (e) => {
  console.error(e);
});


var notificar = function(titulo, texto, destino){
	

	var postData = JSON.stringify({
	    'notification' : {
	    	'title': titulo,
	    	'text': texto
	    },
	    'to': '/topics/' + destino
	});

	req.write(postData);
	req.end();
}

module.exports = {
  notificar: (titulo, texto, destino) => {
    return notificar(titulo, texto, destino);
  }
}