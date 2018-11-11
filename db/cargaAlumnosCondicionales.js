module.exports = function(pool){
    pool.query("\
			INSERT INTO inscripciones VALUES('00001',14, false);\
			INSERT INTO inscripciones VALUES('00002',14, false);\
			INSERT INTO inscripciones VALUES('00003',14, false);\
            INSERT INTO inscripciones VALUES('00004',14, false);\
            INSERT INTO inscripciones VALUES('00005',14, false);\
            INSERT INTO inscripciones VALUES('00001',5, true);\
			INSERT INTO inscripciones VALUES('00002',5, true);\
			INSERT INTO inscripciones VALUES('00003',6, true);\
            INSERT INTO inscripciones VALUES('00004',4, true);\
            INSERT INTO inscripciones VALUES('00005',4, true);\
			INSERT INTO inscripciones VALUES('00006',5, true);\
			INSERT INTO inscripciones VALUES('00007',6, true);\
            INSERT INTO inscripciones VALUES('00008',4, true);\
            INSERT INTO inscripciones VALUES('00008',4, true);\
			INSERT INTO inscripciones VALUES('00010',4, true);\
            INSERT INTO inscripciones VALUES('95812',4, true);\
            INSERT INTO inscripciones VALUES('95812',7, true);\
            INSERT INTO inscripciones VALUES('00012',6, true);"
        );
}