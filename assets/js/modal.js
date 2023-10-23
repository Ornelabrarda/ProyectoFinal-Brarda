//Escuchador eventos - Abrir y cerrar modal con detalles de la compra

const modalContenedor = document.querySelector('.modal-contenedor');
const abrirCarrito = document.querySelector('.cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');

abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});