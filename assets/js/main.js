//SIMULADOR COMPRA DE UN PRODUCTO 

//Declaracion de variables
let carrito = [];
let botonAgregar = document.querySelectorAll(".btn-agregar");
const contadorCarrito = document.querySelector("#contador");
const carritoProducto = document.querySelector("#carrito-producto");
const botonesEliminarModal = document.querySelectorAll(".carrito-producto-eliminar");
const modalCarrito = document.querySelector('.carrito-contenedor');
const total = document.querySelector("#total");
const botonComprar = document.querySelector(".carrito-comprar");

//Escuchador de eventos - Botones agregar al carrito
const botonesAgregar = () => {
    botonAgregar = document.querySelectorAll(".btn-agregar");
    botonAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            agregarAlCarrito(boton);
            Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
            background: "#59ab6e",
            },
            onClick: function(){} 
            }).showToast();        
        });
    });
};

//Funcion agregar productos al carrito
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

//Funcion mostrar detalle compra en carrito a través de un modal
const cargarProductoCarrito = () => {
    if(carrito && carrito.length > 0) {
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
                    <div class="boton">  
                        <button class="boton-eliminar" value="${producto.productoAgregado.id}">X</button>
                    </div>                
                </div>
            `;
            carritoProducto.append(div);
        });  
    };

    actualizarTotal();
};

// Escuchador de eventos - Botones eliminar del carrito
modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation();

    if (e.target.classList.contains('boton-eliminar')) {
        eliminarProductoCarrito(e.target.value);
    };

    Toastify({
        text: "Producto eliminado del carrito",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
        background: "#59ab6e",
        },
        onClick: function(){}
        }).showToast();
});

//Función eliminar productos del carrrito
const eliminarProductoCarrito = (productoId) => {
    const productoIndex = carrito.findIndex(producto => producto.productoAgregado.id == productoId);
    
    if (productoIndex > -1) {
        if (carrito[productoIndex].cantidad > 1) {
            carrito[productoIndex].cantidad--; 
        } else {
            carrito.splice(productoIndex, 1);
        };
        
        cargarProductoCarrito(carrito);
        actualizarContadorCarrito(carrito);
        actualizarTotal(carrito);

        localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    };
    
    //Limpiar modal si carrito = 0
    if (carrito.length === 0) {
        carritoProducto.innerHTML = "";
    };
};

//Función total de la compra
const actualizarTotal = () => {
    const totalCalculado = carrito.reduce((acc, producto) => acc + (producto.productoAgregado.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
};

//Funcion comprar y vaciar carrito
const comprarCarrito = () => {
    if(carrito.length > 0) {
        carrito.length = 0;
        carritoProducto.innerHTML =  "";
    
        localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));

        actualizarContadorCarrito();
        actualizarTotal();

        Swal.fire({
            title: 'Su compra ha sido realizada con éxito!!',
            text: 'Esperamos que lo disfrute. Muchas gracias por su compra!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    };
};

//Función actualizar carrito guardado en LS
const actualizarCarritoLS = () => {
    const carritoLS = localStorage.getItem("productos-en-carrito");
    if (carritoLS) {
        carrito = JSON.parse(carritoLS);
        actualizarContadorCarrito();  
        cargarProductoCarrito();
}};

botonComprar.addEventListener("click", comprarCarrito);