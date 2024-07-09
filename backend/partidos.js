import fs from "fs";
import { actualizarPuntos } from "./puntos.js";

export function obtenerPartidos() {
  let partidos = fs.readFileSync("data/partidos.json", "utf8");
  partidos = JSON.parse(partidos);
  let selecciones = fs.readFileSync("data/selecciones.json", "utf8");
  selecciones = JSON.parse(selecciones);
  for (let i = 0; i < partidos.length; i++) {
    let partido = partidos[i];
    let equipos = partido.equipos;
    for (let j = 0; j < equipos.length; j++) {
      let equipo = equipos[j];
      let seleccion = {};
      for (let k = 0; k < selecciones.length; k++) {
        if (selecciones[k].id === equipo.id) {
          seleccion = selecciones[k];
          break;
        }
      }
      equipo.bandera = fs.readFileSync(seleccion.bandera, "base64");
      equipo.nombre = seleccion.nombre;
    }
  }
  return partidos;
}

export function actualizarPartido(data) {
  let partidos = fs.readFileSync("data/partidos.json", "utf8");
  partidos = JSON.parse(partidos);
  let equipos;
  let grupo;
  for (let i = 0; i < partidos.length; i++) {
    let partido = partidos[i];
    if (partido.id === data.partidoId) {
      grupo = partido.grupo;
      equipos = partido.equipos;
      for (let j = 0; j < equipos.length; j++) {
        if (equipos[j].id === data.seleccionId) {
          equipos[j].goles = data.goles;
          break;
        }
      }
      break;
    }
  }
  fs.writeFileSync("data/partidos.json", JSON.stringify(partidos, null, 2));
  if (equipos[0].goles !== null && equipos[1].goles !== null) {
    actualizarPuntos(grupo, equipos);
  }
}
