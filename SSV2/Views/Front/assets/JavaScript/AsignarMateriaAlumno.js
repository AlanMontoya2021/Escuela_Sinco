const tabla = document.querySelector(".tbody");
const nombreAlumno = document.getElementById("nombreAlumno");
const nombreMateria = document.getElementById("nombreMateria");
const notaNull = document.getElementById("notaNull");
const boton = document.getElementById("ButtonAdd");
const btnEditarPersona = document.querySelector("#ButtonAddEditar");
const idMateriaAlumno = document.getElementById("idMateriaDocente");
const AlumnoEditar = document.getElementById("DocenteEditar");
const MateriaEditar = document.getElementById("MateriaEditar");
const EditarNota = document.getElementById("EditarNota");

export async function fetch() {
	await fetch("https://localhost:44351/api/PersonaMaterias")
		.then((response) => response.json())
		.then((materias) => {
			console.log(materias);
		})
		.catch((error) => error);
}
 async function consultar() {
	await fetch("https://localhost:44351/api/PersonaMaterias")
		.then((response) => response.json())
		.then((materias) => {
			llenarTabla(materias);
		})
		.catch((error) => error);
}

function llenarTabla(materias) {
	html = " ";
	materias.forEach((materia) => {
		if (materia.TipoPersona == 1) {
			html += `<tr id="tr" data-id="${materia.IdDocente}">
          <td>${materia.NombrePersona}  ${materia.ApellidoPersona}</td>
          <td>${materia.Materia}</td>
          <td class="tdBoton "><button class="buttonEditar far fa-edit"onclick="AbrirEditar('${materia.IdDocente}','${materia.IdPersona}', '${materia.IdMateria}')">Editar</button>
    	  <button class=" fas fa-trash-alt buttonEliminar" onclick="ConfirmarEliminar(${materia.IdDocente})">Eliminar</button></td>
          </tr>`;
			tabla.innerHTML = html;
		}
	});
}

function seleccionarMateria(select) {
	fetch("https://localhost:44351/api/Materias")
		.then((response) => response.json())
		.then((materias) =>
			materias.forEach((materia) => {
				select.innerHTML += `<option value = ${materia.Id}>  ${materia.Nombre}  </option>`;
			})
		);
}
function seleccionarDocente(select) {
	fetch("https://localhost:44351/api/Personas/ConsultarTodo")
		.then((response) => response.json())
		.then((personas) =>
			personas.forEach((persona) => {
				if (persona.Tp_Id == 1) {
					select.innerHTML += `<option value = ${persona.Id}>  ${persona.Nombres}  </option>`;
				}
			})
		);
}
seleccionarDocente(nombreAlumno);
seleccionarMateria(nombreMateria);
seleccionarDocente(AlumnoEditar);
seleccionarMateria(MateriaEditar);

boton.addEventListener("click", () => {
	Agregar(nombreAlumno.value, nombreMateria.value);
});

function Agregar(Alumno, Materia) {
	fetch("https://localhost:44351/api/PersonaMaterias", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({
			Persona_Id: Alumno,
			Materia_Id: Materia,
			Notas_Materias_Id: null
		})
	})
		.then((response) => response.json())
		.then((data) => {
			swal ( "¡Transaccion Exitosa! " , "¡Se ha asigando la materia al alumno! " , "success" );
			consultar(data)});
	nombreAlumno.value = "";
	nombreMateria.value = "";
}

function AbrirEditar(Id, Alumno, Materia) {
	OpenUpdate();
	idMateriaAlumno.value = Id;
	AlumnoEditar.value = Alumno;
	MateriaEditar.value = Materia;
}
btnEditarPersona.addEventListener("click", () => {
	Editar(idMateriaAlumno.value, AlumnoEditar.value, MateriaEditar.value);
});
function Editar(id, Alumno, Materia) {
	fetch("https://localhost:44351/api/PersonaMaterias/" + id, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "PUT",
		body: JSON.stringify({
			Id: parseInt(id),
			Persona_Id: Alumno,
			Materia_Id: Materia
		})
	}).then((data) => {
		consultar(data);
	}),
		limpiarDatos(),
		CloseUpdate();
}

function Eliminar(id) {
	ConfirmarEliminar();
	fetch("https://localhost:44351/api/Personas/" + id, {
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
		  swal("El maestro ha eliminado la asignaición correctamente", {
			icon: "success",
		  });
		} else {
		  swal("No se elimino el maestro");
		}
	  });
}
consultar();
