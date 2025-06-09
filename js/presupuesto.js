document.addEventListener('DOMContentLoaded', () => {
    const nombre = document.getElementById('nombre');
    const apellidos  = document.getElementById('apellidos');
    const telefono   = document.getElementById('telefono');
    const email = document.getElementById('email');
    const tipoSesion = document.getElementById('tipo-sesion');
    const duracion = document.getElementById('duracion');
    const retoqueChk = document.getElementById('retoque');
    const revisiones = document.getElementById('revisiones');
    const descContainer= document.getElementById('descContainer');
    const descuentoHoras = document.getElementById('descuento');
    const resultado = document.getElementById('resultado');

    // Regex para validar
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,15}$/;
    const regexApellidos = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,40}$/;
    const regexTelefono = /^\d{1,9}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Funcion de validacion
    function validar(input, regex) {
        if (!regex.test(input.value.trim())) {
            input.classList.add('is-invalid');
            return false;
        }
        input.classList.remove('is-invalid');
        return true;
    }

    function validarYCalcular() {
        let valido = true;


        //Datos de contacto
        valido &= validar(nombre, regexNombre);
        valido &= validar(apellidos, regexApellidos);
        valido &= validar(telefono, regexTelefono);
        valido &= validar(email, regexEmail);


        //Tipo de sesion
        if(!tipoSesion.value) {
            tipoSesion.classList.add('is-invalid');
            valido = false;    
        } else {
            tipoSesion.classList.remove('is-invalid');
        }

        // Duracion
        const horas = parseInt(duracion.value, 10);
        if (isNaN(horas) || horas < 1) {
            duracion.classList.add('is-invalid');
            valido = false;
        } else {
            duracion.classList.remove('is-invalid');
        }

        // Revisiones
        const numeroRevisiones = parseInt(revisiones.value, 10);
        if (isNaN(numeroRevisiones) || numeroRevisiones < 0 || numeroRevisiones > 3) {
            revisiones.classList.add('is-invalid');
            valido = false;
        } else {
            revisiones.classList.remove('is-invalid');
        }

        // Si alguno es invalido, ocultar desceunto y poner total a 0
        if(!valido) {
            descContainer.style.display = 'none';
            resultado.textContent = '0 €';
            return;
        }

        // Calcular preico base y extras
        const precioBase = parseFloat(tipoSesion.selectedOptions[0].dataset.precio);
        let total = precioBase;
        total += (horas - 1) * 20;              // 20 € por hora extra
        if (retoqueChk.checked) total += 50;    // retoque profesional 
        total += numeroRevisiones * 20;         // 20 € por revision

        // Calcular descuento de 5% por cada bloque de 5 horas completas
        const bloques = Math.floor(horas / 5);
        if (bloques > 0) {
            const descuento = precioBase * (0.05 * bloques);
            total -= descuento;
            descuentoHoras.textContent = descuento.toFixed(2) + ' €';
            descContainer.style.display = 'block';
        } else {
            descContainer.style.display = 'none';
        }

        resultado.textContent = total.toFixed(2) + ' €';
    }

    // Eventos en tiempo real
    [nombre, apellidos, telefono, email].forEach(element => 
        element.addEventListener('input', validarYCalcular)
    );
    [tipoSesion, duracion, retoqueChk, revisiones].forEach(element => 
        element.addEventListener('change', validarYCalcular)
    );

    // Calculo inicial
    validarYCalcular();

})