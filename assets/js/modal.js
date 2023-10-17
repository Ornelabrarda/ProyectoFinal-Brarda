const modalContenedor = document.querySelector('.modal-contenedor');
const abrirCarrito = document.querySelector('.cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');

abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

// modalContenedor.addEventListener('click', () => {
//     cerrarCarrito.click()
// });
