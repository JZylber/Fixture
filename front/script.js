const grupos = document.getElementById("grupos");

fetchData("grupos", (dataGrupos) => {
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
      "<th>Selección</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GF</th><th>GC</th><th>DG</th><th>Pts</th>";
    thead.appendChild(tr);
    puntosGrupo.appendChild(thead);
    let tbody = document.createElement("tbody");
    for (let j = 0; j < grupo.selecciones.length; j++) {
      let seleccion = grupo.selecciones[j];
      let tr = document.createElement("tr");
      tr.innerHTML = `<td><img src="data:image/png;base64,${
        seleccion.bandera
      }" alt="${seleccion.nombre}" /> ${seleccion.nombre}</td><td>${
        seleccion.PG + seleccion.PE + seleccion.PP
      }</td><td>${seleccion.PG}</td><td>${seleccion.PE}</td><td>${
        seleccion.PP
      }</td><td>${seleccion.GF}</td><td>${seleccion.GC}</td><td>${
        seleccion.GF - seleccion.GC
      }</td><td>${seleccion.Pts}</td>`;
      tbody.appendChild(tr);
    }
    puntosGrupo.appendChild(tbody);
    grupoElement.appendChild(puntosGrupo);
    grupos.appendChild(grupoElement);
  }
});
