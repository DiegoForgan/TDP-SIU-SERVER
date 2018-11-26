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




var notificar = function(titulo, texto, destino){
	var req = https.request(options, (res)=>{
		res.on('data', (d) => {
	    process.stdout.write(d);
	  });
	});

	req.on('error', (e) => {
	  console.error(e);
	});

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	var hh = today.getHours();
	var min = today.getMinutes();
	var ss = today.getSeconds()
	if(dd<10) { dd='0'+dd; } 
	if(mm<10) { mm='0'+mm; } 

	var postData = JSON.stringify({
	    'data' : {
	    	'title': titulo,
	    	'text': texto,
	    	'timestamp': dd+"/"+mm+"/"+yyyy+" "+hh+":"+min+":"+ss
	    },
	    'to': '/topics/' + destino,
	    'priority': 'high'
	});
	console.log(postData)
	req.write(postData);
	req.end();
}

module.exports = {
  notificar: (titulo, texto, destino) => {
    return notificar(titulo, texto, destino);
  }
}