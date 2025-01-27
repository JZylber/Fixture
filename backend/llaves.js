import fs from "fs";

function obtenerllaves() {
  let llaves = fs.readFileSync("data/partidosLlaves.json", "utf8");
  llaves = JSON.parse(llaves);
  return llaves;
}

export default obtenerllaves;
