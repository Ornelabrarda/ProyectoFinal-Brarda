//SIMULADOR COMPRA DE UN PRODUCTO 
//Declaracion de variables
let carrito = [];
let botonAgregar = document.querySelectorAll(".btn-agregar");
const contadorCarrito = document.querySelector("#contador");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProducto = document.querySelector("#carrito-producto");
const carritoAcciones = document.querySelector("#carrito-acciones");
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const total = document.querySelector(".carrito-total");
const botonComprar = document.querySelector(".carrito-comprar")

let carritoLS = localStorage.getItem("productos-en-carrito");

function botonesAgregar() {
    botonAgregar = document.querySelectorAll(".btn-agregar");
    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);    
    });
};

//funcion agregar productos al carrito
const agregarAlCarrito = (e) => {  
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id == idBoton);
    
    if (productoAgregado){
        const productoEnCarrito = carrito.find(producto  => producto.id == idBoton);
        
        if(productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
        carrito.push({productoAgregado, cantidad: 1}); 
        }; 
    };

    actualizarContadorCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
};

//Funcion actualizar contador productos carrito
const actualizarContadorCarrito = () => {
    let contadorActualizado = carrito.reduce((acc, producto) => acc + producto.cantidad, 0); 
    contador.innerText = contadorActualizado;
};

//Funcion para mostrar detalle compra en carrito
function cargarProductoCarrito() {
    if(carrito && carrito.length > 0) {
        carritoVacio.classList.add("disabled");
        carritoProducto.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");

        carritoProducto.innerHTML =  "";

        carrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
        
            div.innerHTML = `
                <img class="carrito-producto-imagen" src=${producto.img}>
                <div class="producto-nombre">
                    <small>Nombre</small>
                        <p>${producto.nombre}</p>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                </div>
                <div class="carito-producto-precio">
                    <small>Precio</small>
                        <p>${producto.precio}</p>
                </div>
                <button class="carrito-producto-eliminar" id=${producto.id}><i class="bi bi-trash-fill"></i></button>
            `;
            carritoProducto.append(div);
        }) 
       
    }else {
        carritoVacio.classList.remove("disabled");
        carritoProducto.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
    };
    actualizarBotonesEliminar();
    actualizarTotal();
};


function actualizarBotonesEliminar() {
    botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);    
    });
};

//Funcion para eliminar productos
function eliminarDelCarrito() {
    const idBoton =e.currentTarget.id
    const index = carrito.findIndex(producto => producto.id === idBoton)
    carrito.splice(index, 1);
    cargarProductoCarrito();
    actualizarTotal();
    actualizarContadorCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
};

function actualizarTotal () {
    const totalCalculado = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.inneText = `${totalCalculado}`;
};

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    carrito.length = 0;
    localStorage.setItem("producto-en-carrito", JSON.stringify(carrito));

    carritoVacio.classList.add("disabled");
    carritoProducto.classList.add("disabled");
    carritoAcciones.classList.add("disabled");

    actualizarContadorCarrito();
};

