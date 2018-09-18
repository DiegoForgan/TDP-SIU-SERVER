//const db = require('../db');

$(document).ready(()=>{

});

function clickEstudiantes() {
	var reader = new FileReader();

	reader.readAsText($("#archivoEstudiantes").prop("files")[0]);
	
	reader.onload = function(e) {
		var lines = reader.result.split('\n');
		for (var i = 0; i <= lines.length; i++) {
			console.log(lines[i]);
		}
	}
	$.ajax({
		url: '../base',
		type: 'GET',
		success: (data)=>{
			console.log("dfd");
			console.log(data);
		},
		error: function (xhr, ajaxOptions, thrownError) {
	        alert(xhr.responseText);
	        alert(thrownError);
	      }
	})
}

function clickDocentes() {
	var reader = new FileReader();

	reader.readAsText($("#archivoDocentes").prop("files")[0]);
	
	reader.onload = function(e) {
		var lines = reader.result.split('\n');
		for (var i = 0; i <= lines.length; i++) {
			console.log(lines[i]);
		}
	}
}


// maneja el input
$(".input-file-estudiantes").before(
	function() {
		var element = $("<input id='archivoEstudiantes' type='file' accept='.csv' class='input-ghost' style='visibility:hidden; height:0'>");
		element.attr("name",$(this).attr("name"));
		element.change(function(){
			element.next(element).find('input').val((element.val()).split('\\').pop());
		});
		$(this).find("button.btn-choose").click(function(){
			element.click();
		});
		$(this).find("button.btn-reset").click(function(){
			element.val(null);
			$(this).parents(".input-file-estudiantes").find('input').val('');
		});
		$(this).find('input').css("cursor","pointer");
		$(this).find('input').mousedown(function() {
			$(this).parents('.input-file-estudiantes').prev().click();
			return false;
		});
		return element;
	}
	
);

// maneja el input
$(".input-file-docentes").before(
	function() {
		var element = $("<input id='archivoDocentes' type='file' accept='.csv' class='input-ghost' style='visibility:hidden; height:0'>");
		element.attr("name",$(this).attr("name"));
		element.change(function(){
			element.next(element).find('input').val((element.val()).split('\\').pop());
		});
		$(this).find("button.btn-choose").click(function(){
			element.click();
		});
		$(this).find("button.btn-reset").click(function(){
			element.val(null);
			$(this).parents(".input-file-docentes").find('input').val('');
		});
		$(this).find('input').css("cursor","pointer");
		$(this).find('input').mousedown(function() {
			$(this).parents('.input-file-docentes').prev().click();
			return false;
		});
		return element;
	}
	
);
