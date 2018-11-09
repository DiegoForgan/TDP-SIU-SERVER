module.exports = function(pool){
	pool.query("\
			do $$\
				declare dia_hoy timestamp := now();\
			begin\
			\
				INSERT INTO alumnos VALUES('00001', 'Gonzalez', 'Juan','alumno1', '12345', 5, '10', dia_hoy,'juangonzalez@gmail.com');\
				INSERT INTO alumnos VALUES('00002', 'Fernandez', 'Federico','alumno2', '12345', 4, '10', dia_hoy,'federicofernandez@gmail.com');\
				INSERT INTO alumnos VALUES('00003', 'Messi', 'Lionel','alumno3', '12345', 1, '10', dia_hoy,'lionelmessi@gmail.com');\
				INSERT INTO alumnos VALUES('00004', 'Ronaldo', 'Cristiano','alumno4', '12345', 2, '10', dia_hoy,'cristianoronaldo@gmail.com');\
				INSERT INTO alumnos VALUES('00005', 'Redondo', 'Fernando','alumno5', '12345', 8, '10', dia_hoy,'fernandoredondo@gmail.com');\
				INSERT INTO alumnos VALUES('00006', 'Carlos', 'Roberto','alumno6', '12345', 6, '10', dia_hoy,'robertocarlos@gmail.com');\
				INSERT INTO alumnos VALUES('00007', 'Di Maria', 'Angel','alumno7', '12345', 7, '10', dia_hoy,'angeldimaria@gmail.com');\
				INSERT INTO alumnos VALUES('00008', 'Mascherano', 'Javier','alumno8', '12345', 8, '10', dia_hoy,'javiermascherano@gmail.com');\
				INSERT INTO alumnos VALUES('00009', 'Batistuta', 'Gabriel','alumno9', '12345', 9, '10', dia_hoy,'gabrielbatistuta@gmail.com');\
				INSERT INTO alumnos VALUES('00010', 'Riquelme', 'Juan Roman','alumno10', '12345', 10, '10', dia_hoy,'jrriquelme@gmail.com');\
				INSERT INTO alumnos VALUES('00011', 'Robben', 'Arjen','alumno11', '12345', 11, '10', dia_hoy,'arjenrobben@gmail.com');\
				INSERT INTO alumnos VALUES('00012', 'Ramos', 'Sergio','alumno12', '12345', 12, '10', dia_hoy,'segioramos@gmail.com');\
				INSERT INTO alumnos VALUES('96803', 'Luques', 'Agustin','agusluques', '12345', 1, '10;9', dia_hoy,'agustinluques@gmail.com');\
				INSERT INTO alumnos VALUES('92290', 'Martins Forgan', 'Diego','38888888', '12345', 10, '10', dia_hoy,'diegoforgan@gmail.com');\
				INSERT INTO alumnos VALUES('95812', 'Etcheverri', 'Franco','38324264', '12345', 1, '10;9', dia_hoy,'francoetcheverri@gmail.com');\
				INSERT INTO alumnos VALUES('38383', 'Baliña', 'Federico','38383838', '12345', 1, '10', dia_hoy,'federicobalina@gmail.com');\
            end;\
            $$;\
            ");

	pool.query("\
			INSERT INTO periodos VALUES(DEFAULT, '1C-2018', FALSE, '2018-03-1 23:59:59', '2018-03-2 23:59:59', '2018-03-3 23:59:59', '2018-03-4 23:59:59', '2018-03-5 23:59:59', '2018-03-6 23:59:59', '2018-03-7 23:59:59', '2018-03-22 23:59:59');\
			INSERT INTO periodos VALUES(DEFAULT, '2C-2018', TRUE, '2018-10-1 23:59:59', '2018-10-2 23:59:59', '2018-10-3 23:59:59', '2018-10-4 23:59:59', '2018-10-5 23:59:59', '2018-10-6 23:59:59', '2018-10-7 23:59:59', '2018-10-30 23:59:59');\
            ");

	pool.query("\
			INSERT INTO prioridad_periodo VALUES(1, 1, '2018-03-01 10:00:00');\
			INSERT INTO prioridad_periodo VALUES(1, 2, '2018-10-01 11:00:00');\
			INSERT INTO prioridad_periodo VALUES(2, 2, '2018-10-01 14:00:00');\
			INSERT INTO prioridad_periodo VALUES(3, 2, '2018-10-01 18:00:00');\
			INSERT INTO prioridad_periodo VALUES(4, 2, '2018-10-02 10:00:00');\
            INSERT INTO prioridad_periodo VALUES(5, 2, '2018-10-02 14:00:00');\
			INSERT INTO prioridad_periodo VALUES(6, 2, '2018-10-02 18:00:00');\
			INSERT INTO prioridad_periodo VALUES(7, 2, '2018-10-03 10:00:00');\
			INSERT INTO prioridad_periodo VALUES(8, 2, '2018-10-03 14:00:00');\
            INSERT INTO prioridad_periodo VALUES(9, 2, '2018-10-03 18:00:00');\
			INSERT INTO prioridad_periodo VALUES(10, 2, '2018-10-04 11:00:00');\
			INSERT INTO prioridad_periodo VALUES(11, 2, '2018-10-04 15:00:00');\
			INSERT INTO prioridad_periodo VALUES(12, 2, '2018-10-04 19:00:00');\
            ");

	pool.query("\
			INSERT INTO materias_carrera VALUES(10, 1);\
			INSERT INTO materias_carrera VALUES(10, 2);\
			INSERT INTO materias_carrera VALUES(10, 3);\
			INSERT INTO materias_carrera VALUES(9, 3);\
			INSERT INTO materias_carrera VALUES(10, 4);\
			INSERT INTO materias_carrera VALUES(10, 5);\
			INSERT INTO materias_carrera VALUES(10, 6);\
			INSERT INTO materias_carrera VALUES(10, 7);\
			INSERT INTO materias_carrera VALUES(10, 8);\
			INSERT INTO materias_carrera VALUES(10, 9);\
			INSERT INTO materias_carrera VALUES(10, 10);\
			INSERT INTO materias_carrera VALUES(10, 11);\
			\
            ");

	//Cargo datos de los docentes
	pool.query("\
			INSERT INTO docentes VALUES('0001', 'Fontela', 'Carlos','fontela', '12345','cfontela@fi.uba.ar');\
			INSERT INTO docentes VALUES('0002', 'Calonico', 'Cristian','calonico', '12345','ccalonico@fi.uba.ar');\
			INSERT INTO docentes VALUES('0003', 'Maulhardt', 'Martin','martinmaul', '12345','mmaulhardt@fi.uba.ar');\
			INSERT INTO docentes VALUES('0004', 'Acero', 'Fernando','acero', '12345','facero@fi.uba.ar');\
			INSERT INTO docentes VALUES('0005', 'Sirne', 'Ricardo','sirne', '12345','rsirne@fi.uba.ar');\
			INSERT INTO docentes VALUES('0006', 'Argerich', 'Luis','argerich', '12345','largerich@fi.uba.ar');\
			INSERT INTO docentes VALUES('0007', 'Grynberg', 'Sebastian','grynberg', '12345','sgrynberg@fi.uba.ar');\
			INSERT INTO docentes VALUES('0008', 'Villagra', 'Sergio','villagra', '12345','svillagra@fi.uba.ar');\
			INSERT INTO docentes VALUES('0009', 'Suarez', 'Pablo','suarez', '12345','psuarez@fi.uba.ar');\
			INSERT INTO docentes VALUES('0010', 'Mendez', 'Mariano','mendez', '12345','mmendez@fi.uba.ar');\
			INSERT INTO docentes VALUES('0011', 'Clua', 'Osvaldo','clua', '12345','oclua@fi.uba.ar');\
			INSERT INTO docentes VALUES('0012', 'Gonzalez', 'NN','gonzalez', '12345','ngonzalez@fi.uba.ar');\
			INSERT INTO docentes VALUES('0013', 'Pantaleo', 'Guillermo','pantaleo', '12345','gpantaleo@fi.uba.ar');\
			INSERT INTO docentes VALUES('0014', 'Paez', 'Nicolas','paez', '12345','npaez@fi.uba.ar');\
			INSERT INTO docentes VALUES('0015', 'Azcurra', 'Diego','azcurra', '12345','dazcurra@fi.uba.ar');\
			INSERT INTO docentes VALUES('0016', 'Chorny', 'Fernando','chorny', '12345','fchorny@fi.uba.ar');\
			INSERT INTO docentes VALUES('0017', 'Canga', 'Sandra','canga', '12345','scanga@fi.uba.ar');\
			INSERT INTO docentes VALUES('0018', 'Vargas', 'Gabriela','vargas', '12345','gvargas@fi.uba.ar');\
			INSERT INTO docentes VALUES('0019', 'Peralta', 'Nora','peralta', '12345','nperalta@fi.uba.ar');\
			INSERT INTO docentes VALUES('0020', 'Boggi', 'Silvina','boggi', '12345','sboggi@fi.uba.ar');\
			INSERT INTO docentes VALUES('cond', 'unused', 'unused','unused', 'unused','nomail');\
			\
			");
 
	pool.query("\
			INSERT INTO cursos VALUES(DEFAULT, 1, '0019','PC;PC','400;400',3,'martes;jueves','14:00-18:00;14:00-18:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 1, '0018','PC;PC','403;403',2,'lunes;miercoles','09:00-13:00;09:00-13:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 1, '0020','PC;PC','201;310',2,'lunes;miercoles','09:00-13:00;09:00-13:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 3, '0001','PC;PC','203;203',2,'lunes;lunes','17:00-23:00;17:00-23:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 4, '0001','PC;PC','303;303',30,'martes;martes','16:00-22:00;16:00-22:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 5, '0001','PC;PC','221;303',55,'lunes;jueves','16:00-19:00;16:00-19:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 5, '0009','PC;PC','105;107',20,'lunes;jueves','19:00-22:00;19:00-22:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 2, '0004','PC;PC','403;302',35,'martes;jueves','07:00-11:00;07:00-11:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 2, '0005','PC;PC','302;500',35,'martes;jueves','14:00-18:00;14:00-18:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 2, '0016','PC;PC','500;500',35,'lunes;miercoles','13:00-17:00;13:00-17:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 2, '0003','PC;PC','400;400',30,'martes;viernes','09:00-13:00;09:00-13:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 6, '0011','PC;PC','411;411',60,'martes;jueves','19:00-22:00;19:00-22:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 6, '0010','PC;PC','411;411',35,'viernes;viernes','19:00-23:00;19:00-23:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 10, 'cond','PC;PC','411;411',3,'viernes;viernes','19:00-23:00;19:00-23:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 7, '0008','PC;PC','LAB E;LAB E',40,'lunes;jueves','18:30-21:30;18:30-21:30', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 7, '0012','PC;PC','422;422',40,'lunes;miercoles','19:00-22:00;19:00-22:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 8, '0015','PC;PC','507;507',30,'miercoles;miercoles','16:00-22:00;16:00-22:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 9, '0015','PC;PC','E7;E7',60,'miercoles;miercoles','19:00-23:00;19:00-23:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 8, '0010','PC;PC','411;411',50,'martes;jueves','08:00-11:00;08:00-11:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 11, '0014','PC;PC','200;200',2,'martes;jueves','08:00-11:00;08:00-11:00', 2);\
			\
			");


	pool.query("\
			INSERT INTO aulas(aula) VALUES('LAB C');\
			INSERT INTO aulas(aula) VALUES('LAB F');\
			INSERT INTO aulas(aula) VALUES('201');\
			INSERT INTO aulas(aula) VALUES('400');\
			INSERT INTO aulas(aula) VALUES('403');\
			INSERT INTO aulas(aula) VALUES('310');\
			INSERT INTO aulas(aula) VALUES('203');\
			INSERT INTO aulas(aula) VALUES('303');\
			INSERT INTO aulas(aula) VALUES('221');\
			INSERT INTO aulas(aula) VALUES('105');\
			INSERT INTO aulas(aula) VALUES('107');\
			INSERT INTO aulas(aula) VALUES('403');\
			INSERT INTO aulas(aula) VALUES('302');\
			INSERT INTO aulas(aula) VALUES('500');\
			INSERT INTO aulas(aula) VALUES('411');\
			INSERT INTO aulas(aula) VALUES('LAB E');\
			INSERT INTO aulas(aula) VALUES('422');\
			INSERT INTO aulas(aula) VALUES('507');\
			INSERT INTO aulas(aula) VALUES('E7');\
			\
			");

	pool.query("\
			INSERT INTO materias(codigo, nombre, creditos) VALUES('61.08', 'Algebra II', 8);\
			INSERT INTO materias(codigo, nombre, creditos) VALUES('61.03', 'Analisis Matematico II', 8);\
			INSERT INTO materias(codigo, nombre, creditos) VALUES('75.47', 'Taller de Desarrollo de Proyectos II', 6);\
			INSERT INTO materias(codigo, nombre, creditos) VALUES('75.44', 'Adm. y Control de Proy. Informaticos I', 6);\
			INSERT INTO materias(codigo, nombre, creditos) VALUES('75.07', 'Algoritmos Y Programacion III', 6);\
			INSERT INTO materias(codigo, nombre, creditos) VALUES('75.08', 'Sistemas Operativos', 6);\
			INSERT INTO materias(codigo, nombre, creditos) VALUES('75.09', 'Analisis de la Informacion', 6);\
			INSERT INTO materias(codigo, nombre, creditos) VALUES('75.40', 'Algoritmos Y Programacion I', 6);\
			INSERT INTO materias(codigo, nombre, creditos) VALUES('75.42', 'Taller de Programacion I', 6);\
			INSERT INTO materias(codigo, nombre, creditos) VALUES('00.00', 'Materia Con Condicionales', 100);\
			INSERT INTO materias(codigo, nombre, creditos) VALUES('99.99', 'Materia Para Llenar', 100);\
			\
			");

	pool.query("\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(1, '12/12/2018', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(1, '19/12/2018', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(1, '15/02/2019', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(1, '22/02/2019', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(1, '28/02/2019', '09:00');\
			\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(2, '12/12/2018', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(2, '19/12/2018', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(2, '15/02/2019', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(2, '22/02/2019', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(2, '28/02/2019', '09:00');\
			\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(3, '12/12/2018', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(3, '19/12/2018', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(3, '15/02/2019', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(3, '22/02/2019', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(3, '28/02/2019', '09:00');\
			\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(6, '11/12/2018', '19:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(6, '18/12/2018', '19:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(6, '14/02/2019', '19:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(6, '21/02/2019', '19:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(6, '27/02/2019', '19:00');\
			\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(7, '11/12/2018', '19:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(7, '18/12/2018', '19:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(7, '14/02/2019', '19:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(7, '21/02/2019', '19:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(7, '27/02/2019', '19:00');\
			\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(12, '04/12/2018', '18:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(12, '11/12/2018', '18:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(12, '18/12/2018', '18:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(12, '14/02/2019', '18:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(12, '21/02/2019', '18:00');\
			\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(13, '14/12/2018', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(13, '21/12/2018', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(13, '10/02/2019', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(13, '17/02/2019', '09:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(13, '24/02/2019', '09:00');\
			\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(4, '23/10/2018', '19:00');\
			INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES(5, '23/10/2018', '19:00');\
			");

	pool.query("\
			INSERT INTO inscripcionesfinal(padron, id_final, es_regular) VALUES('95812', 3, true);\
			INSERT INTO inscripcionesfinal(padron, id_final, es_regular) VALUES('95812', 5, true);\
			INSERT INTO inscripcionesfinal(padron, id_final, es_regular) VALUES('95812', 16, true);\
			INSERT INTO inscripcionesfinal(padron, id_final, es_regular) VALUES('95812', 17, true);\
			INSERT INTO inscripcionesfinal(padron, id_final, es_regular) VALUES('95812', 31, true);\
			INSERT INTO inscripcionesfinal(padron, id_final, es_regular) VALUES('95812', 33, true);\
			INSERT INTO inscripcionesfinal(padron, id_final, es_regular) VALUES('95812', 36, true);\
			INSERT INTO inscripcionesfinal(padron, id_final, es_regular) VALUES('38383', 3, true);\
			INSERT INTO inscripcionesfinal(padron, id_final, es_regular) VALUES('38383', 16, true);\
			\
			");

	pool.query("\
			INSERT INTO historialacademico(padron, id_materia, nota, fecha, completo_encuesta, resultados_encuesta) VALUES('95812', 1, 10, '12/08/2017', false, null);\
			INSERT INTO historialacademico(padron, id_materia, nota, fecha, completo_encuesta, resultados_encuesta) VALUES('95812', 2, 9 , '14/08/2015', false, null);\
			INSERT INTO historialacademico(padron, id_materia, nota, fecha, completo_encuesta, resultados_encuesta) VALUES('95812', 3, 8 , '15/08/2014', false, null);\
			INSERT INTO historialacademico(padron, id_materia, nota, fecha, completo_encuesta, resultados_encuesta) VALUES('95812', 4, 7 , '16/08/2018', false, null);\
			INSERT INTO historialacademico(padron, id_materia, nota, fecha, completo_encuesta, resultados_encuesta) VALUES('95812', 5, 10, '17/08/2015', false, null);\
			INSERT INTO historialacademico(padron, id_materia, nota, fecha, completo_encuesta, resultados_encuesta) VALUES('95812', 6, 4 , '18/08/2014', false, null);\
			INSERT INTO historialacademico(padron, id_materia, nota, fecha, completo_encuesta, resultados_encuesta) VALUES('95812', 7, 10, '19/08/2013', false, null);\
			INSERT INTO historialacademico(padron, id_materia, nota, fecha, completo_encuesta, resultados_encuesta) VALUES('95812', 8, 9 , '20/08/2016', false, null);\
			INSERT INTO historialacademico(padron, id_materia, nota, fecha, completo_encuesta, resultados_encuesta) VALUES('95812', 9, 6 , '21/08/2017', false, null);\
			INSERT INTO historialacademico(padron, id_materia, nota, fecha, completo_encuesta, resultados_encuesta) VALUES('38383', 8, 4 , '21/08/2017', false, null);\
			INSERT INTO historialacademico(padron, id_materia, nota, fecha, completo_encuesta, resultados_encuesta) VALUES('96803', 8, 4 , '21/08/2015', false, null);\
			\
			");

	pool.query("\
			INSERT INTO carreras(nombre, creditos_totales) VALUES('Ingenieria Mecánica', 110);\
			INSERT INTO carreras(nombre, creditos_totales) VALUES('Ingenieria Civil', 120);\
			INSERT INTO carreras(nombre, creditos_totales) VALUES('Ingenieria Electricista', 130);\
			INSERT INTO carreras(nombre, creditos_totales) VALUES('Ingenieria Industrial', 140);\
			INSERT INTO carreras(nombre, creditos_totales) VALUES('Licenciatura en Análisis de Sistemas', 150);\
			INSERT INTO carreras(nombre, creditos_totales) VALUES('Ingenieria Química', 160);\
			INSERT INTO carreras(nombre, creditos_totales) VALUES('Ingenieria en Petróleo', 170);\
			INSERT INTO carreras(nombre, creditos_totales) VALUES('Ingenieria Naval', 180);\
			INSERT INTO carreras(nombre, creditos_totales) VALUES('Ingenieria Electrónica', 190);\
			INSERT INTO carreras(nombre, creditos_totales) VALUES('Ingenieria Informática', 248);\
			\
			");

}
