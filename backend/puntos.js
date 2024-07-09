import fs from "fs";

function ordenarGrupo(grupo) {
  function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  // Ordenar selecciones por puntos, diferencia de goles, goles a favor, y luego ranking fifa
  let selecciones = fs.readFileSync("data/selecciones.json", "utf8");
  selecciones = JSON.parse(selecciones);
  function estaMasArribaEnTabla(seleccionA, seleccionB) {
    //Puntos
    if (seleccionA.Pts > seleccionB.Pts) {
      return true;
    } else if (seleccionA.Pts < seleccionB.Pts) {
      return false;
    }
    //Diferencia de goles
    if (seleccionA.GF - seleccionA.GC > seleccionB.GF - seleccionB.GC) {
      return true;
    } else if (seleccionA.GF - seleccionA.GC < seleccionB.GF - seleccionB.GC) {
      return false;
    }
    //Goles a favor
    if (seleccionA.GF > seleccionB.GF) {
      return true;
    } else if (seleccionA.GF < seleccionB.GF) {
      return false;
    }
    // Ranking FIFA
    let seleccionAData;
    let seleccionBData;
    for (let i = 0; i < selecciones.length; i++) {
      if (selecciones[i].id === seleccionA.id) {
        seleccionAData = selecciones[i];
      }
      if (selecciones[i].id === seleccionB.id) {
        seleccionBData = selecciones[i];
      }
    }
    return seleccionAData.ranking_fifa > seleccionBData.ranking_fifa;
  }
  // Selection sort
  for (let i = 0; i < grupo.selecciones.length - 1; i++) {
    let maxIndex = i;
    for (let j = i + 1; j < grupo.selecciones.length; j++) {
      if (
        estaMasArribaEnTabla(grupo.selecciones[j], grupo.selecciones[maxIndex])
      ) {
        maxIndex = j;
      }
    }
    swap(grupo.selecciones, i, maxIndex);
  }
  return grupo;
}

export function actualizarPuntos(grupo, selecciones) {
  let grupos = fs.readFileSync("data/grupos.json", "utf8");
  grupos = JSON.parse(grupos);
  const idA = selecciones[0].id;
  const idB = selecciones[1].id;
  const golesA = selecciones[0].goles;
  const golesB = selecciones[1].goles;
  let puntosA = golesA > golesB ? 3 : golesA === golesB ? 1 : 0;
  let puntosB = golesB > golesA ? 3 : golesA === golesB ? 1 : 0;
  for (let i = 0; i < grupos.length; i++) {
    grupo = grupos[i];
    if (grupo.id === grupo.id) {
      for (let j = 0; j < grupo.selecciones.length; j++) {
        let seleccion = grupo.selecciones[j];
        if (seleccion.id === idA) {
          seleccion.PG += golesA > golesB ? 1 : 0;
          seleccion.PE += golesA === golesB ? 1 : 0;
          seleccion.PP += golesA < golesB ? 1 : 0;
          seleccion.GF += golesA;
          seleccion.GC += golesB;
          seleccion.Pts += puntosA;
        }
        if (seleccion.id === idB) {
          seleccion.PG += golesB > golesA ? 1 : 0;
          seleccion.PE += golesA === golesB ? 1 : 0;
          seleccion.PP += golesB < golesA ? 1 : 0;
          seleccion.GF += golesB;
          seleccion.GC += golesA;
          seleccion.Pts += puntosB;
        }
      }
    }
    grupos[i] = ordenarGrupo(grupo);
  }
  fs.writeFileSync("data/grupos.json", JSON.stringify(grupos, null, 2));
}
