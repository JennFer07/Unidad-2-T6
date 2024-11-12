class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.derecha = null;
        this.izquierda = null;
    }
}

class Arbol {
    constructor() {
        this.ruta = null;
    }

    isEmpty() {
        return this.ruta === null;
    }

    add(valor) {
        if (this.isEmpty()) {
            this.ruta = new Nodo(valor);
            return;
        }

        let aux = this.ruta;

        while (aux) {
            if (valor < aux.valor) {
                if (aux.izquierda) {
                    aux = aux.izquierda;
                } else {
                    aux.izquierda = new Nodo(valor);
                    return;
                }
            } else {
                if (aux.derecha) {
                    aux = aux.derecha;
                } else {
                    aux.derecha = new Nodo(valor);
                    return;
                }
            }
        }
    }

    mostrar() {
        let resultado = [];
        this._inOrden(this.ruta, resultado);
        return resultado;
    }

    _inOrden(nodo, resultado) {
        if (nodo !== null) {
            this._inOrden(nodo.izquierda, resultado);
            resultado.push(nodo.valor);
            this._inOrden(nodo.derecha, resultado);
        }
    }

    buscar(valor) {
        let aux = this.ruta;
        while (aux) {
            if (valor === aux.valor) {
                return aux; 
            } else if (valor < aux.valor) {
                aux = aux.izquierda;
            } else {
                aux = aux.derecha;
            }
        }
        return null; 
    }

    eliminar(valor) {
        this.ruta = this._eliminarNodo(this.ruta, valor);
    }

    _eliminarNodo(nodo, valor) {
        if (nodo === null) {
            return nodo; 
        }

        if (valor < nodo.valor) {
            nodo.izquierda = this._eliminarNodo(nodo.izquierda, valor);
        } else if (valor > nodo.valor) {
            nodo.derecha = this._eliminarNodo(nodo.derecha, valor);
        } else {
            if (nodo.izquierda === null && nodo.derecha === null) {
                return null;
            } else if (nodo.izquierda === null) {
                return nodo.derecha;
            } else if (nodo.derecha === null) {
                return nodo.izquierda;
            } else {
                let sucesor = this._minimo(nodo.derecha);
                nodo.valor = sucesor.valor;
                nodo.derecha = this._eliminarNodo(nodo.derecha, sucesor.valor);
            }
        }
        return nodo;
    }

    _minimo(nodo) {
        let actual = nodo;
        while (actual.izquierda !== null) {
            actual = actual.izquierda;
        }
        return actual;
    }
}

let arbol = new Arbol();
arbol.add(50);
arbol.add(60);
arbol.add(70);
arbol.add(40);
arbol.add(30);
arbol.add(20);
arbol.add(80);

console.log("Árbol antes de eliminar 40:");
console.log(arbol.mostrar(40));

console.log("Buscar 40 en el árbol:");
let encontrado = arbol.buscar(40);
console.log(encontrado ? `Valor encontrado: ${encontrado.valor}` : "Valor no encontrado");

console.log("Eliminar 40:");
arbol.eliminar(40);
console.log("Árbol después de eliminar 40:");
console.log(arbol.mostrar(40));

console.log("Buscar 40 después de eliminar:");
let encontradoEliminado = arbol.buscar(40);
console.log(encontradoEliminado ? `Valor encontrado: ${encontradoEliminado.valor}` : "Valor no encontrado");