const partidos = document.getElementById("partidos");

fetchData("partidos", (dataPartidos) => {
  for (let i = 0; i < dataPartidos.length; i++) {
    let partido = dataPartidos[i];
    let partidoElement = document.createElement("div");
    partidoElement.classList.add("partido");
    partidoElement.dataset.id = partido.id;
    partidoElement.innerHTML = `
        <div class="seleccion A">
          <img src="data:image/png;base64,${partido.equipos[0].bandera}" alt="${
      partido.equipos[0].nombre
    }" />
          <span>${partido.equipos[0].nombre}</span>
          <input class="goles" type="number" min="0" max="99" ${
            partido.equipos[0].goles ? `value=${partido.equipos[0].goles}` : ""
          } />
        </div>
        <span>-</span>
        <div class="seleccion B">
            <input class="goles" type="number" min="0" max="99" ${
              partido.equipos[1].goles
                ? `value=${partido.equipos[1].goles}`
                : ""
            } />
          <span>${partido.equipos[1].nombre}</span>
          <img src="data:image/png;base64,${partido.equipos[1].bandera}" alt="${
      partido.equipos[1].nombre
    }" />
        </div>
    `;
    partidos.appendChild(partidoElement);
  }
});
