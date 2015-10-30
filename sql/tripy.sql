-- DDL
DROP TABLE IF EXISTS gasto;
DROP TABLE IF EXISTS  persona;
DROP TABLE IF EXISTS  evento;

CREATE TABLE IF NOT EXISTS persona (
	id INTEGER primary key, nombre TEXT, foto BLOB
);

CREATE TABLE IF NOT EXISTS evento (
	id INTEGER primary key, titulo TEXT, foto BLOB, lugar TEXT, fecha_inicio DATE, fecha_fin DATE,
	presupuesto_inicio INTEGER, presupuesto_fin INTEGER
);

CREATE TABLE IF NOT EXISTS gasto (
	id INTEGER primary key, persona_fk INTEGER, evento_fk INTEGER, concepto TEXT, importe INTEGER, fecha DATE,
	FOREIGN KEY (persona_fk) REFERENCES persona (id),
	FOREIGN KEY (evento_fk) REFERENCES evento (id)
);

-- DML
INSERT INTO persona (id, nombre, foto) VALUES (1, "Francis", NULL);
INSERT INTO persona (id, nombre, foto) VALUES (2, "Roberto", NULL);
INSERT INTO persona (id, nombre, foto) VALUES (3, "María", NULL);
INSERT INTO persona (id, nombre, foto) VALUES (4, "Luis", NULL);

INSERT INTO evento (id, titulo, foto, lugar, fecha_inicio, fecha_fin, presupuesto_inicio, presupuesto_fin) 
VALUES (1, "Viaje a Portugal", NULL, "Portugal", "2015-09-01", NULL, 100, 0);

INSERT INTO gasto (persona_fk, evento_fk, concepto, importe, fecha) VALUES (1, 1, "Pizzas", 30, "2015-09-01");
INSERT INTO gasto (persona_fk, evento_fk, concepto, importe, fecha) VALUES (4, 1, "Entradas", 25, "2015-09-01");
INSERT INTO gasto (persona_fk, evento_fk, concepto, importe, fecha) VALUES (2, 1, "Cafés", 20, "2015-09-01");
INSERT INTO gasto (persona_fk, evento_fk, concepto, importe, fecha) VALUES (3, 1, "Gasolina", 10, "2015-09-01");
INSERT INTO gasto (persona_fk, evento_fk, concepto, importe, fecha) VALUES (1, 1, "Alquiler material", 15, "2015-09-01");

-- Queries
-- Gastos by Persona
select gasto.id, gasto.concepto, sum(gasto.importe) as importe, persona.nombre as persona, gasto.fecha from persona, evento, gasto where persona.id = gasto.persona_fk and evento.id = gasto.evento_fk group by gasto.persona_fk having importe > 0 order by importe desc;
