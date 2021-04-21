//Se obtiene el id de la persona que llega desde la URL
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let id = parseInt(urlParams.get('id'));
let idnotas =[]
let nombreAlumno = document.getElementById("NombreEstudiante")
let documento = document.getElementById("identificacion")
let tipoDoc = document.getElementById("tipoDocumento")
const tabla = document.querySelector(".TablaReporte");

async function listarNotas(a) {
	await fetch("https://localhost:44351/api/Personas/"+a)
		.then((data) => data.json())
		.then((notas) => {
			llenarTabla(notas)
		})
		.catch((error) => error);
}
function llenarTabla(notas) {
    html = " ";
	if(notas.length!=0){
		notas.forEach((n) => {
			if(!idnotas.includes(n.Notas[0].Idnota)){
				idnotas.push(n.Notas[0].Idnota);
				nombreAlumno.innerHTML = n.Nombre+" "+n.Apellidos;
				documento.innerHTML = n.NumeroDocumento;
				tipoDoc.innerHTML = n.Tipodedocumento;
				let promedio = (n.Notas[0].Notas+n.Notas[1].Notas)/2;
				html += "<thead> <tr> <th>Nombre del Docente</th> <th>Materia</th> "
				for (let index = 0; index < n.Notas.length; index++) {
					console.log(n.Notas[index].NombreP)
					html+="<th>"+n.Notas[index].NombreP+"</th>"
					console.log(n.Notas[index].Porcentaje)
					let calculonota1=(n.Notas[1].Notas * (n.Notas[1].Porcentaje / 100))*n.Notas[1].Notas
					let calculonota2=(n.Notas[0].Notas * (n.Notas[0].Porcentaje / 100))*n.Notas[0].Notas
					
					
	
					console.log("textoooo"+(calculonota1+calculonota2)/3)
				}
                html+="<th>Nota Final</th></tr> </thead>"
				html+=`<tbody class="tbody"> 
				<tr id="tr" data-id="${n.Id}">
						<td id="info">${n.Profesor[0].Nombres}</td>
						<td id="info">${n.Materia}</td>
						<td id="infoNotas">${(n.Notas[0]==null||n.Notas[0]==undefined)?"Aún no tiene nota asignada":n.Notas[0].Notas}</td>
							<td id="infoNotas"> ${(n.Notas[1]==null||n.Notas[1]==undefined)?"Aún no tiene nota asignada":n.Notas[1].Notas}</td>
							<td id="infoNotas"> </td>
						</tr>
						`;
				tabla.innerHTML = html;
			}
			
		})}else{
			alert("Alumno sin notas");
			window.close();
			
		}
}



listarNotas(id)
function Imprimir(){
    window.print();
}