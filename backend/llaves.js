import fs from "fs";
import obtenerGrupos from "./grupos.js";

// Estructura 4tos de final
const matchups4tos = [
  [
    [0, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [1, 0],
  ],
  [
    [2, 0],
    [3, 1],
  ],
  [
    [2, 1],
    [3, 0],
  ],
];

const matchupsSemis = [
  [("cuartos", 1), ("cuartos", 2)],
  [("cuartos", 3), ("cuartos", 4)],
];

function datosEquipo(equipo) {
  return {
    id: equipo.id,
    nombre: equipo.nombre,
    bandera: equipo.bandera,
  };
}

function ganador(partido) {
  let [equipoA, equipoB] = partido.equipos;
  if (equipoA.goles > equipoB.goles) {
    return datosEquipo(equipoA);
  } else if (equipoB.goles > equipoA.goles) {
    return datosEquipo(equipoB);
  } else {
    if (equipoA.penales > equipoB.penales) {
      return datosEquipo(equipoA);
    } else if (equipoB.penales > equipoA.penales) {
      return datosEquipo(equipoB);
    }
  }
  return null; // Empate, no hay ganador
}

function obtenerllaves() {
  let llaves = fs.readFileSync("data/partidosLlaves.json", "utf8");
  llaves = JSON.parse(llaves);
  let grupos = obtenerGrupos();
  // Armar 4tos de final
  for (let i = 0; i < matchups4tos.length; i++) {
    let llave = llaves.find((l) => l.fase === "cuartos" && l.orden === i + 1);
    if (llave) {
      let [grupoA, grupoB] = matchups4tos[i];
      let equipoA = grupos[grupoA[0]].selecciones[grupoA[1]];
      let equipoB = grupos[grupoB[0]].selecciones[grupoB[1]];
      llave.equipos = [
        { ...llave.equipos[0], ...datosEquipo(equipoA) },
        { ...llave.equipos[1], ...datosEquipo(equipoB) },
      ];
    }
  }
  return llaves;
}

export default obtenerllaves;
