//SIMULADOR COMPRA DE UN PRODUCTO 
//Declaracion de variables
let carrito;
let botonAgregar = document.querySelectorAll(".btn-agregar");
const contadorCarrito = document.querySelector("#contador");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProducto = document.querySelector("#carrito-producto");
const carritoAcciones = document.querySelector("#carrito-acciones");

const carritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if(carritoLS) {
    carrito = carritoLS;
    
} else {
    carrito = [];
};

function botonesAgregar() {
    botonAgregar = document.querySelectorAll(".btn-agregar");
    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);    
    });
};

//funcion agregar productos al carrito
const agregarAlCarrito = (e) => {  
    const idBoton = e.currentTarget.id;
    const productoAgregado = carrito.find(producto => productos.id === idBoton);
    
    if (carrito.some(producto => productos.id === idBoton)) {
       const index = carrito.findIndex(producto => productos.id === idBoton);
       carrito[index].cantidad++;
    } else {
        
        carrito.push(productoAgregado); 
    }
    actualizarContadorCarrito();
    console.log(carrito);

    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
};

//Funcion actualizar contador productos carrito
const actualizarContadorCarrito = () => {
    let contadorActualizado = carrito.reduce((acc, producto) => acc + productos.cantidad, 0); 
    contador.innerText = contadorActualizado;
};

//Funcion para mostrar detalle compra en carrito
if(carrito && carrito.length > 0) {
    carritoVacio.classList.add("disabled");
    carritoProducto.classList.remove("disabled");
    carritoAcciones.classList.remove("disabled");

    carritoProducto.innerHTML =  "";

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        
        div.innerHTML = `
            <img class="carrito-producto-imagen" src=${productos.img} alt=${productos.nombre}>
            <div class="producto-nombre">
                <small>Nombre</small>
                    <p>${productos.nombre}</p>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                    <p>${productos.cantidad}</p>
            </div>
            <div class="carito-producto-precio">
                <small>Precio</small>
                    <p>${productos.precio}</p>
            </div>
            <button class="carrito-producto-eliminar" id=${productos.id}><i class="bi bi-trash-fill"></i></button>

        `;
            carritoProducto.append(div);
    });
};

botonesAgregar();
