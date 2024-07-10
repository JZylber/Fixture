import obtenerGrupos from "./backend/grupos.js";
import { obtenerPartidos, actualizarPartido } from "./backend/partidos.js";
import { resetearFixture } from "./backend/resetear.js";

const handleEvent = (type, data) => {
  let result;
  if (type === "grupos") {
    result = obtenerGrupos();
  } else if (type === "partidos") {
    result = obtenerPartidos();
  } else if (type === "actualizarPartido") {
    result = actualizarPartido(data);
  } else if (type === "resetear") {
    resetearFixture();
  }

  return result;
};

export default handleEvent;
