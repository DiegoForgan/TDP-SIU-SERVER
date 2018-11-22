module.exports = function(pool){
	pool.query("\
			do $$\
				declare dia_hoy timestamp := now();\
			begin\
			\
				INSERT INTO alumnos VALUES('00001', 'Gonzalez', 'Juan','alumno1', '9688dba895b12cbf30de03aa0493bd9dcb4a8871cb50164f493a4f7e03ea1e82', 5, '10', dia_hoy,'juangonzalez@gmail.com');\
				INSERT INTO alumnos VALUES('00002', 'Fernandez', 'Federico','alumno2', '9472d4f1dd94611b6f774d199017691e447b258555aac0151c7b4072329f210a', 4, '10', dia_hoy,'federicofernandez@gmail.com');\
				INSERT INTO alumnos VALUES('00003', 'Messi', 'Lionel','alumno3', 'bdb846cacb3da620dfa0e28a76b45b653c7d9929915dff3aded5da7b6eb67789', 1, '10', dia_hoy,'lionelmessi@gmail.com');\
				INSERT INTO alumnos VALUES('00004', 'Ronaldo', 'Cristiano','alumno4', '5d6dc36e8ed6dd745f6d378ea4709cefcab97a504f2953c1a64286da4a7709f5', 2, '10', dia_hoy,'cristianoronaldo@gmail.com');\
				INSERT INTO alumnos VALUES('00005', 'Redondo', 'Fernando','alumno5', 'c5725a6c49fcec9775a5394f187dcaa94e00a2a8b1cb8998ee9ca1586a31d3ce', 8, '10', dia_hoy,'fernandoredondo@gmail.com');\
				INSERT INTO alumnos VALUES('00006', 'Carlos', 'Roberto','alumno6', 'de34feff854dfc820d8a37b3f2afbfd5759a4d97a95b402d609284fbd8d38de9', 6, '10', dia_hoy,'robertocarlos@gmail.com');\
				INSERT INTO alumnos VALUES('00007', 'Di Maria', 'Angel','alumno7', 'e4fe1a64b0f50c2a9b0735f9a0d76436b32bbc06e057b96ac366237333d49f2a', 7, '10', dia_hoy,'angeldimaria@gmail.com');\
				INSERT INTO alumnos VALUES('00008', 'Mascherano', 'Javier','alumno8', '87fc456cd7afcc2ad945aafaea7c4cacf47e01bbc7dbeb6356381832d87afacc', 8, '10', dia_hoy,'javiermascherano@gmail.com');\
				INSERT INTO alumnos VALUES('00009', 'Batistuta', 'Gabriel','alumno9', 'c9f2f49fbd815e776746cb8c211df0cbcec95ff7e86268a9fbcf1fadb1cdffd5', 9, '10', dia_hoy,'gabrielbatistuta@gmail.com');\
				INSERT INTO alumnos VALUES('00010', 'Riquelme', 'Juan Roman','alumno10', '31a02e46dcea910737c54f1cdb18ac227e1e1f52464e6632a6fd6a3fcab1f5a9', 10, '10', dia_hoy,'jrriquelme@gmail.com');\
				INSERT INTO alumnos VALUES('00011', 'Robben', 'Arjen','alumno11', 'b82dc27232e670268af0fa7741e4cf6df9162b4b6ff6551a377a4f40271b0507', 11, '10', dia_hoy,'arjenrobben@gmail.com');\
				INSERT INTO alumnos VALUES('00012', 'Ramos', 'Sergio','alumno12', 'd76bc455b73e9c55a4478b73bc6ee3fd6a54b568c19cf274c0f1583182a3e052', 12, '10', dia_hoy,'segioramos@gmail.com');\
				INSERT INTO alumnos VALUES('96803', 'Luques', 'Agustin','agusluques', 'c9d5fdd29ad0ca3e6ff3b67eff27b09569a94067933c56db95b5cf8c76d7a13f', 1, '10;9', dia_hoy,'agustinluques@gmail.com');\
				INSERT INTO alumnos VALUES('92290', 'Martins Forgan', 'Diego','38888888', '89ebfd80df58d21f5d416aa6920e5964c77b23ffb062bacb3344cfdd0205fc5e', 10, '10', dia_hoy,'diegoforgan@gmail.com');\
				INSERT INTO alumnos VALUES('95812', 'Etcheverri', 'Franco','38324264', 'f7ee9b2c5912debac3568a6cd6a6a012b3d3ffb1d64b1109733c5fd4fc750560', 1, '10;9', dia_hoy,'francoetcheverri@gmail.com');\
				INSERT INTO alumnos VALUES('38383', 'Baliña', 'Federico','38383838', '1f71e8febfc47d58af5caf53fbbf5274fc8f7c690c669fad42d382e3ff3f59e7', 1, '10', dia_hoy,'federicobalina@gmail.com');\
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
			INSERT INTO docentes VALUES('0001', 'Fontela', 'Carlos','fontela', 'ad3d3ee8d93a8497c71f7455671b24b89b656f31cd9d4526e0567fc2829368d8','cfontela@fi.uba.ar');\
			INSERT INTO docentes VALUES('0002', 'Calonico', 'Cristian','calonico', 'bc24b94f86d83ee867c0657dfec3fd1cbca15d193a1b86127bba3b9ea63d6e21','ccalonico@fi.uba.ar');\
			INSERT INTO docentes VALUES('0003', 'Maulhardt', 'Martin','martinmaul', 'b8bcdd296319d9ddf0c852f29a1076261c7ea201e9cc4ffad540a6750f434e2d','mmaulhardt@fi.uba.ar');\
			INSERT INTO docentes VALUES('0004', 'Acero', 'Fernando','acero', 'a3419a9660c67d66b970371878587d461abbc2b4e3d9a1d79c837ff5a1c05aeb','facero@fi.uba.ar');\
			INSERT INTO docentes VALUES('0005', 'Sirne', 'Ricardo','sirne', '65f38934cf2c13fb26e1114942170abc378a0a774f04d19f8a1744bab472298d','rsirne@fi.uba.ar');\
			INSERT INTO docentes VALUES('0006', 'Argerich', 'Luis','argerich', 'b9701c23388704fc45e0660dcf3ae2a0f8de20cdd96b6311fbbe439d42b5d8f0','largerich@fi.uba.ar');\
			INSERT INTO docentes VALUES('0007', 'Grynberg', 'Sebastian','grynberg', 'bb7fa66595b695012c45eab0a77db0a6086d0f8ab35fe8a042343aee1a248abc','sgrynberg@fi.uba.ar');\
			INSERT INTO docentes VALUES('0008', 'Villagra', 'Sergio','villagra', '3c2fb7c9a8049463f8cf6a772781632e8d1ef34eaa02986bba7783d6ad534da8','svillagra@fi.uba.ar');\
			INSERT INTO docentes VALUES('0009', 'Suarez', 'Pablo','suarez', '800a679cb6504ae454417ec506487ac91309f2bab16a7c347a36e7740092393e','psuarez@fi.uba.ar');\
			INSERT INTO docentes VALUES('0010', 'Mendez', 'Mariano','mendez', '5b5748485bbbc0b3c9dad950738440b443f1eee9a5ae507cfee7dc71ec378435','mmendez@fi.uba.ar');\
			INSERT INTO docentes VALUES('0011', 'Clua', 'Osvaldo','clua', '78a81ccbec3179e217a8916197e7bdf695898fc8a9c54cbb176b90ebedc4b13d','oclua@fi.uba.ar');\
			INSERT INTO docentes VALUES('0012', 'Gonzalez', 'NN','gonzalez', 'aa01831732079150319f9643490ea0186887aaf387acbc7c838f019359f14632','ngonzalez@fi.uba.ar');\
			INSERT INTO docentes VALUES('0013', 'Pantaleo', 'Guillermo','pantaleo', 'a3c1d3c96f5ac7a24c48d87b8b1c8fd5338b71364674874a78af1efd831d3ea5','gpantaleo@fi.uba.ar');\
			INSERT INTO docentes VALUES('0014', 'Paez', 'Nicolas','paez', 'df2ca06fc50a2c22883c908d6a31a928165831580f7ffe33a2fcab63d9e3c0ec','npaez@fi.uba.ar');\
			INSERT INTO docentes VALUES('0015', 'Azcurra', 'Diego','azcurra', '4b69fea604c00fc484f4b6cae643cef2676cfe4aa4aec0882ab0d1b456bc942e','dazcurra@fi.uba.ar');\
			INSERT INTO docentes VALUES('0016', 'Chorny', 'Fernando','chorny', '3624547fac6c65ee4172b1f18eeba9333496b57f15a1ceae0d621bf315e8a882','fchorny@fi.uba.ar');\
			INSERT INTO docentes VALUES('0017', 'Canga', 'Sandra','canga', '462a909d7015083df88962f0bddc56d31b7170f31f77bf9d0d291180dda7c49d','scanga@fi.uba.ar');\
			INSERT INTO docentes VALUES('0018', 'Vargas', 'Gabriela','vargas', 'b6a48a674d65b4af8b8bb5da4a334fa330d9344bcc4ffed850802105d3d8a421','gvargas@fi.uba.ar');\
			INSERT INTO docentes VALUES('0019', 'Peralta', 'Nora','peralta', '52310b7e93b291166e1b08bfe0bfc5584bc3a397831979bd788fcfcba9236334','nperalta@fi.uba.ar');\
			INSERT INTO docentes VALUES('0020', 'Boggi', 'Silvina','boggi', '79030f9a0b347d6a8daab3cc1da1c93d504cd4d25eae6797f8f399cf2c54b5e2','sboggi@fi.uba.ar');\
			INSERT INTO docentes VALUES('cond', 'unused', 'unused','unused', '988a35467442084f2aa34ea8fc7476a7e2bcddae8a966ba71c8a8460a2f3b6d6','nomail@none.com');\
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
			INSERT INTO cursos VALUES(DEFAULT, 10, '0014','PC;PC','200;200',2,'martes;jueves','08:00-11:00;08:00-11:00', 2);\
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
			INSERT INTO materias_departamento VALUES(1, 1);\
			INSERT INTO materias_departamento VALUES(1, 2);\
			INSERT INTO materias_departamento VALUES(2, 3);\
			INSERT INTO materias_departamento VALUES(2, 3);\
			INSERT INTO materias_departamento VALUES(2, 4);\
			INSERT INTO materias_departamento VALUES(2, 5);\
			INSERT INTO materias_departamento VALUES(2, 6);\
			INSERT INTO materias_departamento VALUES(2, 7);\
			INSERT INTO materias_departamento VALUES(2, 8);\
			INSERT INTO materias_departamento VALUES(2, 9);\
			INSERT INTO materias_departamento VALUES(3, 10);\
			INSERT INTO materias_departamento VALUES(4, 11);\
			\
            ");

	pool.query("\
			INSERT INTO departamentos (id_dpto, nombre_dpto, usuario, contrasena, role) VALUES(1, 'Departamento de Matemática', 'dptomatematica', 'B19CEC329221386605CC109352A2405946AFB45ECC3CD34178582D6458B0F304', 'dpto');\
			INSERT INTO departamentos (id_dpto, nombre_dpto, usuario, contrasena, role) VALUES(2, 'Departamento de Computación', 'dptocomputacion', '4666A07163165A9C2CB3961C6C954AB7ADF5BFD414E70E2BF7EAAE71EBC06696', 'dpto');\
			INSERT INTO departamentos (id_dpto, nombre_dpto, usuario, contrasena, role) VALUES(3, 'Departamento de Cond', 'dptocond', '5994471ABB01112AFCC18159F6CC74B4F511B99806DA59B3CAF5A9C173CACFC5', 'dpto');\
			INSERT INTO departamentos (id_dpto, nombre_dpto, usuario, contrasena, role) VALUES(4, 'Departamento de Llenar', 'dptollenar', '5994471ABB01112AFCC18159F6CC74B4F511B99806DA59B3CAF5A9C173CACFC5', 'dpto');\
			INSERT INTO departamentos (id_dpto, nombre_dpto, usuario, contrasena, role) VALUES(0, 'Admin', 'admin', '8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918', 'admin');\
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
