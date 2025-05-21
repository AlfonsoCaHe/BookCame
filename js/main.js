import { ShoppingCart } from "./carrito/ShoppingCart.mjs";
import { Product } from "./carrito/Product.mjs";

window.addEventListener("load", init);

var $botonModo;
var $link;
var $logo;
var modo_oscuro;

var $anadir;
var $eliminar;

var $boton_subir;
var $traduccion;
var $menu_traducciones;

//Variables del carrito
let carrito;
let queryDesplegable = ".carritoDesplegable";
let queryDesplegado = ".carritoDesplegado";

//Variables de la página de compra
let $cuerpoCompra;

//Modal
let modal;

function init() {
    $botonModo = document.getElementById("boton_modo");
    $link = document.getElementById("estilo_css");
    $logo = document.getElementById("logo");

    $botonModo.addEventListener("click", modoOscuro);
    modo_oscuro = false;

    $traduccion = document.getElementById("boton_traduccion");
    $traduccion.addEventListener("click", traducciones);

    $menu_traducciones = document.getElementById("menu_traducciones");

    if (document.title === "Landing Page") {
        cargarObservadores();
        window.addEventListener("scroll", botonSubir);
    }

    if (document.title === "Landing Page") {//Solo si son Landing Page o index.html
        $boton_subir = document.getElementById("boton_subir");
        $boton_subir.addEventListener("click", subir);
    }

    modal = new bootstrap.Modal(document.getElementById("exampleModal"));

    initCarrito();
}

function modoOscuro() {
    if (modo_oscuro) {
        $link.setAttribute("href", "./css/estilos_bootstrap.css");
        $logo.setAttribute("src", "./Iconos Bootstrap/LOGO Book Came SIN FONDO.svg");
        modo_oscuro = false;
        if (document.title === "Ficha Libro") {
            $anadir.setAttribute("src", "./Iconos Bootstrap/anadir.svg");
            $eliminar.setAttribute("src", "./Iconos Bootstrap/eliminar.svg");
        }
    } else {
        $link.setAttribute("href", "./css/modo_oscuro_bootstrap.css");
        $logo.setAttribute("src", "./Iconos Bootstrap/LOGO Book Came MODO OSCURO SIN FONDO.svg");
        modo_oscuro = true;
        if (document.title === "Ficha Libro") {
            $anadir.setAttribute("src", "./Iconos Bootstrap/anadir_modo_oscuro.svg");
            $eliminar.setAttribute("src", "./Iconos Bootstrap/eliminar_modo_oscuro.svg");
        }
    }
}

function saltar() {
    document.querySelector("footer").scrollIntoView({ behavior: "smooth", block: "start" });
}

