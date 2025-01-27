import fs from "fs";
import { limpiarGrupo } from "./puntos.js";

export function resetearFixture() {
  let grupos = fs.readFileSync("data/grupos.json", "utf8");
  grupos = JSON.parse(grupos);
  for (let i = 0; i < grupos.length; i++) {
    limpiarGrupo(grupos[i]);
  }
  let partidos = fs.readFileSync("data/partidos.json", "utf8");
  partidos = JSON.parse(partidos);
  for (let i = 0; i < partidos.length; i++) {
    let partido = partidos[i];
    let equipos = partido.equipos;
    for (let j = 0; j < equipos.length; j++) {
      equipos[j].goles = null;
    }
  }
  let partidosLllaves = fs.readFileSync("data/partidosLlaves.json", "utf8");
  partidosLllaves = JSON.parse(partidosLllaves);
  for (let i = 0; i < partidosLllaves.length; i++) {
    let partido = partidosLllaves[i];
    let equipos = partido.equipos;
    for (let j = 0; j < equipos.length; j++) {
      equipos[j].id = null;
      equipos[j].goles = null;
      equipos[j].penales = null;
    }
  }
  fs.writeFileSync("data/grupos.json", JSON.stringify(grupos, null, 2));
  fs.writeFileSync("data/partidos.json", JSON.stringify(partidos, null, 2));
  fs.writeFileSync(
    "data/partidosLlaves.json",
    JSON.stringify(partidosLllaves, null, 2)
  );
}
