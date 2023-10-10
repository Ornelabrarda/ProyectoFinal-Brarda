const mostrarProductos = () => {
    const contenedor = document.getElementById("producto-contenedor");

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.className ="col-md-4 mb-3";

        div.innerHTML =`
                    <div class="card product-wap rounded-0">    
                        <div class="card rounded-0">
                            <img class="card-img rounded-0 img-fluid" src="${producto.img}">                                                                        
                            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">                                       
                                <button id="${producto.id}" class="btn-agregar btn-success text-white mt-2"><i class="fas fa-cart-plus"></i>Agregar</button>
                            </div>    
                        </div>
                        <div class="card-body">
                        <p>${producto.nombre}<p>
                        <p>${producto.desc}</p>
                        <p class="text-center mb-0">$${producto.precio}</p>
                        </div>
                    </div>
        `;
        contenedor.appendChild(div);
    });
};

