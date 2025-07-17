connect2Server();

getData("llaves", (dataLlaves) => {
  const llaves = dataLlaves;
  console.log("Llaves:", llaves);
  const llavesDiv = document.getElementById("llaves");
  const equipoTemplate = document.getElementById("equipo");
  const llaveTemplate = document.getElementById("llave");

  //Cuartos de final
  llaves.forEach((llave) => {
    if (llave.fase === "cuartos") {
      const llaveDiv = llaveTemplate.content.cloneNode(true);
      llaveDiv
        .querySelector(".partidosLlave")
        .classList.add(`cuartos${llave.orden}`);
      const equipos = llave.equipos;
      equipos.forEach((equipo) => {
        const equipoDiv = equipoTemplate.content.cloneNode(true);
        equipoDiv.querySelector(
          ".bandera"
        ).src = `data:image/png;base64,${equipo.bandera}`;
        equipoDiv.querySelector(".nombre").textContent = equipo.nombre;
        equipoDiv.querySelector(".goles").value = equipo.goles || "";
        equipoDiv.querySelector(".penales").value = equipo.penales || "";
        llaveDiv.querySelector(".partidosLlave").appendChild(equipoDiv);
      });
      llavesDiv.appendChild(llaveDiv);
    }
  });
});
