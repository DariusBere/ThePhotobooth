document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-presupuesto');
    const nombre = document.getElementById('nombre');
    const apellidos  = document.getElementById('apellidos');
    const telefono   = document.getElementById('telefono');
    const email = document.getElementById('email');
    const tipoSesion = document.getElementById('tipo-sesion');
    const duracion = document.getElementById('duracion');
    const retoqueChk = document.getElementById('retoque');
    const revisiones = document.getElementById('revisiones');
    const condCheck   = document.getElementById('acepto');
    const descContainer= document.getElementById('descContainer');
    const descuentoHoras = document.getElementById('descuento');
    const resultado = document.getElementById('resultado');

    // Regex para validar
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,15}$/;
    const regexApellidos = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,40}$/;
    const regexTelefono = /^\d{1,9}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //Funcion que calcula precio y descuento en tiempo real
    function calcularPrecio() {

        const precioBase = tipoSesion.value ? parseFloat(tipoSesion.selectedOptions[0].dataset.precio) : 0;

        // Horas
        const horas = parseInt(duracion.value.trim(), 10);
        let total = precioBase;
        if (!isNaN(horas) && horas >= 1) {
            total += (horas - 1) * 20;
        }

        // Retoque profesional
        if (retoqueChk.checked) {
            total += parseFloat(retoqueChk.value);
        }

        // Revisiones
        const numeroRevisiones = parseInt(revisiones.value.trim(), 10);
        if (!isNaN(numeroRevisiones) && numeroRevisiones > 0) {
            total += numeroRevisiones * 20;
        }

        // Descuento: 5% del precio base por cada bloque de 5 horas completas
        if (!isNaN(horas) && horas >= 5) {
            const bloques = Math.floor(horas/5);
            const descuentoVal = precioBase * (0.05 * bloques);
            descContainer.style.display = 'block';
            descuentoHoras.textContent = descuentoVal.toFixed(2) + ' €';
            total -= descuentoVal;
        } else {
            descContainer.style.display = 'none';
            descuentoHoras.textContent = '';
        }

        // Mostrar total
        resultado.textContent = total.toFixed(2) + ' €';
    }

    // EventListener para recalcular el precio al cambiar datos de precio y extras
    [tipoSesion, duracion, retoqueChk, revisiones].forEach(elemento => elemento.addEventListener('input', calcularPrecio));

    // Calculo inicial
    calcularPrecio();


    // Manejador de envio: validar solo al pulsar submit
    form.addEventListener('submit', eventoSubmit => {
        [nombre, apellidos, telefono, email, tipoSesion, duracion, revisiones, condCheck].forEach(elemento => 
            elemento.classList.remove('is-invalid')
        );

        let valido = true;

        // Validacion de cada campo
        if (!regexNombre.test(nombre.value.trim())) {
            nombre.classList.add('is-invalid');
            valido = false;
        } 

        if (!regexApellidos.test(apellidos.value.trim())) {
            apellidos.classList.add('is-invalid');
            valido = false;
        }

        if (!regexTelefono.test(telefono.value.trim())) {
            telefono.classList.add('is-invalid');
            valido = false;
        }

        if (!regexEmail.test(email.value.trim())) {
            email.classList.add('is-invalid');
            valido = false;
        }

        const numeroHoras = parseInt(duracion.value.trim(), 10);
        if (isNaN(numeroHoras) || numeroHoras < 1) {
            duracion.classList.add('is-invalid');
            valido = false;
        }

        const numeroRevisiones = parseInt(revisiones.value.trim(), 10);
        if (isNaN(numeroRevisiones) || numeroRevisiones < 0 || numeroRevisiones > 3) {
            revisiones.classList.add('is-invalid');
            valido = false;
        }

        if (!condCheck.checked) {
            condCheck.classList.add('is-invalid');
            valido = false;
        }

        if (!valido) {
            // Evita envio si hay errores
            eventoSubmit.preventDefault();
            return;
        }

        // Si es valido, permitir mailto: y luego resetear
        setTimeout(() => {
            form.reset();
            calcularPrecio();
        }, 100);
    });
});

