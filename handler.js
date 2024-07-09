import obtenerGrupos from "./backend/grupos.js";
import { obtenerPartidos, actualizarPartido } from "./backend/partidos.js";

const handleEvent = (type, data) => {
  let result;
  if (type === "grupos") {
    result = obtenerGrupos();
  } else if (type === "partidos") {
    result = obtenerPartidos();
  } else if (type === "actualizarPartido") {
    result = actualizarPartido(data);
  }

  return result;
};

export default handleEvent;
