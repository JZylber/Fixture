import fs from "fs";

function obtener_grupos() {
  let grupos = fs.readFileSync("data/grupos.json", "utf8");
  grupos = JSON.parse(grupos);
  let selecciones = fs.readFileSync("data/selecciones.json", "utf8");
  selecciones = JSON.parse(selecciones);
  for (let i = 0; i < grupos.length; i++) {
    let grupo = grupos[i];
    for (let j = 0; j < grupo.selecciones.length; j++) {
      let seleccionGrupo = grupo.selecciones[j];
      let seleccion = {};
      for (let k = 0; k < selecciones.length; k++) {
        if (selecciones[k].id === seleccionGrupo.id) {
          seleccion = selecciones[k];
          break;
        }
      }
      seleccionGrupo.bandera = fs.readFileSync(seleccion.bandera, "base64");
      seleccionGrupo.nombre = seleccion.nombre;
    }
  }
  return grupos;
}

export default obtener_grupos;
