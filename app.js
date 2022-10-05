
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})



stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

    
    const boton = document.getElementById(`agregar${producto.id}`)
    
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})


//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {

    // AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    actualizarCarrito() 
    /* alert("a ingresado un producto"); */
    Swal.fire(
        'Se ha agregado tu compra al carrito!',
        'Haz click en el botón!',
        'success'
      )
}




const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach ( (prod) => {
        const div = document.createElement ('div')
        div.className = ('productoEnCarrito') 
        div.innerHTML = ` 
            <p>${prod.nombre}</p>
            <p>Precio:$ ${prod.precio} </p>
            <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
            
            </button>`;
        contenedorCarrito.appendChild (div)
        

            localStorage.setItem ('carrito', JSON.stringify(carrito))  
} ,
        contadorCarrito.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad,0),
        precioTotal.innerText = carrito.reduce ((acc, producto) => acc + producto.precio*producto.cantidad, 0)
)}