function subir() {
    document.querySelector("main").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("keydown", function (event) {
    console.log(event.code);
    if (event.code === "KeyF") {
        saltar();
    }
    if (event.code === "KeyP") {
        subir();
    }
});

function traducciones() {
    $menu_traducciones.classList.toggle("oculto");
}

/* Para el elemento impar */
function cargarObservadores() {
    let observerImpar = new IntersectionObserver(observarImpar, {});

    observerImpar.observe(document.getElementById("impar"));

    function observarImpar(e) {
        let $impar = document.getElementById("impar")
        if (e[0].isIntersecting) {
            $impar.classList.add("animacion_impar");
        } else {
            $impar.classList.remove("animacion_impar");
        }
    }

    /* Para el elemento par */
    let observerPar = new IntersectionObserver(observarPar, {});

    observerPar.observe(document.getElementById("par"));

    function observarPar(e) {
        let $par = document.getElementById("par")
        if (e[0].isIntersecting) {
            $par.classList.add("animacion_par");
        } else {
            $par.classList.remove("animacion_par");
        }
    }
}

/* Para el elemento subir */
function botonSubir() {
    let $botonSubir = document.getElementById("boton_subir");

    if (window.scrollY > 120) {
        $botonSubir.classList.remove("oculto");
    } else {
        $botonSubir.classList.add("oculto");
    }
}

//CARRITO
function initCarrito() {

    if (document.title === "Ficha Libro" || document.title === "Búsqueda Libro") {//Solo si es la ficha del libro o la búsqueda
        $anadir = document.querySelectorAll(".anadir");
        for (let a of $anadir) {
            a.addEventListener("click", anadirCarrito);
        }
        $eliminar = document.querySelectorAll(".eliminar");
        for (let e of $eliminar) {
            e.addEventListener("click", reducirCarrito);
        }
    }

    carrito = new ShoppingCart();

    console.log(document.title);
    //Carrito desplegable
    if (document.title != "Carrito") {
        document.querySelector(queryDesplegable).addEventListener("mouseenter", mostrarCarrito);
        document.querySelector(queryDesplegable).addEventListener("mouseleave", ocultarCarrito);
    } else {
        $cuerpoCompra = document.getElementById("carro_compra");
        cargarPaginaCarrito();
    }
}


//Carrito desplegable
function mostrarCarrito() {
    let nodo = document.querySelector(queryDesplegado);
    actualizarDesplegable(nodo, carrito.carritoActual);
    if (nodo.childElementCount < 1) {
        return;
    }
    nodo.style.display = "block";
}

function ocultarCarrito() {
    document.querySelector(queryDesplegado).style.display = "none"
}

function actualizarDesplegable(nodo, carritoActual) {
    var carritoDespl = nodo;
    while (carritoDespl.firstChild) carritoDespl.removeChild(carritoDespl.firstChild);

    let desplegados = 0;
    for (let [key, datosProducto] of carritoActual) {
        if (desplegados < 3) {//Para que solo despliegue 3 libros
            let nodoProducto = Product.nuevoNodoProductoDesplegable(datosProducto.titulo, datosProducto.precio);
            carritoDespl.appendChild(nodoProducto);
            desplegados++;
        }
    }
    if (desplegados > 0) {
        var botonCarro = document.createElement("div");
        botonCarro.className = "d-flex justify-content-center align-items-center";
        var enlace = document.createElement("a");
        enlace.className = "btn btn-secondary border border-succes p-1 button";
        enlace.href = "./carrito.html";
        enlace.textContent = "Ir al carrito";
        botonCarro.appendChild(enlace);
        carritoDespl.appendChild(botonCarro);
    }
}

function anadirCarrito() {
    carrito.carritoAumentar(this.dataset.nombre, this.dataset.img, this.dataset.precio);
    let nodo = document.querySelector(queryDesplegado);
    actualizarDesplegable(nodo, carrito.carritoActual);
}

function reducirCarrito() {
    let nodo = document.querySelector(queryDesplegado);
    let titulo = this.dataset.nombre;

    // console.log("reducirCarrito");
    carrito.carritoReducir(titulo);
    actualizarDesplegable(nodo, carrito.carritoActual);

    if (nodo.childElementCount < 1) {
        nodo.innerHTML = "";
    }
}

// Se utilizaba en la versión que la cesta añadía y reducía elementos
// function mostrarModal(titulo){
//     document.querySelector(".close").addEventListener("click", () => {modal.hide()});
//     document.getElementById("exampleModalLabel").textContent = titulo;
//     document.querySelector(".modal-body").textContent = ("¿Desea realmente eliminar " + titulo + " del carrito?");

//     let cancelar_modal = document.getElementById("cancelar_modal");
//     let boton_aceptar = document.getElementById("boton_aceptar");

//     modal.show();

//     cancelar_modal.addEventListener("click", () =>{
//         modal.hide();
//     })

//     boton_aceptar.addEventListener("click", () =>{
//         carrito.carritoReducir(titulo);
//         modal.hide();
//         actualizarDesplegable(nodo, carrito.carritoActual);
//     })
// }

function mostrarModalEliminar(titulo, nodo) {
    document.querySelector(".close").addEventListener("click", () => { modal.hide() });
    document.getElementById("exampleModalLabel").textContent = titulo;
    document.querySelector(".modal-body").textContent = ("¿Desea realmente eliminar " + titulo + " del carrito?");

    let cancelar_modal = document.getElementById("cancelar_modal");
    let boton_aceptar = document.getElementById("boton_aceptar");

    modal.show();

    cancelar_modal.addEventListener("click", () => {
        modal.hide();
    })

    boton_aceptar.addEventListener("click", () => {
        carrito.carritoEliminar(titulo);
        modal.hide();
        actualizarDesplegable(nodo, carrito.carritoActual);
    })
}

function anadirCarritoCallback(titulo, img, precio, nodo) {
    carrito.carritoAumentar(titulo, img, precio);
    $cuerpoCompra.innerHTML = "";
    cargarPaginaCarrito();
}

function reducirCarritoCallback(titulo, nodo) {
    //console.log(nodo.children[0].children[0].children[1].children[1].children[1].textContent);
    if (nodo.children[0].children[0].children[1].children[1].children[1].textContent - 1 < 1) {
        mostrarModalEliminarCarrito(titulo, nodo);
    } else {
        carrito.carritoReducir(titulo);
        $cuerpoCompra.innerHTML = "";
        cargarPaginaCarrito();
    }

    if (nodo.childElementCount < 1) {
        nodo.innerHTML = "";
    }
}

function mostrarModalEliminarCarrito(titulo, nodo) {
    document.querySelector(".close").addEventListener("click", () => { modal.hide() });
    document.getElementById("exampleModalLabel").textContent = titulo;
    document.querySelector(".modal-body").textContent = ("¿Desea realmente eliminar " + titulo + " del carrito?");

    let cancelar_modal = document.getElementById("cancelar_modal");
    let boton_aceptar = document.getElementById("boton_aceptar");

    modal.show();

    cancelar_modal.addEventListener("click", () => {
        modal.hide();
    })

    boton_aceptar.addEventListener("click", () => {
        carrito.carritoEliminar(titulo);
        modal.hide();
        $cuerpoCompra.innerHTML = "";
        cargarPaginaCarrito();
    })
}

//Página del carrito
function cargarPaginaCarrito() {
    let localStorageCarrito = carrito.getCart();
    if (localStorageCarrito.size < 1) {
        let vacio = document.createElement("div");
        vacio.className = "border-primary border p-1 color_borde";
        vacio.textContent = "No hay elementos que mostrar";
        $cuerpoCompra.appendChild(vacio);
    } else {
        let importe = 0;
        let importeTotal = document.createElement("div");
        importeTotal.className = "border-primary border p-1 color_borde text-end rounded";
        for (let [titulo, libro] of localStorageCarrito) {
            let nuevoNodo = Product.nuevoNodoProducto(libro.titulo, libro.img, libro.cantidad, libro.precio, carrito, anadirCarritoCallback, reducirCarritoCallback, mostrarModalEliminarCarrito);
            $cuerpoCompra.appendChild(nuevoNodo);
            importe += libro.cantidad * libro.precio;
        }
        importeTotal.textContent = "Importe Total: " + importe.toFixed(2) + "€";
        $cuerpoCompra.appendChild(importeTotal);
    }
}
