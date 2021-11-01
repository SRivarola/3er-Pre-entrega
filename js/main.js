let tiposDeProductos = [
  "microondas",
  "licuadora",
  "procesadora",
  "secadora",
  "cortabarba",
];

let tiposDeMarca = [
  "phillips",
  "rca",
  "liliana",
  "revlon",
  "lg",
  "whirlpool",
  "oster",
  "ventaimportacion",
  "winco",
  "gama",
  "ducati",
  "remington",
];

// Clase de Productos y su constructor.
class Productos {
  constructor(nombre, marca) {
    this.nombre = nombre;
    this.marca = marca;
  }
}

let productoDetallado;
let productoYmarca = document.getElementsByClassName('tituloFoto');
let arrayDeProductos = [];

// Iteracion para crear el array de productos.
for (let product of productoYmarca) {
  let nombre = product.innerHTML.split(' ')[0].toLowerCase();
  let marca = product.innerHTML.split(' ')[1].toLowerCase();
  productoDetallado = new Productos(nombre, marca);
  arrayDeProductos.push(productoDetallado);
}

//Función para el boton FILTRAR segun tipo de producto
$("#btnFiltrar").click(function filtrar(e) {
  e.preventDefault();
  let chequeado = $(".form-check-input:checked");
  let reset = document.getElementsByClassName('card');
  for(e of reset){
      e.style.display = "flex"
  }
  for (let producto of tiposDeProductos) {
    if (chequeado[0].value != producto && chequeado[0].value != 'todos') {
      let productosClass = document.getElementsByClassName(producto);
      for (prod of productosClass) {
        prod.style.display = "none";
      }
    }
  } 
});

//Función para el boton BUSCAR, puede ser por marca o por nombre.
$('#btnBuscar').click(function buscar(e) {
  e.preventDefault();
  let buscado = document.getElementById('busqueda');
  let reset = document.getElementsByClassName("card");
  for (e of reset) {
      e.style.display = "flex"
  }
  //filtro por marca
  if (tiposDeMarca.includes(buscado.value.toLowerCase())) {
    let filtroBuscado = arrayDeProductos.filter(x => x.marca != buscado.value.toLowerCase());
    for (prod of filtroBuscado) {
      let productosClass = document.querySelectorAll(`.${prod.marca}`);
      for (prod of productosClass) {
        prod.style.display = "none";
      }
    }
  //filtro por nombre
  } else if (tiposDeProductos.includes(buscado.value.toLowerCase())) {
    let filtroBuscado = arrayDeProductos.filter(x => x.nombre != buscado.value.toLowerCase());
    for (prod of filtroBuscado) {
      let productosClass = document.querySelectorAll(`.${prod.nombre}`);
      for (prod of productosClass) {
        prod.style.display = "none";
      }
    }
  }
});

//evita que el dropdown se repliege al hacer click adentro.
$('.dropdown-menu').on('click', function (e) {
  e.stopPropagation();
});

let contador = 0;
let contadorTr= 0;

//Función para todos los botones AGREGAR.
$('.botonAgregar').click(function carrito(e) {
  e.preventDefault();
  
  contador = contador + 1;  //sirve para contar cuantos productos hay en el carrito y mostrarlo.
  contadorTr = contadorTr + 1;  //sirve como contador para algunos elementos que se agregan al dom.

  let idBtn = $(this).attr('id');
  let nombre = document.getElementsByClassName(idBtn)[0].childNodes[1].innerHTML;
  let precio = (document.getElementsByClassName(idBtn)[0].childNodes[5].childNodes[1].innerHTML).split('+')[0];
  
  //Creando todos los elementos necesarios para el dom.
  const TR = document.createElement(`tr`);
  TR.classList.add(`tr${contadorTr}`);
  
  const TDNOMBRE = document.createElement('td');
  TDNOMBRE.innerText = nombre;
  TDNOMBRE.classList.add('nombre');

  const TDPRECIO = document.createElement('td');
  TDPRECIO.innerText = precio;
  TDPRECIO.classList.add('precio');

  const TDBIN = document.createElement('td');
  TDBIN.classList.add(`bin${contadorTr}`,'eliminar');
  
  const BOTON = document.createElement('button');
  BOTON.id = `btnEliminar${contadorTr}`;
  BOTON.classList.add('btnEliminar');
  
  const BIN = $(`<span class="iconify fotoBin" data-icon="bytesize:trash"></span>`);
  
  //Agregando esos elementos al dom.
  $('tbody').prepend(TR);
  $(`.tr${contadorTr}`).prepend(TDBIN);
  $(`.bin${contadorTr}`).prepend(BOTON);
  $(`#btnEliminar${contadorTr}`).prepend(BIN);
  $(`.tr${contadorTr}`).prepend(TDPRECIO);
  $(`.tr${contadorTr}`).prepend(TDNOMBRE);
  
  let arrayDePrecios = [];
  let total = 0;
  let precios = document.getElementsByClassName('precio');
  
  //creando un array de precios.
  for (precio of precios) {
    console.log(precio.innerHTML.slice(1));

    arrayDePrecios.push(Number(precio.innerHTML.slice(1)));
  }
  //suma de precios para mostrar el total del costo.
  arrayDePrecios.forEach(function(a){total += a;});
  let precioTexto = document.getElementsByClassName('subtotal');
  precioTexto[0].innerText = total;
  
  let totalMasIva = total * 1.21
  let precioMasIva = document.getElementsByClassName('total');
  precioMasIva[0].innerText = '$' + totalMasIva;  //sumandole iva al total de la compra.
 
  let contEnCarrito = document.getElementById('contador');
  contEnCarrito.innerHTML = contador;  //agregando el contador al carrito.

  eliminarProducto();
 
});

