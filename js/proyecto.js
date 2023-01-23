const formulario = document.getElementById("formulario")
const inputs = document.querySelectorAll("#formulario input")

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
    usuario: false,
    usuario: false,
    usuario: false,
    usuario: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'email');
		break;
	}
}

//Ponemos `#grupo__${campo}` en donde iria el grupo usuario, password, etc. para no repetir lo mismo en cada línea. De otro modo quedaría ("grupo__usuario .formulario__input-error") para cada input.

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)) {
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo")
        campos[campo] = true;
    } else {
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo")
        campos[campo] = false;
    }   
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

//Creamos una funcion para validar los campos y reiniciarlos al enviar el formulario:

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const terminos = document.getElementById("terminos")
        if(campos.usuario && campos.nombre && campos.email && campos.password && terminos.checked){
            formulario.reset();

            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo")
            setTimeout(() => {
                document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo")
            }, 5000);
            
		    document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			    icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        }
    })

