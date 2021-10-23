let productos = JSON.parse(sessionStorage.getItem('productos'));
let precios = JSON.parse(sessionStorage.getItem('precios'));
let contador = 0;
let contadorDos = 0;
let subtotal = 0;
let precioParseado = [];

for (item of precios) {
    precioParseado.push(Number(item));
    contadorDos = contadorDos + 1;
    const TR = document.createElement(`tr`);
    TR.classList.add(`tr${contadorDos}`);

    const TDPRECIO = document.createElement('td');
    TDPRECIO.innerText = `$${item}`;
    TDPRECIO.classList.add('precio');
    
    $('tbody').prepend(TR);
    $(`.tr${contadorDos}`).prepend(TDPRECIO);
}

for (producto of productos) {
    contador = contador + 1;
    const TDNOMBRE = document.createElement('td');
    TDNOMBRE.innerHTML = producto;
    TDNOMBRE.classList.add('nombre');   
    
    $(`.tr${contador}`).prepend(TDNOMBRE);
}


precioParseado.forEach(function(a){subtotal += a;});
let precioTexto = document.getElementsByClassName('subtotal');
precioTexto[0].innerText = `$${subtotal}`;

total = subtotal * 1.21;
let precioTotalTexto = document.getElementsByClassName('total');
precioTotalTexto[0].innerHTML = `$${total}`

// const URLGET = 'https://jsonplaceholder.typicode.com/posts';
// let infoPost = { nombre: tiposDeProductos[0], marca: tiposDeMarca[0]}

// $('#comprar').click(() => {
//   $.post(URLGET, infoPost, (response, state) => {
//     if (state === 'success') {
//       $('body').append(`
//       <div class="textoApi">
//         <h3>Guardado: ${response.nombre} ${response.marca} </h3>
//       </div>
//       `)
//       // console.log(response)
//     }
//   })
// })