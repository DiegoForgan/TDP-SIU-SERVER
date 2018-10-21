// data inicial
var initialData = {
	listadoDocentes : [],
	listadoAulas : [],
	listadoMaterias : []
}

$(document).ready(()=>{
	var termina = {
		infoCargada: false,
		cursosCargados: false
	};

	$.blockUI({message: "Cargando.."})
	cargarCursos(termina);
	cargarInfo(termina);
});

function borrarCurso(curso){
	swal({
	  title: 'Estás seguro?',
	  text: "No vas a poder revertir esta acción!",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#d33',
	  cancelButtonColor: '#3085d6',
	  confirmButtonText: 'Si, borralo!',
	  cancelButtonText: 'Cancelar'
	}).then((result) => {
	  if (result.value) {
	  	$.ajax({
			url: '../admin/cursos/' + curso,
			type: 'DELETE',
			success: (data)=>{
				swal(
			      'Borrado!',
			      'El curso se ha eliminado correctamente.',
			      'success'
			    )
				cargarCursos();
			}
		});
	  }
	})	
}

function cargarInfo(termina){
	$.ajax({
			url: '../admin/info',
			type: 'GET',
			success: (data)=>{
				if (data){
					if(data[0]){
						initialData.listadoDocentes = data[0].rows;
						for (var i = 0; i < data[0].rows.length; i++) {
							var docente = data[0].rows[i];
							var option = new Option(docente.nombres, docente.legajo, false, false);
							$("#modalSelectDocentes").append(option);
						}
						$("#modalSelectDocentes").trigger('change');
					}
					if(data[1]){
						initialData.listadoAulas = data[1].rows;
					}
					if (data[2]){
						initialData.listadoMaterias = data[2].rows;
						for (var i = 0; i < data[2].rows.length; i++) {
							var materia = data[2].rows[i];
							var option = new Option(materia.codigo + " - " + materia.nombre, materia.id, false, false);
							$("#modalSelectMaterias").append(option);
						}
						$("#modalSelectMaterias").trigger('change');
					}
				}

				if(termina){
					termina.infoCargada = true;
					if(termina.cursosCargados && termina.infoCargada){
						$.unblockUI();
					}
				}
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
						tdCodigo.setAttribute("data-info", "codigo");
						tdCodigo.setAttribute("data-id", data[i].id_materia);
						tdCodigo.innerHTML = data[i].codigo;
						tr.append(tdCodigo);

						var tdNombre = document.createElement("td");
						tdNombre.setAttribute("data-info", "nombre");
						tdNombre.innerHTML = data[i].nombre;
						tr.append(tdNombre);

						var tdDocente = document.createElement("td");
						tdDocente.setAttribute("data-info", "docente");
						tdDocente.setAttribute("data-legajo", data[i].docente_a_cargo);
						tdDocente.innerHTML = data[i].nombre_docente;
						tr.append(tdDocente);

						var tdSede = document.createElement("td");
						tdSede.setAttribute("data-info", "sedes");
						tdSede.innerHTML = data[i].sede;
						tr.append(tdSede);

						var tdAulas = document.createElement("td");
						tdAulas.setAttribute("data-info", "aulas");
						tdAulas.innerHTML = data[i].aulas;
						tr.append(tdAulas);

						var tdCupos = document.createElement("td");
						tdCupos.setAttribute("data-info", "cupos");
						tdCupos.innerHTML = data[i].cupos_disponibles;
						tr.append(tdCupos);

						var tdDias = document.createElement("td");
						tdDias.setAttribute("data-info", "dias");
						tdDias.innerHTML = data[i].dias;
						tr.append(tdDias);

						var tdHorarios = document.createElement("td");
						tdHorarios.setAttribute("data-info", "horarios");
						tdHorarios.innerHTML = data[i].horarios;
						tr.append(tdHorarios);

						var tdAcciones = document.createElement("td");
						tr.append(tdAcciones);

						var divEditar = document.createElement("a");
						divEditar.className = "btn btn-primary btnAccion";
						divEditar.setAttribute("data-toggle", "modal");
						divEditar.setAttribute("data-target", "#modalCurso");
						divEditar.setAttribute("data-accion", "editar");
						divEditar.setAttribute("data-id", data[i].id_curso);
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
					if(termina.cursosCargados && termina.infoCargada){
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
		var cantidadCorrectaLineas = [], mailsCorrectosLineas = [];
		var cantidadCorrecta, mailsCorrectos, cantidadIngresados = 0;
		try {
			for (var i = 0; i <= lines.length; i++) {
				if (lines[i]){
					cantidadCorrecta = /^[^,]*,[^,]*,[^,]*,[^,]*,[^,]*,[^,]*,[^,]*,[^,]*$/.test(lines[i]); // chequea que haya 8 campos separados por coma
					if (cantidadCorrecta){
						var splittedLine = lines[i].split(',');
						var data = {
							padron: splittedLine[0].trim(),
							apellido: splittedLine[1].trim(),
							nombre: splittedLine[2].trim(),
							usuario: splittedLine[3].trim(),
							contrasena: splittedLine[4].trim(),
							prioridad: splittedLine[5].trim(),
							carrera: splittedLine[6].trim(),
							email: splittedLine[7].trim()
						}
						if (/^[^@]*@[^\.]*\..*$/.test(data.email)) {
							listaAlumnos.push(data);
							cantidadIngresados++;
						}else{
							mailsCorrectosLineas.push(i);
						}	
					} else{
						cantidadCorrectaLineas.push(i);
					}
				}
			}
		} catch(err){
			$.unblockUI();
	        swal({
			  type: 'error',
			  title: 'Oops...',
			  text: 'Ha ocurrido un error al intentar guardar alumnos, revisar archivo!'
			});
		}
		$.ajax({
			url: '../admin/alumnos',
			type: 'POST',
			data: {
				"listaAlumnos": listaAlumnos
			},
			success: (data)=>{
				var textoCantidad = cantidadCorrectaLineas.length != 0 ? cantidadCorrectaLineas.join(", ") : '-';
				var textoMails = mailsCorrectosLineas.length != 0 ? mailsCorrectosLineas.join(", ") : '-';
				$.unblockUI();
				swal({
				  type: 'success',
				  title: 'Guardado!',
				  html: '<h3> Se han guardado ' + cantidadIngresados + ' alumnos</h3><br>\
			  			<ul style="text-align: left">\
				  			<li>Las siguientes lineas no tienen la cantidad de campos correctos: <b>' + textoCantidad + '</b></li>\
							<li>Las siguientes lineas tienen mails incorrectos: <b>' + textoMails + '</b></li>\
						</ul>'
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
		var cantidadCorrectaLineas = [], mailsCorrectosLineas = [];
		var cantidadCorrecta, mailsCorrectos, cantidadIngresados = 0;
		for (var i = 0; i <= lines.length; i++) {
			if (lines[i]){
				cantidadCorrecta = /^[^,]*,[^,]*,[^,]*,[^,]*,[^,]*,[^,]*$/.test(lines[i]); // chequea que haya 6 campos separados por coma
				if (cantidadCorrecta){
					var splittedLine = lines[i].split(',');
					
					var data = {
						legajo: splittedLine[0].trim(),
						apellido: splittedLine[1].trim(),
						nombre: splittedLine[2].trim(),
						usuario: splittedLine[3].trim(),
						contrasena: splittedLine[4].trim(),
						email: splittedLine[5].trim()
					}
					if (/^[^@]*@[^\.]*\..*$/.test(data.email)) {
						listaDocentes.push(data);
						cantidadIngresados++;
					}else{
						mailsCorrectosLineas.push(i);
					}
					
				} else{
					cantidadCorrectaLineas.push(i);
				}
			}
		}
		$.ajax({
			url: '../admin/docentes',
			type: 'POST',
			data: {
				"listaDocentes": listaDocentes
			},
			success: (data)=>{
				var textoCantidad = cantidadCorrectaLineas.length != 0 ? cantidadCorrectaLineas.join(", ") : '-';
				var textoMails = mailsCorrectosLineas.length != 0 ? mailsCorrectosLineas.join(", ") : '-';
				$.unblockUI();
				swal({
				  type: 'success',
				  title: 'Guardado!',
				  html: '<h3> Se han guardado ' + cantidadIngresados + ' docentes</h3><br>\
			  			<ul style="text-align: left">\
				  			<li>Las siguientes lineas no tienen la cantidad de campos correctos: <b>' + textoCantidad + '</b></li>\
							<li>Las siguientes lineas tienen mails incorrectos: <b>' + textoMails + '</b></li>\
						</ul>'
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

//manejo modal
function cerrarModal(){
	swal({
	  title: 'Estás seguro?',
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#d33',
	  cancelButtonColor: '#3085d6',
	  confirmButtonText: 'Si',
	  cancelButtonText: 'Cancelar'
	}).then((result) => {
	  if (result.value) {
	  	$("#modalCurso").modal('hide');
	  }
	})	
}

function guardarCurso(){
	var docente = $("#modalSelectDocentes").val();
	var cupos = $("#modalInputCupos").val();
	var dias = $("#modalSelectDias").val();
	var strDias = "", strAulas = "", strSedes = "", strHorarios = "";
	for (var i = 0; i < dias.length; i++) {
		strAulas = strAulas + $("#modalSelectAulas" + dias[i]).val() + ";";
		strSedes = strSedes + $("#modalSelectSedes" + dias[i]).val() + ";";
		strHorarios = strHorarios + $("#modalInputHoraInicial" + dias[i]).val() + "-" + $("#modalInputHoraFinal" + dias[i]).val() + ";";
		strDias = strDias + dias[i] + ";";
	}

	strAulas = strAulas.slice(0, -1);
	strSedes = strSedes.slice(0, -1);
	strDias = strDias.slice(0, -1);
	strHorarios = strHorarios.slice(0, -1);

	var idCurso = $("#modalInputId").val();
	$.blockUI({message:"Guardando.."})
	$.ajax({
			url: '../admin/cursos/' + idCurso,
			type: 'PUT',
			data: {
				dias: strDias,
				aulas: strAulas,
				sedes: strSedes,
				cupos: cupos,
				horarios: strHorarios,
				materia: $("#modalSelectMaterias").val(),
				docente: $("#modalSelectDocentes").val() 
			},
			success: (data)=>{
				$.unblockUI();
				swal({
				  type: 'success',
				  title: 'Guardado!',
				  text: 'Se han guardado los cambios'
				});
				$("#modalCurso").modal('hide');
				cargarCursos();
			},
			error: function (xhr, ajaxOptions, thrownError) {
		        $.unblockUI();
		        swal({
				  type: 'error',
				  title: 'Oops...',
				  text: 'Ha ocurrido un error al intentar guardar curso'
				});
		        console.log(xhr.responseText);
		        console.log(thrownError);
	      	}
		});
}

function agregarCurso(){
	var docente = $("#modalSelectDocentes").val();
	var cupos = $("#modalInputCupos").val();
	var dias = $("#modalSelectDias").val();
	var strDias = "", strAulas = "", strSedes = "", strHorarios = "";
	for (var i = 0; i < dias.length; i++) {
		strAulas = strAulas + $("#modalSelectAulas" + dias[i]).val() + ";";
		strSedes = strSedes + $("#modalSelectSedes" + dias[i]).val() + ";";
		strHorarios = strHorarios + $("#modalInputHoraInicial" + dias[i]).val() + "-" + $("#modalInputHoraFinal" + dias[i]).val() + ";";
		strDias = strDias + dias[i] + ";";
	}

	strAulas = strAulas.slice(0, -1);
	strSedes = strSedes.slice(0, -1);
	strDias = strDias.slice(0, -1);
	strHorarios = strHorarios.slice(0, -1);

	var idCurso = $("#modalInputId").val();
	$.blockUI({message:"Guardando.."})
	$.ajax({
			url: '../admin/cursos/',
			type: 'POST',
			data: {
				dias: strDias,
				aulas: strAulas,
				sedes: strSedes,
				cupos: cupos,
				horarios: strHorarios,
				materia: $("#modalSelectMaterias").val(),
				docente: $("#modalSelectDocentes").val() 
			},
			success: (data)=>{
				$.unblockUI();
				swal({
				  type: 'success',
				  title: 'Guardado!',
				  text: 'Se han guardado los cambios'
				});
				$("#modalCurso").modal('hide');
				cargarCursos();
			},
			error: function (xhr, ajaxOptions, thrownError) {
		        $.unblockUI();
		        swal({
				  type: 'error',
				  title: 'Oops...',
				  text: 'Ha ocurrido un error al intentar guardar curso'
				});
		        console.log(xhr.responseText);
		        console.log(thrownError);
	      	}
		});
}

$('#modalCurso').on('show.bs.modal', function (event) {
	$("#rowDia").html('');
	$("#modalSelectMaterias").select2({ width: '100%' });
	$("#modalSelectDocentes").select2({ width: '100%' });
	$("#modalSelectDias").select2({ width: '100%' });
	var button = $(event.relatedTarget); // Button that triggered the modal
	var accion = button.data('accion'); // Extract info from data-* attributes
	var modal = $(this);

  	if (accion == "editar") {
  		modal.find('.modal-title').text('Editar Curso');

  		$("#btnModal").attr("onclick", "guardarCurso()");

  		//obtengo toda la info del curso seleccionado
  		var tr = $("tr[id='" + button.data('id') + "']");

  		$("#modalInputId").val(button.data('id'));

  		var materia = tr.find("td[data-info='codigo']").attr("data-id");
  		$("#modalSelectMaterias").val(materia).trigger("change");

  		var docente = tr.find("td[data-info='docente']").attr("data-legajo");
  		$("#modalSelectDocentes").val(docente).trigger("change");

  		var cupos = tr.find("td[data-info='cupos']")[0].innerHTML;
  		$("#modalInputCupos").val(cupos).trigger("change");

  		var dias = tr.find("td[data-info='dias']")[0].innerHTML.trim().split(";");
  		$("#modalSelectDias").val(dias).trigger("change");

  		var sedes = tr.find("td[data-info='sedes']")[0].innerHTML.trim().split(";");
  		for (var i = 0; i < dias.length; i++) {
  			$("#modalSelectSedes" + dias[i]).val(sedes[i]).trigger("change");
  		}

  		var aulas = tr.find("td[data-info='aulas']")[0].innerHTML.trim().split(";");
  		for (var i = 0; i < dias.length; i++) {
  			$("#modalSelectAulas" + dias[i]).val(aulas[i]).trigger("change");
  		}

  		var horas = tr.find("td[data-info='horarios']")[0].innerHTML.trim().split(";");
  		for (var i = 0; i < dias.length; i++) {
  			var horaInicial, horaFinal;
  			[horaInicial, horaFinal] = horas[i].trim().split("-");
  			$("#modalInputHoraInicial" + dias[i]).val(horaInicial).trigger("change");
  			$("#modalInputHoraFinal" + dias[i]).val(horaFinal).trigger("change");
  		}

  	} else{
  		modal.find('.modal-title').text('Agregar Curso');

  		$("#btnModal").attr("onclick", "agregarCurso()");

  		$("#modalSelectMaterias").val('').trigger("change");

  		$("#modalSelectDocentes").val('').trigger("change");

  		$("#modalInputCupos").val(0).trigger("change");

  		$("#modalSelectDias").val('').trigger("change");
  	}
})

$("#modalSelectDias").on('select2:unselect', (event) => {
	$("#rowDia" + event.params.data.id).remove();
});

$("#modalSelectDias").on('change', (event) => {
	//$("#rowDia").html('');
	var dias = $("#modalSelectDias").select2('data');
	for (var i = 0; i < dias.length; i++) {
		if(!$("#rowDia" + dias[i].id).length){
			$("#rowDia").append("\
				<div class='row well' id='rowDia" + dias[i].id + "'>\
					<div class='col-lg-1'></div>\
					<div class='col-lg-10'>\
						<h4 align='center'>Dia " + dias[i].text + "</h4>\
						<div class='row'>\
							<div class='col-lg-12'>\
							    <label>Sede:</label>\
							    <select id='modalSelectSedes" + dias[i].id + "'>\
							    	<option value='LH'>Las Heras</option>\
							    	<option value='PC'>Paseo Colón</option>\
							    	<option value='CU'>Ciudad Universitaria</option>\
							    </select>\
							</div>\
						</div>\
						\
						<div class='row'>\
							<div class='col-lg-6'>\
							    <label>Hora Inicial:</label>\
							    <input type='time' id='modalInputHoraInicial" + dias[i].id + "' style='width: 100%'>\
							</div>\
							<div class='col-lg-6'>\
							    <label>Hora Final:</label>\
							    <input type='time' id='modalInputHoraFinal" + dias[i].id + "' style='width: 100%'>\
							</div>\
						</div>\
						<div class='row'>\
							<div class='col-lg-12'>\
							    <label>Aulas:</label>\
							    <select id='modalSelectAulas" + dias[i].id + "'>\
							    	\
							    </select>\
							</div>\
						</div>\
					</div>\
				</div>");
			$("#modalSelectSedes" + dias[i].id).select2({ width: '100%' });
			$("#modalSelectAulas" + dias[i].id).select2({ width: '100%' });
			for (var j = 0; j < initialData.listadoAulas.length; j++) {
				var aula = initialData.listadoAulas[j];
				var option = new Option(aula.aula, aula.aula, false, false);
				$("#modalSelectAulas" + dias[i].id).append(option);
			}
			$("#modalSelectAulas" + dias[i].id).trigger('change');
		}
	}
});

// maneja menu
function cambiarPantalla(numero){
	switch(numero){
		case 1:
			$("#importacionPantalla").show();
			$("#abmCursosPantalla").hide();
			$("#periodosPantalla").hide();

			$("#importacionMenu").addClass("active");
			$("#abmCursosMenu").removeClass("active");
			$("#periodosPantalla").removeClass("active");
			break;
		case 2:
			$("#importacionPantalla").hide();
			$("#abmCursosPantalla").show();
			$("#periodosPantalla").hide();

			$("#importacionMenu").removeClass("active");
			$("#abmCursosMenu").addClass("active");
			$("#periodosPantalla").removeClass("active");
			break;
		case 3:
			$.blockUI();
			$.ajax({
				url: '../admin/periodoActual/',
				type: 'GET',
				success: (data)=>{
					$.unblockUI();
					var info = data[0].descripcion.split('-');
					if (data[0].activo) {
						$('#cuatrimestrePeriodoActual').val(info[0]).trigger('change');
						$('#inputAnioPeriodoActual').val(info[1]);
						$("#inputPeriodoActual").val(data[0].descripcion);
					}
					$('#ultimoPeriodo').val(data[0].descripcion);
					$('#inputAnioPeriodoActual').datepicker({
						format: "yyyy",
					    viewMode: "years", 
					    minViewMode: "years"
					});

					
				},
				error: function (xhr, ajaxOptions, thrownError) {
			        $.unblockUI();
			        swal({
					  type: 'error',
					  title: 'Oops...',
					  text: 'Ha ocurrido un error al intentar traer info de periodo'
					});
			        console.log(xhr.responseText);
			        console.log(thrownError);
			  	}
			});

			$("#importacionPantalla").hide();
			$("#abmCursosPantalla").hide();
			$("#periodosPantalla").show();

			$("#importacionMenu").removeClass("active");
			$("#abmCursosMenu").removeClass("active");
			$("#periodosPantalla").addClass("active");
			break;

	}
}

//eliminar luego de sprint1
$.ajax({
	url: '../admin/periodoBETA/',
	type: 'GET',
	success: (data)=>{
		$.unblockUI();
		if(data[0].activo){
			$('#modificarPeriodo').bootstrapToggle('on');
		}else{
			$('#modificarPeriodo').bootstrapToggle('off');
		}
		$('#modificarPeriodo').change(function() {
		    //console.log($(this).prop('checked'));
		    $.ajax({
				url: '../admin/periodoBETA/',
				type: 'PUT',
				data: {
					activar: $(this).prop('checked')
				},
				success: (data)=>{
					$.unblockUI();
					swal({
					  type: 'success',
					  title: 'Ok',
					  text: 'Se ha modificado el periodo'
					});

					
				},
				error: function (xhr, ajaxOptions, thrownError) {
			        $.unblockUI();
			        swal({
					  type: 'error',
					  title: 'Oops...',
					  text: 'Ha ocurrido un error al intentar modificar info de periodo'
					});
			        console.log(xhr.responseText);
			        console.log(thrownError);
			  	}
			});
		});

		
	},
	error: function (xhr, ajaxOptions, thrownError) {
        $.unblockUI();
        swal({
		  type: 'error',
		  title: 'Oops...',
		  text: 'Ha ocurrido un error al intentar traer info de periodo'
		});
        console.log(xhr.responseText);
        console.log(thrownError);
  	}
});

//comentar linea, solo para desarrollo
cambiarPantalla(3);

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

$('select').on('select2:select', function(e){
    var elm = e.params.data.element;
    $elm = jQuery(elm);
    $t = jQuery(this);
    $t.append($elm);
    $t.trigger('change.select2');
});

// date.picker
$('#inputFechaInscripcionCursadasInicio,\
	#inputFechaInscripcionCursadasFin,\
	#inputFechaDesinscripcionCursadasInicio,\
	#inputFechaDesinscripcionCursadasFin,\
	#inputFechaCursadasInicio,\
	#inputFechaCursadasFin,\
	#inputFechaFinalesInicio,\
	#inputFechaFinalesFin').datepicker({
		format: "yyyy-mm-dd",
		autoclose: true
});

$('#cuatrimestrePeriodoActual').select2({
	width:'100%',
	minimumResultsForSearch: -1,
	placeholder: "Cuatrimestre"
});

$('#cuatrimestrePeriodoActual,\
	#inputAnioPeriodoActual').on('change', ()=>{
		var strAux =  $('#cuatrimestrePeriodoActual').val() + '-' + $('#inputAnioPeriodoActual').val();
		$('#inputPeriodoActual').val(strAux);
	});

// maneja los periodos
function okPeriodo(numero){
	switch(numero){
		case 1:
			if ($("#inputFechaInscripcionCursadasInicio").val() 
				&& $("#inputFechaInscripcionCursadasFin").val() 
				&& $("#inputFechaInscripcionCursadasInicio").val() < $("#inputFechaInscripcionCursadasFin").val()){
				$("#divInscripcionCursadas").addClass("divInhabilitado");
				$("#divDesinscripcionCursadas").removeClass("divInhabilitado");
			} else{
				swal({
				  type: 'error',
				  title: 'Oops...',
				  html: '<h3>Verificar que las fechas sean correctas</h3><p>Las fecha de fin debe ser mayor a la de inicio</p>'
				});
			}
			break;
		case 2:
			if ($("#inputFechaDesinscripcionCursadasInicio").val() 
				&& $("#inputFechaDesinscripcionCursadasFin").val() 
				&& $("#inputFechaDesinscripcionCursadasInicio").val() < $("#inputFechaDesinscripcionCursadasFin").val()
				&& $("#inputFechaDesinscripcionCursadasInicio").val() > $("#inputFechaInscripcionCursadasFin").val()){
				$("#divDesinscripcionCursadas").addClass("divInhabilitado");
				$("#divCursadas").removeClass("divInhabilitado");
			} else{
				swal({
				  type: 'error',
				  title: 'Oops...',
				  html: '<h3>Verificar que las fechas sean correctas</h3><p>Las fecha de fin debe ser mayor a la de inicio<br>La fecha de inicio debe ser mayor a la de fin de la etapa anterior</p>'
				});
			}
			break;
		case 3:
			if ($("#inputFechaCursadasInicio").val() 
				&& $("#inputFechaCursadasFin").val() 
				&& $("#inputFechaCursadasInicio").val() < $("#inputFechaCursadasFin").val()
				&& $("#inputFechaCursadasInicio").val() > $("#inputFechaDesinscripcionCursadasFin").val()){
				$("#divCursadas").addClass("divInhabilitado");
				$("#divFinales").removeClass("divInhabilitado");
			} else{
				swal({
				  type: 'error',
				  title: 'Oops...',
				  html: '<h3>Verificar que las fechas sean correctas</h3><p>Las fecha de fin debe ser mayor a la de inicio<br>La fecha de inicio debe ser mayor a la de fin de la etapa anterior</p>'
				});
			}
			break;
		case 4:
			var ultPeriodo = $('#ultimoPeriodo').val().split('-');
			if ($('#cuatrimestrePeriodoActual').val() 
				&& $('#inputAnioPeriodoActual').val()
				&& ($('#inputAnioPeriodoActual').val() > ultPeriodo[1]
					|| $('#inputAnioPeriodoActual').val() == ultPeriodo[1] && $('#cuatrimestrePeriodoActual').val()[0] >= ultPeriodo[0][0])) {
				if ($("#inputFechaFinalesInicio").val() 
					&& $("#inputFechaFinalesFin").val() 
					&& $("#inputFechaFinalesInicio").val() < $("#inputFechaFinalesFin").val()
					&& $("#inputFechaFinalesInicio").val() > $("#inputFechaCursadasFin").val()){
					$.blockUI({message:"Guardando.."})
					$.ajax({
							url: '../admin/periodos/',
							type: 'POST',
							data: {
								periodo: $('#inputPeriodoActual').val() ,
								fechaInicioInscripcionCursadas: $("#inputFechaInscripcionCursadasInicio").val() ,
								fechaFinInscripcionCursadas: $("#inputFechaInscripcionCursadasFin").val() ,
								fechaInicioDesinscripcionCursadas: $("#inputFechaDesinscripcionCursadasInicio").val() ,
								fechaFinDesinscripcionCursadas: $("#inputFechaDesinscripcionCursadasFin").val() ,
								fechaInicioCursadas: $("#inputFechaCursadasInicio").val() ,
								fechaFinCursadas: $("#inputFechaCursadasFin").val() ,
								fechaInicioFinales: $("#inputFechaFinalesInicio").val() ,
								fechaFinFinales: $("#inputFechaFinalesFin").val() 
							},
							success: (data)=>{
								$.unblockUI();
								swal({
								  type: 'success',
								  title: 'Guardado!',
								  text: 'Se han guardado los periodos'
								});
								$("#inputFechaInscripcionCursadasInicio").val('')
								$("#inputFechaInscripcionCursadasFin").val('')
								$("#inputFechaDesinscripcionCursadasInicio").val('')
								$("#inputFechaDesinscripcionCursadasFin").val('')
								$("#inputFechaCursadasInicio").val('')
								$("#inputFechaCursadasFin").val('')
								$("#inputFechaFinalesInicio").val('')
								$("#inputFechaFinalesFin").val('') 
								$("#divFinales").addClass("divInhabilitado");
								$("#divInscripcionCursadas").removeClass("divInhabilitado");
							},
							error: function (xhr, ajaxOptions, thrownError) {
						        $.unblockUI();
						        swal({
								  type: 'error',
								  title: 'Oops...',
								  text: 'Ha ocurrido un error al intentar guardar periodos'
								});
						        console.log(xhr.responseText);
						        console.log(thrownError);
						        $("#divFinales").addClass("divInhabilitado");
								$("#divInscripcionCursadas").removeClass("divInhabilitado");
					      	}
						});
				} else{
					swal({
					  type: 'error',
					  title: 'Oops...',
					  html: '<h3>Verificar que las fechas sean correctas</h3><p>Las fecha de fin debe ser mayor a la de inicio<br>La fecha de inicio debe ser mayor a la de fin de la etapa anterior</p>'
					});
				}
			}else{
				swal({
					  type: 'error',
					  title: 'Oops...',
					  html: '<h3>Verificar que el periodo sea correcto</h3>'
					});
			}
			break;
	}
}






