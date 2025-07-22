connect2Server();

const partidos = document.getElementById("partidos");
const resetear = document.getElementById("resetear");

function nuevaFase(fase) {
  const faseElement = document.createElement("div");
  faseElement.classList.add("fase");
  faseElement.innerHTML = `
    <h3>${typeof fase === "number" ? `Fase ${fase}` : fase}</h3>
  `;
  return faseElement;
}

function cargarDatos() {
  getEvent("partidos", (dataPartidos) => {
    let fase = dataPartidos[0].fase;
    let faseElement = nuevaFase(fase);
    for (let i = 0; i < dataPartidos.length; i++) {
      let partido = dataPartidos[i];
      fasePartido = partido.fase;
      if (fasePartido !== fase) {
        partidos.appendChild(faseElement);
        fase = fasePartido;
        faseElement = nuevaFase(fase);
      }
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
            partido.equipos[0].goles !== null
              ? `value=${partido.equipos[0].goles}`
              : ""
          } />
        </div>
        <span>-</span>
        <div class="seleccion B" data-seleccion-id=${partido.equipos[1].id}>
            <input class="goles" type="number" min="0" max="99" ${
              partido.equipos[1].goles !== null
                ? `value=${partido.equipos[1].goles}`
                : ""
            } />
          <span>${partido.equipos[1].nombre}</span>
          <img src="data:image/png;base64,${partido.equipos[1].bandera}" alt="${
        partido.equipos[1].nombre
      }" />
        </div>
    `;
      faseElement.appendChild(partidoElement);
    }
    partidos.appendChild(faseElement);
  });
}
cargarDatos();

function actualizarGoles(event) {
  const goles = Number(event.target.value);
  const seleccionId = Number(event.target.parentElement.dataset.seleccionId);
  const partidoId = Number(event.target.parentElement.parentElement.dataset.id);
  postEvent("actualizarPartido", {
    partidoId: partidoId,
    seleccionId: seleccionId,
    goles: goles,
  });
}

function resetearYCargar() {
  getEvent("resetear", () => {
    partidos.innerHTML = "";
    cargarDatos();
  });
}

partidos.addEventListener("change", actualizarGoles);
resetear.addEventListener("click", resetearYCargar);
