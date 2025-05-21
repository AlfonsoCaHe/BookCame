export class ShoppingCart {
    key;
    carritoActual;
    constructor(key="carrito") {
        this.key=key;
        this.carritoActual=this.getCart();
    }

    //Uso del local storage
    getCart() {
        let carritoMemoria = localStorage.getItem(this.key);
        if (carritoMemoria == null) {
            return new Map();
        } else {
            const parsedCart = JSON.parse(carritoMemoria);
            const carritoMap = new Map();
            for (const nombre in parsedCart) {
                if (parsedCart.hasOwnProperty(nombre)) {
                    carritoMap.set(nombre, parsedCart[nombre]);
                }
            }
            return carritoMap;
        }
    }

    updateLocalStorage(){
        localStorage.setItem(this.key, JSON.stringify(Object.fromEntries(this.carritoActual)));
    }

    //Getters
    getNumberElementInCarrito(name) {
        return this.carritoActual.has(name) ? this.carritoActual.get(name).cantidad : 0;
    }

    //Metodos de establecer info

    carritoAumentar(nombre, img, precio){
        if(this.carritoActual.get(nombre)){
            const entradaCarrito = this.carritoActual.get(nombre);
            const cantidad = (entradaCarrito.cantidad || 0) + 1;
            this.carritoActual.set(nombre, { titulo: nombre, img: img, cantidad: cantidad, precio: precio});
        } else {
            this.carritoActual.set(nombre, { titulo: nombre, img: img, cantidad: 1, precio: precio });
        }
        this.updateLocalStorage();
    }

    carritoReducir(nombreLibro) {
        if(!this.carritoActual.get(nombreLibro)){
            return;
        }
        const entradaCarrito = this.carritoActual.get(nombreLibro);
        let nuevaCantidad = entradaCarrito.cantidad - 1;
        if (nuevaCantidad > 0) {
            this.carritoActual.set(nombreLibro, { ...entradaCarrito, cantidad: nuevaCantidad });
        } else {
            this.carritoActual.delete(nombreLibro);
        }
        this.updateLocalStorage();
    }

    carritoEliminar(nombreLibro) {
        this.carritoActual.delete(nombreLibro);
        this.updateLocalStorage();
    }

    // carritoModificarValor(nombreLibro, value) {
    //     if (value > 0) {
    //         this.carritoActual.set(nombreLibro, value);
    //     } else {
    //         this.carritoActual.delete(nombreLibro);
    //     }
    //     this.updateLocalStorage();
    // }
}