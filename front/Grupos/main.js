connect2Server();

const grupos = document.getElementById("grupos");

getData("grupos", (dataGrupos) => {
  for (let i = 0; i < dataGrupos.length; i++) {
    let grupo = dataGrupos[i];
    let grupoElement = document.createElement("div");
    grupoElement.classList.add("grupo");
    let grupoHeader = document.createElement("h2");
    grupoHeader.textContent = `Grupo ${grupo.id}`;
    grupoElement.appendChild(grupoHeader);
    let puntosGrupo = document.createElement("table");
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    tr.innerHTML =
      "<th>Selección</th><th class='numerico'>PJ</th><th class='numerico'>PG</th><th class='numerico'>PE</th><th class='numerico'>PP</th><th class='numerico'>GF</th><th class='numerico'>GC</th><th class='numerico'>DG</th><th class='numerico'>Pts</th>";
    thead.appendChild(tr);
    puntosGrupo.appendChild(thead);
    let tbody = document.createElement("tbody");
    for (let j = 0; j < grupo.selecciones.length; j++) {
      let seleccion = grupo.selecciones[j];
      let tr = document.createElement("tr");
      tr.innerHTML = `<td><img src="data:image/png;base64,${
        seleccion.bandera
      }" alt="${seleccion.nombre}" /> ${
        seleccion.nombre
      }</td><td class='numerico'>${
        seleccion.PG + seleccion.PE + seleccion.PP
      }</td><td class='numerico'>${seleccion.PG}</td><td class='numerico'>${
        seleccion.PE
      }</td><td class='numerico'>${seleccion.PP}</td><td class='numerico'>${
        seleccion.GF
      }</td><td class='numerico'>${seleccion.GC}</td><td class='numerico'>${
        seleccion.GF - seleccion.GC
      }</td><td class='numerico'>${seleccion.Pts}</td>`;
      tbody.appendChild(tr);
    }
    puntosGrupo.appendChild(tbody);
    grupoElement.appendChild(puntosGrupo);
    grupos.appendChild(grupoElement);
  }
});
