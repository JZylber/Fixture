import obtener_grupos from "./grupos.js";

const handleEvent = (type, data) => {
  let result;
  if (type === "grupos") {
    result = obtener_grupos();
  }

  return [type, result];
};

export default handleEvent;
