let botonMenu = document.querySelector(".hamburguesa");
let ver=document.querySelectorAll('.ver');
botonMenu.addEventListener('click',MostrarNav);

function MostrarNav(){
    if(botonMenu){
      ver.forEach((mostrar) => {
				mostrar.classList.toggle("hidden");
			});
    }
    else{
        alert('error')
    }
}

