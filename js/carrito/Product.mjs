import { htmlToElement } from "./Utils.mjs";

class Product {
    //Diseñamos la tarjeta de producto y asociamos los eventos
    static nuevoNodoProducto(titulo, img, cantidad, precio, carrito, callbackAumentar, callbackReducir, callbackEliminar) {
        var html = /*html*/`<div class="col-12 mb-3"> 
                                <div class="card shadow-sm"> 
                                    <div class="card-body d-flex align-items-center"> 
                                        <div class="col-md-4 text-center d-flex justify-content-end">
                                            <img src="${img}" class="img-fluid rounded" style="max-width: 80px;" alt="${titulo}">
                                        </div>
                                        <div class="col-md-4 d-flex flex-column">
                                            <h6 class="card-title mb-1">${titulo}</h6>
                                            <div class="d-flex align-items-center justify-content-center">
                                                <button type="button" class="btn btn-outline-secondary btn-sm me-2 aumentar">+1</button>
                                                <span class="badge bg-success rounded-pill me-2">${cantidad}</span>
                                                <button type="button" class="btn btn-outline-secondary btn-sm reducir">-1</button>
                                            </div>
                                         </div>
                                        <div class="col-md-4 d-flex align-items-center justify-content-start">
                                            <span class="badge bg-secondary rounded-pill m-2">${precio}€</span>
                                            <!--<div class="input-group input-group-sm me-2" style="max-width: 100px;">
                                                <input type="number" class="form-control text-center toValue" min="0" max="10" value="${cantidad}">
                                                <button type="button" class="btn btn-outline-secondary toValueButton">+</button>
                                            </div>-->
                                            <button type="button" class="btn btn-outline-danger btn-sm eliminar">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

        let nodo = htmlToElement(html);

        //Asocio eventos (pongo multiples tipos a modo de ejemplo). Esto se podría utilizar como callback si se quiere separar Product de ShoppingCart
        //SOLO DEJAR LOS QUE SE QUIERAN UTILIZAR
        nodo.querySelector(".aumentar").addEventListener("click", () => callbackAumentar(titulo, img, precio, nodo));
        nodo.querySelector(".reducir").addEventListener("click", () => callbackReducir(titulo, nodo));
        nodo.querySelector(".eliminar").addEventListener("click", () => callbackEliminar(titulo, nodo));

        //Activar uno u otro dependiendo se se quiere que se actualice el valor al interactuar con el input o al pulsar el botón
        // nodo.querySelector(".toValueButton").addEventListener("click",function () {
        //     carrito.carritoModificarValor(titulo,this.parentNode.parentNode.querySelector(".toValue").value);}
        // );
        //nodo.querySelector(".toValue").addEventListener("input",function () {carrito.carritoModificarValor(titulo,this.value)});

        return nodo;
    }

    static nuevoNodoProductoDesplegable(titulo, precio) {
        var html = /*html*/ `<li class="d-flex inline-flex align-items-center m-2 border-bottom border-secundary">
                                <span>${titulo}</span>
                                <span class="badge bg-secondary rounded-pill m-2">${precio}€</span>
                            </li>`;
        return htmlToElement(html);
    }
}

export { Product };