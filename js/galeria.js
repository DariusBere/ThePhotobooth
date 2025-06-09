const imagenes = [
    { src: 'img/foto1.jpg', alt: 'Atardecer en la montaña' },
    { src: 'img/foto2.jpg', alt: 'Retrato en estudio' },
    { src: 'img/foto3.jpg', alt: 'Ciudad de noche' },
    { src: 'img/foto4.jpg', alt: 'Paisaje costero' },
    { src: 'img/foto5.jpg', alt: 'Blossom Park' },
    { src: 'img/foto6.jpg', alt: 'Arquitectura moderna' }
];

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('lista-galeria');

    imagenes.forEach((img, idx) => {
        
        const col = document.createElement('div');
        col.className = 'col-6 col-md-4';

        const imagenElemento = document.createElement('img');
        imagenElemento.src = img.src;
        imagenElemento.alt = img.alt;
        imagenElemento.className = 'img-fluid rounded shadow-sm';
        imagenElemento.style.cursor = 'pointer';
        imagenElemento.dataset.bsToggle = 'modal';
        imagenElemento.dataset.bsTarget = `#modalFoto${idx}`;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = `modalFoto${idx}`;
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <img src="${img.src}" alt="${img.alt}" class="img-fluid w-100">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        `;

        col.appendChild(imagenElemento);
        contenedor.appendChild(col);
        document.body.appendChild(modal);
    });
});