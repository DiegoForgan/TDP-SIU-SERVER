//const db = require('../db');

$(document).ready(()=>{

});

function clickEstudiantes() {
	var reader = new FileReader();

	reader.readAsText($("#archivoEstudiantes").prop("files")[0]);
	$.blockUI({ message: "Cargando.." });
	reader.onload = function(e) {
		var lines = reader.result.split('\n');
		var listaAlumnos = [];
		for (var i = 0; i <= lines.length; i++) {
			if (lines[i]){
				var splittedLine = lines[i].split(',');
				var data = {
					padron: splittedLine[0].trim(),
					apellido: splittedLine[1].trim(),
					nombre: splittedLine[2].trim(),
					usuario: splittedLine[3].trim(),
					contrasena: splittedLine[4].trim(),
					prioridad: splittedLine[5].trim()
				}
				listaAlumnos.push(data);
			}
		}
		$.ajax({
			url: '../admin/alumnos',
			type: 'POST',
			data: {
				"listaAlumnos": listaAlumnos
			},
			success: (data)=>{
				$.unblockUI();
				swal({
				  type: 'success',
				  title: 'Guardado!',
				  text: 'Se han guardado los alumnos'
				});
			},
			error: function (xhr, ajaxOptions, thrownError) {
		        $.unblockUI();
		        swal({
				  type: 'error',
				  title: 'Oops...',
				  text: 'Ha ocurrido un error al intentar guardar alumnos'
				});
		        console.log(xhr.responseText);
		        console.log(thrownError);
	      	}
		});
	}
	
}

function clickDocentes() {
	var reader = new FileReader();

	reader.readAsText($("#archivoDocentes").prop("files")[0]);
	$.blockUI({ message: "Cargando.." });
	reader.onload = function(e) {
		var lines = reader.result.split('\n');
		var listaDocentes = [];
		for (var i = 0; i <= lines.length; i++) {
			if (lines[i]){
				var splittedLine = lines[i].split(',');
				
				var data = {
					legajo: splittedLine[0].trim(),
					apellido: splittedLine[1].trim(),
					nombre: splittedLine[2].trim(),
					usuario: splittedLine[3].trim(),
					contrasena: splittedLine[4].trim()
				}
				listaDocentes.push(data);
			}
		}
		$.ajax({
			url: '../admin/docentes',
			type: 'POST',
			data: {
				"listaDocentes": listaDocentes
			},
			success: (data)=>{
				$.unblockUI();
				swal({
				  type: 'success',
				  title: 'Guardado!',
				  text: 'Se han guardado los docentes'
				});
			},
			error: function (xhr, ajaxOptions, thrownError) {
		        $.unblockUI();
		        swal({
				  type: 'error',
				  title: 'Oops...',
				  text: 'Ha ocurrido un error al intentar guardar docentes'
				});
		        console.log(xhr.responseText);
		        console.log(thrownError);
	      	}
		});
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
