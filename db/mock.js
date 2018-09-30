module.exports = function(pool){
	pool.query("\
			do $$\
				declare dia_hoy timestamp := now();\
			begin\
			\
				INSERT INTO alumnos VALUES('00001', 'Gonzalez', 'Juan','alumno1', '12345', 1, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('00002', 'Fernandez', 'Federico','alumno2', '12345', 2, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('00003', 'Messi', 'Lionel','alumno3', '12345', 3, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('00004', 'Ronaldo', 'Cristiano','alumno4', '12345', 4, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('00005', 'Redondo', 'Fernando','alumno5', '12345', 5, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('00006', 'Carlos', 'Roberto','alumno6', '12345', 6, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('00007', 'Di Maria', 'Angel','alumno7', '12345', 7, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('00008', 'Mascherano', 'Javier','alumno8', '12345', 8, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('00009', 'Batistuta', 'Gabriel','alumno9', '12345', 9, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('00010', 'Riquelme', 'Juan Roman','alumno10', '12345', 10, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('00011', 'Robben', 'Arjen','alumno11', '12345', 11, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('00012', 'Ramos', 'Sergio','alumno12', '12345', 12, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('96803', 'luques', 'agustin','agusluques', 'contrasecreta', 6, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('92290', 'Martins Forgan', 'Diego','diego', '12345', 4, 10, dia_hoy);\
				INSERT INTO alumnos VALUES('95812', 'Etcheverri', 'Franco','franco', '12345', 5, 10, dia_hoy);\
            end;\
            $$;\
            ");

	pool.query("\
			INSERT INTO periodos VALUES(DEFAULT, '1C-2018', FALSE, '2018-03-22 23:59:59');\
			INSERT INTO periodos VALUES(DEFAULT, '2C-2018', TRUE, '2018-08-15 23:59:59');\
            ");

	pool.query("\
			INSERT INTO prioridad_periodo VALUES(1, 1, '2018-03-01 10:00:00');\
			INSERT INTO prioridad_periodo VALUES(1, 2, '2018-08-01 10:00:00');\
			INSERT INTO prioridad_periodo VALUES(2, 2, '2018-08-01 14:00:00');\
			INSERT INTO prioridad_periodo VALUES(3, 2, '2018-08-01 18:00:00');\
			INSERT INTO prioridad_periodo VALUES(4, 2, '2018-08-02 10:00:00');\
            INSERT INTO prioridad_periodo VALUES(5, 2, '2018-08-02 14:00:00');\
			INSERT INTO prioridad_periodo VALUES(6, 2, '2018-08-02 18:00:00');\
			INSERT INTO prioridad_periodo VALUES(7, 2, '2018-08-03 10:00:00');\
			INSERT INTO prioridad_periodo VALUES(8, 2, '2018-08-03 14:00:00');\
            INSERT INTO prioridad_periodo VALUES(9, 2, '2018-08-03 18:00:00');\
			INSERT INTO prioridad_periodo VALUES(10, 2, '2018-08-04 11:00:00');\
			INSERT INTO prioridad_periodo VALUES(11, 2, '2018-08-04 15:00:00');\
			INSERT INTO prioridad_periodo VALUES(12, 2, '2018-08-04 19:00:00');\
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
			\
            ");

	//Cargo datos de los docentes
	pool.query("\
			INSERT INTO docentes VALUES('0001', 'Fontela', 'Carlos','fontela', '12345');\
			INSERT INTO docentes VALUES('0002', 'Calonico', 'Cristian','calonico', '12345');\
			INSERT INTO docentes VALUES('0003', 'Maulhardt', 'Martin','martinmaul', '12345');\
			INSERT INTO docentes VALUES('0004', 'Acero', 'Fernando','acero', '12345');\
			INSERT INTO docentes VALUES('0005', 'Sirne', 'Ricardo','sirne', '12345');\
			INSERT INTO docentes VALUES('0006', 'Argerich', 'Luis','argerich', '12345');\
			INSERT INTO docentes VALUES('0007', 'Grynberg', 'Sebastian','grynberg', '12345');\
			INSERT INTO docentes VALUES('0008', 'Villagra', 'Sergio','villagra', '12345');\
			INSERT INTO docentes VALUES('0009', 'Suarez', 'Pablo','suarez', '12345');\
			INSERT INTO docentes VALUES('0010', 'Mendez', 'Mariano','mendez', '12345');\
			INSERT INTO docentes VALUES('0011', 'Clua', 'Osvaldo','clua', '12345');\
			INSERT INTO docentes VALUES('0012', 'Gonzalez', 'NN','gonzalez', '12345');\
			INSERT INTO docentes VALUES('0013', 'Pantaleo', 'Guillermo','pantaleo', '12345');\
			INSERT INTO docentes VALUES('0014', 'Paez', 'Nicolas','paez', '12345');\
			INSERT INTO docentes VALUES('0015', 'Azcurra', 'Diego','azcurra', '12345');\
			INSERT INTO docentes VALUES('0016', 'Chorny', 'Fernando','chorny', '12345');\
			INSERT INTO docentes VALUES('0017', 'Canga', 'Sandra','canga', '12345');\
			INSERT INTO docentes VALUES('0018', 'Vargas', 'Gabriela','vargas', '12345');\
			INSERT INTO docentes VALUES('0019', 'Peralta', 'Nora','peralta', '12345');\
			INSERT INTO docentes VALUES('0020', 'Boggi', 'Silvina','boggi', '12345');\
			INSERT INTO docentes VALUES('cond', 'unused', 'unused','unused', 'unused');\
			\
			");
 
	pool.query("\
			INSERT INTO cursos VALUES(DEFAULT, 1, '0019','PC;PC','400;400',30,0,0,'martes;jueves','14:00-18:00;14:00-18:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 1, '0018','PC;PC','403;403',30,0,0,'lunes;miercoles','09:00-13:00;09:00-13:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 1, '0020','PC;PC','201;310',30,0,0,'lunes;miercoles','09:00-13:00;09:00-13:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 3, '0001','PC;PC','203;203',60,0,0,'lunes;lunes','17:00-23:00;17:00-23:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 4, '0001','PC;PC','303;303',30,0,0,'martes;martes','16:00-22:00;16:00-22:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 5, '0001','PC;PC','221;303',55,0,0,'lunes;jueves','16:00-19:00;16:00-19:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 5, '0009','PC;PC','105;107',20,0,0,'lunes;jueves','19:00-22:00;19:00-22:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 2, '0004','PC;PC','403;302',35,0,0,'martes;jueves','07:00-11:00;07:00-11:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 2, '0005','PC;PC','302;500',35,0,0,'martes;jueves','14:00-18:00;14:00-18:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 2, '0016','PC;PC','500;500',35,0,0,'lunes;miercoles','13:00-17:00;13:00-17:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 2, '0003','PC;PC','400;400',30,0,0,'martes;viernes','09:00-13:00;09:00-13:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 6, '0011','PC;PC','411;411',60,0,0,'martes;jueves','19:00-22:00;19:00-22:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 6, '0010','PC;PC','411;411',35,0,0,'viernes;viernes','19:00-23:00;19:00-23:00', 2);\
			INSERT INTO cursos VALUES(DEFAULT, 10, 'cond','PC;PC','411;411',3,0,0,'viernes;viernes','19:00-23:00;19:00-23:00', 2);\
			\
			");


	pool.query("\
			INSERT INTO aulas(aula) VALUES('LAB C');\
			INSERT INTO aulas(aula) VALUES('LAB F');\
			INSERT INTO aulas(aula) VALUES('201');\
			INSERT INTO aulas(aula) VALUES('400');\
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
			\
			");
}
