$(document).ready(()=>{
	var termina = {
		cursosCargados: false
	};

	$.blockUI({message: "Cargando.."})
	cargarCursos(termina);
});

function borrarCurso(curso){
	$.ajax({
			url: '../admin/cursos/' + curso,
			type: 'DELETE',
			success: (data)=>{
				console.log(data);
				cargarCursos();
			}
		});
}

function cargarCursos(termina){
	$.ajax({
			url: '../admin/cursos',
			type: 'GET',
			success: (data)=>{
				if (data.length > 0){
					$("#tablaCursos").empty();

					var table = document.createElement("table");
					table.className = "table table-striped";

					var thead = document.createElement("thead");
					table.append(thead);

					var tr = document.createElement("tr");
					thead.append(tr);

					var thCodigo = document.createElement("th");
					thCodigo.innerHTML = "Codigo";
					tr.append(thCodigo);

					var thNombre = document.createElement("th");
					thNombre.innerHTML = "Nombre";
					tr.append(thNombre);

					var thDocente = document.createElement("th");
					thDocente.innerHTML = "Docente";
					tr.append(thDocente);

					var thSede = document.createElement("th");
					thSede.innerHTML = "Sede";
					tr.append(thSede);

					var thAulas = document.createElement("th");
					thAulas.innerHTML = "Aulas";
					tr.append(thAulas);

					var thCupos = document.createElement("th");
					thCupos.innerHTML = "Cupos";
					tr.append(thCupos);

					var thDias = document.createElement("th");
					thDias.innerHTML = "Dias";
					tr.append(thDias);

					var thHorarios = document.createElement("th");
					thHorarios.innerHTML = "Horarios";
					tr.append(thHorarios);

					var thAcciones = document.createElement("th");
					thAcciones.innerHTML = "Acciones";
					tr.append(thAcciones);

					var tbody = document.createElement("tbody");
					table.append(tbody);

					for (var i = 0; i < data.length; i++) {
						var tr = document.createElement("tr");
						tr.setAttribute("id", data[i].id_curso)
						tbody.append(tr);

						var tdCodigo = document.createElement("td");
						tdCodigo.innerHTML = data[i].codigo;
						tr.append(tdCodigo);

						var tdNombre = document.createElement("td");
						tdNombre.innerHTML = data[i].nombre;
						tr.append(tdNombre);

						var tdDocente = document.createElement("td");
						tdDocente.innerHTML = data[i].docente_a_cargo;
						tr.append(tdDocente);

						var tdSede = document.createElement("td");
						tdSede.innerHTML = data[i].sede;
						tr.append(tdSede);

						var tdAulas = document.createElement("td");
						tdAulas.innerHTML = data[i].aulas;
						tr.append(tdAulas);

						var tdCupos = document.createElement("td");
						tdCupos.innerHTML = data[i].cupos_disponibles;
						tr.append(tdCupos);

						var tdDias = document.createElement("td");
						tdDias.innerHTML = data[i].dias;
						tr.append(tdDias);

						var tdHorarios = document.createElement("td");
						tdHorarios.innerHTML = data[i].horarios;
						tr.append(tdHorarios);

						var tdAcciones = document.createElement("td");
						tr.append(tdAcciones);

						var divEditar = document.createElement("a");
						divEditar.className = "btn btn-primary btnAccion";
						var spanEditar = document.createElement("span");
						spanEditar.className = "glyphicon glyphicon-edit";
						spanEditar.setAttribute("aria-hidden", "true");
						tdAcciones.append(divEditar)
						divEditar.append(spanEditar);

						var divBorrar = document.createElement("a");
						divBorrar.className = "btn btn-danger btnAccion";
						divBorrar.setAttribute("onclick", "borrarCurso(" + data[i].id_curso + ")");
						var spanBorrar = document.createElement("span");
						spanBorrar.className = "glyphicon glyphicon-trash";
						spanBorrar.setAttribute("aria-hidden", "true");
						tdAcciones.append(divBorrar)
						divBorrar.append(spanBorrar);
					}

					$("#tablaCursos").append(table);
				} else{
					$("#tablaCursos").html("No existen cursos.");
				}

				if(termina){
					termina.cursosCargados = true;
					if(termina.cursosCargados){
						$.unblockUI();
					}
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
		        $.unblockUI();
		        swal({
				  type: 'error',
				  title: 'Oops...',
				  text: 'Ha ocurrido un error al intentar cargar cursos'
				});
		        console.log(xhr.responseText);
		        console.log(thrownError);
	      	}
		});
}

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

// maneja menu
function cambiarPantalla(numero){
	switch(numero){
		case 1:
			$("#importacionPantalla").show();
			$("#abmCursosPantalla").hide();

			$("#importacionMenu").addClass("active");
			$("#abmCursosMenu").removeClass("active");
			break;
		case 2:
			$("#importacionPantalla").hide();
			$("#abmCursosPantalla").show();

			$("#importacionMenu").removeClass("active");
			$("#abmCursosMenu").addClass("active");
			break;
	}
}

//comentar linea, solo para desarrollo
cambiarPantalla(2);

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
