let botonMenu = document.querySelector(".hamburguesa");
let ver=document.querySelectorAll('.ver');
botonMenu.addEventListener('click',MostrarNav);

function MostrarNav(){
    if(botonMenu){
        console.log('dio click')
      ver.forEach((mostrar) => {
				mostrar.classList.toggle("hidden");
			});
    }
    else{
        alert('error')
    }
}

