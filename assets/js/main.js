//SIMULADOR COMPRA DE UN PRODUCTO 
//Declaracion de variables
let carrito = [];
let botonAgregar = document.querySelectorAll(".btn-agregar");
const contadorCarrito = document.querySelector("#contador");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProducto = document.querySelector("#carrito-producto");
const carritoAcciones = document.querySelector("#carrito-acciones");
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const total = document.querySelector("#total");
const botonComprar = document.querySelector(".carrito-comprar");

let carritoLS = localStorage.getItem("productos-en-carrito");

const botonesAgregar = () => {
    botonAgregar = document.querySelectorAll(".btn-agregar");
    botonAgregar.forEach(boton => {
        boton.addEventListener("click", () => agregarAlCarrito(boton));    
    });
};

//funcion agregar productos al carrito
const agregarAlCarrito = (boton) => {  
    const idBoton = boton.id;
    const productoAgregado = productos.find(producto => producto.id == idBoton);
    
    if (productoAgregado){
        const productoEnCarrito = carrito.find(producto  => producto.productoAgregado.id === productoAgregado.id);
        
        if(productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
        carrito.push({productoAgregado, cantidad: 1}); 
        }; 
    
        actualizarContadorCarrito();
        cargarProductoCarrito();
        
    };

    
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
};

//Funcion actualizar contador productos carrito
const actualizarContadorCarrito = () => {
    let contadorActualizado = carrito.reduce((acc, producto) => acc + producto.cantidad, 0); 
    contador.innerText = contadorActualizado;
};

//Funcion para mostrar detalle compra en carrito
const cargarProductoCarrito = () => {
    if(carrito && carrito.length > 0) {
        carritoVacio.classList.add("disabled");
        carritoProducto.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");

        carritoProducto.innerHTML =  "";

        carrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
        
            div.innerHTML = `
                <div class="producto-detalles">
                    <div class="imagen"> 
                        <img class="carrito-producto-imagen" src="${producto.productoAgregado.img}">
                    </div>
                    <div class="producto-nombre">
                        <small>Nombre</small>
                        <p>${producto.productoAgregado.nombre}</p>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carito-producto-precio">
                        <small>Precio</small>
                        <p>$${producto.productoAgregado.precio}</p>
                    </div>
                    <div class="carito-producto-subtotal">
                    <small>Subtotal</small>
                        <p>$${producto.productoAgregado.precio * producto.cantidad}</p>
                    </div>
                    <button class="carrito-producto-eliminar" data-producto-id="${producto.productoAgregado.id}"><i class="bi bi-trash-fill"></i></button>
                </div>
            `;
            carritoProducto.append(div);
        });

        actualizarEventosEliminar(); 
       
    }else {
        carritoVacio.classList.remove("disabled");
        carritoProducto.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
    };

    actualizarTotal();
};

const actualizarEventosEliminar = () => {
   
    const botonesEliminarModal = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminarModal.forEach(boton => {
        boton.addEventListener("click",(e) => {
            const idProducto = e.target.getAttribute("data-producto-id");
            eliminarDelCarritoYModal(idProducto);
        });    
    });
};

//Funcion para eliminar productos
function eliminarDelCarritoYModal(idProducto) {
    const index = carrito.findIndex(producto => producto.productoAgregado.id === idProducto);
    
    if(index !== -1) {
        carrito.splice(index, 1);
        cargarProductoCarrito();
        actualizarTotal();
        actualizarContadorCarrito();    
    };

    const modalProducto = document.querySelector(`.modal-producto[data-producto-id="${idProducto}"]`);
    if (modalProducto) {
         modalProducto.remove();
    }
 
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito)); 
};

const actualizarTotal = () => {
    const totalCalculado = carrito.reduce((acc, producto) => acc + (producto.productoAgregado.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
};

const comprarCarrito = () => {
    if(carrito.length > 0) {
        carrito.length = 0;
        carritoProducto.innerHTML =  "";
    
        localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));

        actualizarContadorCarrito();
        actualizarTotal();
    };
};

if (carritoLS) {
    carrito = JSON.parse(carritoLS);
    actualizarContadorCarrito();  
    cargarProductoCarrito();
};

botonComprar.addEventListener("click", comprarCarrito);