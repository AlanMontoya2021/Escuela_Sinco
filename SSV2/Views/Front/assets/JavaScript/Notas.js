import * as fetch from "AsignarMateriaAlumno.js";

const tabla = document.querySelector(".tbody");
const selectestudiante = document.getElementById("estudiante")
const selectmateria= document.getElementById("materia")
const selectPeriodo= document.getElementById("Periodo")
const inputnota= document.getElementById("nota")
const btnagregar= document.getElementById("ButtonAdd")
const nombreEditar=document.getElementById("nombreEditar")
const materiaEditar = document.getElementById("materiaEditar");
const EditarNota = document.getElementById("EditarNota");
const periodoeditar= document.getElementById("seleccionPeriodo");
const btnEditar= document.getElementById("ButtonEditar");
let arraypersonas= [];

let idnotas=[]

function listarSelect(url,input){
    fetch(url)
    .then((data)=>data.json())
    .then((notas)=>notas.forEach(nota=>{
        llenarSelect(nota,input)
    }))
}

function listarSelectPeriodo(url,input){
    fetch(url)
    .then((data)=>data.json())
    .then((notas)=>notas.forEach(nota=>{
        llenarSelectPeriodo(nota,input)
    }))
}
function listarSelectAlumno(url, input) {
	fetch(url)
		.then((data) => data.json())
		.then((notas) =>
			notas.forEach((nota) => {
				llenarSelectAlumno(nota,input)
                arraypersonas.push(nota)
			})
		);
}

btnagregar.addEventListener("click" , ()=>{
    Agregar(selectestudiante.value,selectmateria.value,selectPeriodo.value,inputnota.value)
})
fetch.consultar()
async function listarNotas() {
	await fetch("https://localhost:44351/api/Personas/ConsultarMultitabla")
		.then((data) => data.json())
		.then((notas) => {
			llenarTabla(notas);
            console.log('recibido')
		})
		.catch((error) => error);
}

function llenarSelect(datos,input){
   
input.innerHTML += `<option value="${datos.Id}">${datos.Nombre}</option>`;
    
}

function llenarSelectPeriodo(datos,input){
   
    input.innerHTML += `<option value="${datos.Id}">${datos.NombreP} (${datos.Porcentaje}%)</option>`;
        
    }


function llenarSelectAlumno(datos, input) {
     if (datos.Tp_Id==1){
	input.innerHTML += `<option value="${datos.Id}">${datos.Nombres}</option>`;
     }
     input.addEventListener('click', ()=> {console.log("Algo")})
}

function llenarTabla(notas) {
    html = " ";
		notas.forEach((n) => {
			if(!idnotas.includes(n.Notas[0].Idnota)){
            idnotas.push(n.Notas[0].Idnota);
				html += `<tr id="tr" data-id="${n.Id}">
          <td>${n.Nombre}  ${n.Apellidos}</td>
          <td>${n.Materia}</td>
           <td>${(n.Notas[0]==null||n.Notas==undefined)?"Aún no tiene nota asignada":n.Notas[0].Notas}</td>
            <td>${(n.Notas[1]==null||n.Notas[1]==undefined)?"Aún no tiene nota asignada":n.Notas[1].Notas}</td>
          <td class="tdBoton "><button class="buttonEditar far fa-edit"
    onclick="AbrirEditar(${n.Notas[0].Idnota},${(n.Notas[1]==null||n.Notas[1]==undefined)?0:n.Notas[1].Idnota},'${n.Nombre}','${n.Notas[0].Notas}','${(n.Notas[1]==null||n.Notas[1]==undefined)?"Aún no tiene nota asignada":n.Notas[1].Notas}','${n.Materia}')">Editar</button>
    <button class=" fas fa-trash-alt buttonEliminar" onclick="ConfirmarEliminar(${n.Id},${n.Materia_id},${n.Notas[0].Idnota},${(n.Notas[1]==null||n.Notas[1]==undefined)?0:n.Notas[1].Idnota})">Eliminar</button></td>
          </tr>`;
				tabla.innerHTML = html;
			
        } else{
            console.log("holaa")
        }});
}

function Agregar(nombre,materia,periodo,nota){
    fetch("https://localhost:44351/api/NotasMaterias",{
        headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
        method:"POST",
        body:JSON.stringify({
            Notas:nota,
            Periodo_id:periodo,
            Materia_id:materia,
            Estudiante_id:nombre
        })
    }).then((response) => response.json()).then()
    swal ( "¡Transaccion Exitosa! " , "¡Se han agregado las notas al alumno! " , "success" );
 setInterval("actualizar()", 30);
    selectestudiante.value="";
    selectmateria.value="";
    selectPeriodo.value="";
    inputnota.value="";
}

function AbrirEditar(idnota1,idnota2,nombre,nota1,nota2,materia){
    OpenUpdate();
    document.getElementById("nombreEditar").value=nombre
    
    document.getElementById("idnota").value=idnota
    document.getElementById("materiaEditar").value= materia

    periodoeditar.addEventListener("change",()=>{
    if (periodoeditar.value==1) {
        document.getElementById("idnota").value=idnota1
        document.getElementById("EditarNota").value=nota1
    }else if(periodoeditar.value==2){
        document.getElementById("idnota").value=idnota2
        document.getElementById("EditarNota").value=nota2
    }
})
    
}
function actualizar() {
	location.reload(true);
}
function Editar(id,periodo,nota){
    fetch("https://localhost:44351/api/NotasMaterias/" + id, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			method: "PUT",
			body: JSON.stringify({
				Id: parseInt(id),
				Notas: nota,
				Periodo_id: parseInt(periodo)
			})
		}).then((data) => {
			listarNotas(data);
		}),
			setInterval("actualizar()", 30);
			CloseUpdate();
	
    selectestudiante.value = "";
		selectmateria.value = "";
		selectPeriodo.value = "";
		inputnota.value = "";
        
}

function Eliminar(idpersona,idmateria,idnota1,idnota2){
    fetch("https://localhost:44351/api/NotasMaterias/"+idnota1,{
        headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
        method:"DELETE",
        body:JSON.stringify({
            Id: parseInt(idnota1),
            Estudiante_id:parseInt(idpersona),
            Materia_id:parseInt (idmateria),
            Notas: parseInt(idnota2)
        })
    }).then((response) => response).then()
    let tr = document.querySelector(`tr[data-id="${idpersona}"]`);
		tabla.removeChild(tr);
}
function ConfirmarEliminar(idpersona,idmateria,idnota1,idnota2){
	swal({
		title: "Esta seguro de eliminar el alumno?",
		text: "No podra recuperar la información del alumno si lo elimina",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
			Eliminar(idpersona,idmateria,idnota1,idnota2);
		  swal("El maestro ha sido eliminado correctamente", {
			icon: "success",
		  });
		} else {
		  swal("No se elimino el maestro");
		}
	  });
}
btnEditar.addEventListener("click",()=>{
    Editar(
        document.getElementById("idnota").value,
        periodoeditar.value,
        document.getElementById("EditarNota").value
    );
    
    }
    )


listarNotas()
listarSelectAlumno("https://localhost:44351/api/Personas/ConsultarTodo", selectestudiante);
listarSelect("https://localhost:44351/api/Materias",selectmateria)
listarSelectPeriodo("https://localhost:44351/api/Periodoes",selectPeriodo)
listarSelectPeriodo("https://localhost:44351/api/Periodoes", periodoeditar)



