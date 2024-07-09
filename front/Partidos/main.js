const partidos = document.getElementById("partidos");

fetchData("partidos", (dataPartidos) => {
  for (let i = 0; i < dataPartidos.length; i++) {
    let partido = dataPartidos[i];
    let partidoElement = document.createElement("div");
    partidoElement.classList.add("partido");
    partidoElement.dataset.id = partido.id;
    partidoElement.innerHTML = `
        <div class="seleccion A" data-seleccion-id=${partido.equipos[0].id}>
          <img src="data:image/png;base64,${partido.equipos[0].bandera}" alt="${
      partido.equipos[0].nombre
    }" />
          <span>${partido.equipos[0].nombre}</span>
          <input class="goles" type="number" min="0" max="99" ${
            partido.equipos[0].goles ? `value=${partido.equipos[0].goles}` : ""
          } />
        </div>
        <span>-</span>
        <div class="seleccion B" data-seleccion-id=${partido.equipos[1].id}>
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

function actualizarGoles(event) {
  const goles = Number(event.target.value);
  const seleccionId = Number(event.target.parentElement.dataset.seleccionId);
  const partidoId = Number(event.target.parentElement.parentElement.dataset.id);
  postData("actualizarPartido", {
    partidoId: partidoId,
    seleccionId: seleccionId,
    goles: goles,
  });
}

partidos.addEventListener("change", actualizarGoles);
