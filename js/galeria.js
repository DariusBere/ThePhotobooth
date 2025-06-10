const imagenes = [
    { src: '../img/gallery/foto1.jpg', alt: 'Cigarro' },
    { src: '../img/gallery/foto2.jpg', alt: 'Telefono' },
    { src: '../img/gallery/foto3.jpg', alt: 'Cueva' },
    { src: '../img/gallery/foto4.jpg', alt: 'Boda a la orilla del mar' },
    { src: '../img/gallery/foto5.jpg', alt: 'Bomba de humo' },
    { src: '../img/gallery/foto6.jpg', alt: 'CocaCola' },
    { src: '../img/gallery/foto7.jpg', alt: 'Serum' },
    { src: '../img/gallery/foto8.jpg', alt: 'Autovia' },
    { src: '../img/gallery/foto9.jpg', alt: 'Cortina de luces' },
    { src: '../img/gallery/foto10.jpg', alt: 'Pine forest' },
    { src: '../img/gallery/foto11.jpg', alt: 'Eucalyptus' },
    { src: '../img/gallery/foto12.jpg', alt: 'Paseo en la montaña' },
    { src: '../img/gallery/foto13.jpg', alt: 'Puente' },
    { src: '../img/gallery/foto14.jpg', alt: 'Claudia' },
    { src: '../img/gallery/foto15.jpg', alt: 'Sunset' },
    { src: '../img/gallery/foto16.jpg', alt: 'Escalera natural' },
    { src: '../img/gallery/foto17.jpg', alt: 'Coach' },
    { src: '../img/gallery/foto18.jpg', alt: 'Adrian y Maria' },
    { src: '../img/gallery/foto19.jpg', alt: 'La isla' },
    { src: '../img/gallery/foto20.jpg', alt: 'Black Monochrome' },
    { src: '../img/gallery/foto21.jpg', alt: 'Sunglasses' },
    { src: '../img/gallery/foto22.jpg', alt: 'Anillos de boda' },
    { src: '../img/gallery/foto23.jpg', alt: 'Andreea y Darius' },
    { src: '../img/gallery/foto24.jpg', alt: 'El beso' },
];

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById("lista-galeria");

    imagenes.forEach((img, idx) => {
        
        const col = document.createElement('div');
        col.className = 'col-6 col-md-4';

        const imagenElemento = document.createElement('img');
        imagenElemento.src = img.src;
        imagenElemento.alt = img.alt;
        imagenElemento.className = 'img-fluid rounded shadow-sm';
        imagenElemento.style.cursor = 'pointer';
        imagenElemento.setAttribute('data-bs-toggle', 'modal');
        imagenElemento.setAttribute('data-bs-target', `#modalFoto${idx}`);

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = `modalFoto${idx}`;
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content bg-transparent border-0">
                    <div class="modal-body p-0">
                        <img src="${img.src}" alt="${img.alt}" class="img-fluid w-100">
                    </div>
                    <div class="modal-footer justify-content-center border-0">
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