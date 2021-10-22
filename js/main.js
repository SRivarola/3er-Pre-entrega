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

let productoDetallado;

class Productos {
  constructor(nombre, marca) {
    this.nombre = nombre;
    this.marca =marca;
  }
}

let productoYmarca = document.getElementsByClassName('tituloFoto');
let arrayDeProductos = [];

for (product of productoYmarca) {
  let nombre = product.innerHTML.split(' ')[0].toLowerCase();
  let marca = product.innerHTML.split(' ')[1].toLowerCase();
  productoDetallado = new Productos(nombre, marca);
  arrayDeProductos.push(productoDetallado);
}

$("#btnFiltrar").click(function filtrar(e) {
  e.preventDefault();
  let chequeado = $(".form-check-input:checked");
  let reset = document.getElementsByClassName('card');
  for(e of reset){
      e.style.display = "flex"
  }
  for (producto of tiposDeProductos) {
    if (chequeado[0].value != producto && chequeado[0].value != 'todos') {
      let productosClass = document.getElementsByClassName(producto);
      for (prod of productosClass) {
        prod.style.display = "none";
      }
    }
  } 
});

$('#btnBuscar').click(function buscar(e) {
  e.preventDefault();
  let buscado = document.getElementById('busqueda');
  let reset = document.getElementsByClassName("card");
  for (e of reset) {
      e.style.display = "flex"
  }

  if (tiposDeMarca.includes(buscado.value.toLowerCase())) {
    let filtroBuscado = arrayDeProductos.filter(x => x.marca != buscado.value.toLowerCase());
    for (prod of filtroBuscado) {
      let productosClass = document.querySelectorAll(`.${prod.marca}`);
      for (prod of productosClass) {
        prod.style.display = "none";
      }
    }
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

$('.dropdown-menu').on('click', function (e) {
  e.stopPropagation();
});


let contador = 0;
let contadorTr= 0;

$('.botonAgregar').click(function carrito(e) {
  e.preventDefault();
  
  let idBtn = $(this).attr('id');
  let nombre = document.getElementsByClassName(idBtn)[0].childNodes[1].innerHTML;
  let precio = (document.getElementsByClassName(idBtn)[0].childNodes[5].childNodes[1].innerHTML).split('+')[0];
  
  function contadorActivo() {
    contador = contador + 1;
    contadorTr = contadorTr + 1;
  }
  contadorActivo();

  const tr = document.createElement(`tr`);
  tr.classList.add(`tr${contadorTr}`);
  
  const tdNombre = document.createElement('td');
  tdNombre.innerText = nombre;

  const tdPrecio = document.createElement('td');
  tdPrecio.innerText = precio;
  tdPrecio.classList.add('precio');

  const tdBin = document.createElement('td');
  tdBin.classList.add(`bin${contadorTr}`,'eliminar');
  const boton = document.createElement('button');
  boton.id = `btnEliminar${contadorTr}`;
  boton.classList.add('btnEliminar');
  const bin = $(`<span class="iconify fotoBin" data-icon="bytesize:trash"></span>`);
  
  $('tbody').prepend(tr);
  $(`.tr${contadorTr}`).prepend(tdBin);
  $(`.bin${contadorTr}`).prepend(boton);
  $(`#btnEliminar${contadorTr}`).prepend(bin);
  $(`.tr${contadorTr}`).prepend(tdPrecio);
  $(`.tr${contadorTr}`).prepend(tdNombre);
  
  let arrayDePrecios = [];
  let total = 0;
  let precios = document.getElementsByClassName('precio');
  
  for (precio of precios) {
    arrayDePrecios.push(Number(precio.innerHTML));
  }

  arrayDePrecios.forEach(function(a){total += a;});
  let precioTexto = document.getElementsByClassName('subtotal');
  precioTexto[0].innerText = total;
  
  let totalMasIva = total * 1.21
  let precioMasIva = document.getElementsByClassName('total');
  precioMasIva[0].innerText = '$' + totalMasIva;
  
  let contEnCarrito = document.getElementById('contador');
  contEnCarrito.innerHTML = contador;
 
  $('.btnEliminar').click(function eliminar(e) {
    e.preventDefault();
    let btnElim = $(this).attr('id').split('');
    let num = btnElim[btnElim.length-1];
    let elim = document.getElementsByClassName(`tr${num}`)[0];
    elim.remove();
  
    contador = contador - 1;
    contEnCarrito.innerHTML = contador;
  
    console.log(precios)

    arrayDePrecios2 = [];

    for (precio of precios) {
      arrayDePrecios2.push(Number(precio.innerHTML));
    }

    let total2 = 0;
    arrayDePrecios2.forEach(function(a){total2 += a;});
    precioTexto[0].innerText = total2;

    let totalMasIva2 = total2 * 1.21
    precioMasIva[0].innerText = '$' + totalMasIva2;
  })
});



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

const URLGET = 'https://jsonplaceholder.typicode.com/posts';
let infoPost = { nombre: tiposDeProductos[0], marca: tiposDeMarca[0]}

$('#comprar').click(() => {
  $.post(URLGET, infoPost, (response, state) => {
    if (state === 'success') {
      $('body').append(`
      <div class="textoApi">
        <h3>Guardado: ${response.nombre} ${response.marca} </h3>
      </div>
      `)
      // console.log(response)
    }
  })
})

let API_KEY = "563492ad6f917000010000014113305811204c18a5be9c77787eded8";
let URL_PEXELS = "https://api.pexels.com/v1/search?query=ecommerce";


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