function eliminarProducto () {
  $('.btnEliminar').click(function eliminar(e) {
    e.preventDefault();
    let btnElim = $(this).attr('id').split('');
    let num = btnElim[btnElim.length-1];
    let elim = document.getElementsByClassName(`tr${num}`)[0];
    elim.remove();
    
    let contEnCarrito = document.getElementById('contador');
    contador = contador - 1;
    contEnCarrito.innerHTML = contador;

    let arrayDePrecios2 = [];
    let precios = document.getElementsByClassName('precio');

    for (precio of precios) {
      arrayDePrecios2.push(Number(precio.innerHTML));
    }

    let total2 = 0;
    arrayDePrecios2.forEach(function(a){total2 += a;});
    let precioTexto = document.getElementsByClassName('subtotal');
    precioTexto[0].innerText = total2;

    let totalMasIva2 = total2 * 1.21
    let precioMasIva = document.getElementsByClassName('total');
    precioMasIva[0].innerText = '$' + totalMasIva2;
  })
}

//Función para vaciar el carrito y la suma de los productos.
$('#vaciarCarrito').click(function vaciar(e) {
  e.preventDefault();
  let precioTexto = document.getElementsByClassName('subtotal');
  let precioMasIva = document.getElementsByClassName('total');
  let contEnCarrito = document.getElementById('contador');
  let carrito = document.getElementsByTagName('tbody')[0];
  while(carrito.hasChildNodes())
   carrito.removeChild(carrito.firstChild);
  precioTexto[0].innerText = '';
  precioMasIva[0].innerText = '';
  contador = 0;
  contadorTr = 0;
  contEnCarrito.innerHTML = '';
})

class Carrito {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

$('#comprar').click(function compra(e) {
  e.preventDefault();
  let productosComprados = document.getElementsByClassName('nombre');
  let precioDeProductos = document.getElementsByClassName('precio');
  
  let prodcomp = [];
  let preprod = [];
  for (elemento of productosComprados) {
    let e = elemento.innerHTML;
    prodcomp.push(e);
  }
  for (elem of precioDeProductos) {
    let p = elem.innerHTML;
    preprod.push(p);
  }
  sessionStorage.setItem('productos', JSON.stringify(prodcomp));
  sessionStorage.setItem('precios', JSON.stringify(preprod));

  let tbody = $('tbody')[0];
  console.log(tbody.hasChildNodes('tr'))
  if (tbody.hasChildNodes('tr')) {
    window.location = './compra.html';
  } else {
    Swal.fire('Ud. no ha seleccionado nungún producto!');
  }
})

let API_KEY = "563492ad6f917000010000014113305811204c18a5be9c77787eded8";
let URL_PEXELS = "https://api.pexels.com/v1/search?query=ecommerce";
//Traigo unas imagenes de una api PEXELS y las muestro en el dom.
$.ajax({
  url: URL_PEXELS,
  type: "GET",
  headers: {
    Authorization: API_KEY,
  },
  success: function (response, state) {
    if (state === 'success') {
      // console.log(response)
      let img1 = document.createElement("img");
      img1.setAttribute("src", response.photos[0].src.medium);
      $(".foto1").append(img1);
      let img2 = document.createElement("img");
      img2.setAttribute("src", response.photos[1].src.medium);
      $(".foto2").append(img2);
      let img3 = document.createElement("img");
      img3.setAttribute("src", response.photos[2].src.medium);
      $(".foto3").append(img3);
    }
  },
});