document.addEventListener('DOMContentLoaded', () => {
    fetch('data/noticias.json')
        .then(response => {
            if(!response.ok) {
                throw new Error('HTTP error! status: ${response.status}');
            }
            return response.json();
        })
        .then(datos => {
            renderNoticias(datos);
        })
        .catch(error => {
            console.error('Error cargando noticias: ', error);
            mostrarError('No se pudieron cargar las noticias en este momento,');
        });
    });

const contenedorNoiticias = document.getElementById('lista-noticias');

function renderNoticias(noticias) {

    contenedorNoiticias.innerHTML = '';

    noticias.forEach(noticia => {
        
        //Creacion de columna
        const col = document.createElement('article');
        col.className = 'col-md-6 col-lg-4';


        //Creacion del Card
        const card = document.createElement('div');
        card.className = 'card h-100';

        //Body de la card
        const body = document.createElement('div');
        body.className = 'card-body';
        body.innerHTML = `
            <h5 class="card-title">${noticia.titular}</h5>
            <p class="card-text">${noticia.texto}</p>
        `;

        const footer = document.createElement('div');
        footer.className = 'card-footer text-muted';

        const fecha = new Date(noticia.fecha).toLocaleDateString('es-ES', {
            year: 'numeric', month: '2-digit', day: '2-digit'
        });
        footer.textContent = `Fecha: ${fecha}`;

        card.appendChild(body);
        card.appendChild(footer);
        col.appendChild(card);
        contenedorNoiticias.appendChild(col);
    });
}

function mostrarError(mensaje) {
    const seccion = document.getElementById('noticias');
    const aviso = document.createElement('div');
    aviso.className = 'alert alert-danger';
    aviso.textContent = mensaje;

    seccion.prepend(aviso);
}