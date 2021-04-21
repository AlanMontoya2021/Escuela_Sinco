
function limpiarDatos() {
	document.querySelector(".frmEditar").reset();
   
}

function OpenUpdate() {
	let modal = document.querySelector(".modalUpdate");

	modal.style.display = "block";
}

function CloseUpdate() {
	let modal = document.querySelector(".modalUpdate");
	modal.style.display = "none";
}
