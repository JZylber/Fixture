import obtenerGrupos from "./backend/grupos.js";
import obtenerPartidos from "./backend/partidos.js";

const handleEvent = (type, data) => {
  let result;
  if (type === "grupos") {
    result = obtenerGrupos();
  } else if (type === "partidos") {
    result = obtenerPartidos();
  }

  return result;
};

export default handleEvent;
