const tabla = document.querySelector(".tbody");
const boton = document.getElementById("ButtonAdd");
const inputNombre = document.getElementById("nombre");
const inputId = document.getElementById("idPeriodo");
const nombreEditar = document.getElementById("nombreEditar");
const btnGuardarPeriodo = document.getElementById("ButtonAddEditar");
const Porcentaje= document.getElementById("porcentaje");
const PorcentajeEditar=document.getElementById("PorcentajeEditar");
let otrosporcentajes =[]
let totalArregloPorcentaje=0;


boton.addEventListener("click", () => {
	Agregar(inputNombre.value,Porcentaje.value);
});

btnGuardarPeriodo.addEventListener("click", () => {
	Editar(inputId.value, nombreEditar.value,PorcentajeEditar.value);
});

function listarPeriodo() {
	fetch("https://localhost:44351/api/Periodoes")
		.then((response) => response.json())
		.then((periodos) =>
			periodos.forEach((periodo) => {
				llenarTabla(periodo);
			})
		);
}

function llenarTabla(m) {
	let nMateria = document.createElement("tr");

	nMateria.innerHTML += `<td>${m.NombreP} </td>
	<td>${m.Porcentaje}% </td>`;
	otrosporcentajes.push(m.Porcentaje)
	totalArregloPorcentaje=otrosporcentajes.reduce(function(a, b){ return a + b; })
	nMateria.setAttribute("data-id", m.Id);
	nMateria.innerHTML += `<td class="tdBoton "><button class="buttonEditar far fa-edit"onclick="AbrirEditar(${m.Id},'${m.NombreP}',${m.Porcentaje})">Editar</button>
    <button class=" fas fa-trash-alt buttonEliminar" onclick="Eliminar(${m.Id})">Eliminar</button></td>`;
	tabla.appendChild(nMateria);
	inputNombre.value = "";
}


	Porcentaje.addEventListener("keyup",()=>{validarPorcentaje(Porcentaje)})

	PorcentajeEditar.addEventListener("keyup",()=>{validarPorcentaje(PorcentajeEditar) })

	function validarPorcentaje(input){
		(parseFloat(input.value) + totalArregloPorcentaje>100)?alert("te pasaste"):alert("hurra")
	}

function Agregar(nombre,porcentaje) {
	fetch("https://localhost:44351/api/Periodoes", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({
			NombreP: nombre,
			Porcentaje: porcentaje
		})
	})
		.then((response) => response.json())
		.then((data) => llenarTabla(data));
}

function AbrirEditar(id, nombre,porcentaje) {
	OpenUpdate();
	inputId.value = id;
	nombreEditar.value = nombre;
	PorcentajeEditar.value=porcentaje
}

function Editar(id, nombre,porcentaje) {
	fetch("https://localhost:44351/api/Periodoes/" + id, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "PUT",
		body: JSON.stringify({
			Id: parseInt(id),
			NombreP: nombre,
			Porcentaje: parseFloat(porcentaje)
		})
	}).then(() => {
		let tr = document.querySelector(`tr[data-id="${id}"]`);

		tr.innerHTML = `<td>${nombre}</td><td>${porcentaje}%</td><td class="tdBoton "><button class="buttonEditar far fa-edit"onclick="AbrirEditar(${id},'${nombre}')">Editar</button>
    <button class=" fas fa-trash-alt buttonEliminar" onclick="Eliminar(${id})">Eliminar</button></td>`;
	}),
		limpiarDatos(),
		CloseUpdate();
}

function Eliminar(id) {
	fetch("https://localhost:44351/api/Periodoes/" + id, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "DELETE",
		body: JSON.stringify({
			Id: parseInt(id)
		})
	}).then(() => {
		let tr = document.querySelector(`tr[data-id="${id}"]`);
		tabla.removeChild(tr);
		inputId.value = "";
		inputNombre.value = "";
	});
}

listarPeriodo();
