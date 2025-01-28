connect2Server();

getData("llaves", (dataLlaves) => {
  const { llaves, grupos } = dataLlaves;
  const llavesDiv = document.getElementById("llaves");
  const partidosLlaves = document.getElementById("partido");
  const [grupoA, grupoB, grupoC, grupoD] = grupos;
  //Cuartos de final
  let equipoA = grupoA.selecciones[0];
  let equipoB = grupoB.selecciones[1];
  let newPartido = partidosLlaves.content.cloneNode(true);
});
