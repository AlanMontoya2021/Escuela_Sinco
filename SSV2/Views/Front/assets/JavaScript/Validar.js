const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const expresiones ={
       nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
       apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
       nota: /^\d{1,2}$/, //Solo numeros del 0 al 5.
       documento: /^\d{7,10}$/ //Solo numeros.
}


const campos = {
       nombre : false,
       apellido : false,
       nota : false,
       documento : false
}


const validarFormulario = (e) =>{
       switch (e.target.name){
              case "nombre":
                     validarCampo(expresiones.nombre, e.target, 'nombre')
              break;
              case "apellido":
                     validarCampo(expresiones.apellido, e.target, 'apellido')
              break;
              case "nota":
                     validarCampo(expresiones.nota, e.target, 'nota')
              break;
              case "documento":
                     validarCampo(expresiones.documento, e.target, 'documento')
              break;
       }
}

const validarCampo = (expresion, input, campo) => {
       if(expresion.test(input.value)){
              document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
              document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
              document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
              document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
              document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')                   
              campos[campo] = true;
              document.getElementById("ButtonAdd").disabled=false;
              document.getElementById("ButtonAdd").style.backgroundColor="#023859"
              
       }else{
              document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
              document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
              document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
              document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle'); 
              document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
              campos[campo] = false;
              document.getElementById("ButtonAdd").disabled=true;
              document.getElementById("ButtonAdd").style.backgroundColor="#658294"
       }
}


inputs.forEach((input) =>{
       input.addEventListener('keyup', validarFormulario);
       input.addEventListener('blur', validarFormulario);
});

