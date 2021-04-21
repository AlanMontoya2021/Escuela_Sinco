const tabla = document.querySelector(".tbody");

const boton = document.getElementById("ButtonAdd");
const inputNombre = document.getElementById("nombre");
const inputId = document.getElementById("idMateria");
const nombreEditar = document.getElementById("nombreEditar");
const btnGuardarMateria = document.getElementById("ButtonAddEditar");



boton.addEventListener("click", () => {
		Agregar(inputNombre.value);
});

btnGuardarMateria.addEventListener("click", () => {
	Editar(inputId.value, nombreEditar.value);
});

function listarMateria() {
	fetch("https://localhost:44351/api/Materias")
		.then((response) => response.json())
		.then((materias) =>
			materias.forEach((materia) => {
				llenarTabla(materia);
			})
		);
}

function llenarTabla(m) {
	let nMateria = document.createElement("tr");

	nMateria.innerHTML += "<td>" + m.Nombre + "</td>";
	nMateria.setAttribute("data-id", m.Id);
	nMateria.innerHTML += `<td class="tdBoton "><button class="buttonEditar far fa-edit"onclick="AbrirEditar(${m.Id},'${m.Nombre}')">Editar</button>
    <button class=" fas fa-trash-alt buttonEliminar" onclick="ConfirmarEliminar(${m.Id})">Eliminar</button></td>`;
	tabla.appendChild(nMateria);
	inputNombre.value = "";
}

function Agregar(m) {
	fetch("https://localhost:44351/api/Materias", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({
			Nombre: m
		})
	},)
	.then((response) => response.json())
	.then((m) => {
		llenarTabla(m);
		swal ( "¡Transaccion Exitosa! " , "¡Se ha agregado una nueva materia! " , "success" );
	});
}

function AbrirEditar(id, nombre) {
	OpenUpdate();
	inputId.value = id;
	nombreEditar.value = nombre;
}


function Editar(id, nombre) {
	fetch("https://localhost:44351/api/Materias/" + id, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "PUT",
		body: JSON.stringify({
			Id: parseInt(id),
			Nombre: nombre
		})
	}).then(() => {
		let tr = document.querySelector(`tr[data-id="${id}"]`);
	
		tr.innerHTML = `<td>${nombre}</td><td class="tdBoton "><button class="buttonEditar far fa-edit"onclick="AbrirEditar(${id},'${nombre}')">Editar</button>
    <button class=" fas fa-trash-alt buttonEliminar" onclick="Eliminar(${id})">Eliminar</button></td>`;
	}),
		limpiarDatos(),
		CloseUpdate();
}

function Eliminar(id) {
	ConfirmarEliminar();
	fetch("https://localhost:44351/api/Materias/" + id, {
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
function ConfirmarEliminar(id){
	swal({
		title: "Esta seguro de eliminar el alumno?",
		text: "No podra recuperar la información del alumno si lo elimina",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
			Eliminar(id);
		  swal("La materia ha sido eliminada correctamente", {
			icon: "success",
		  });
		} else {
		  swal("No se elimino la materia");
		}
	  });
}

listarMateria();
