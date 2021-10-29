let loguear = document.getElementById('logIn');
loguear.addEventListener('click', nombreEmpresa);

//Funciones para crear imputs y un boton en el dom.
function crearInput1(){
    const div = document.createElement('div');
    div.classList.add('col-md-2');
    div.id = 'div'
    const input = document.createElement('input');
    input.classList.add('form-control');
    input.id = 'validationDefault01'
    input.type = 'number';
    input.placeholder = '#ID del producto';
    input.setAttribute('required', '');
    document.getElementById('form2').appendChild(div);
    document.getElementById('div').appendChild(input);
}

function crearInput2(){
    const div = document.createElement('div');
    div.classList.add('col-md-3');
    div.id = 'div2'
    const input = document.createElement('input');
    input.classList.add('form-control');
    input.id = 'validationDefault02';
    input.type = 'text';
    input.placeholder = 'Nombre del producto';
    input.setAttribute('required', '');
    document.getElementById('form2').appendChild(div);
    document.getElementById('div2').appendChild(input);
}

function crearInput3(){
    const div = document.createElement('div');
    div.classList.add('col-md-3');
    div.id = 'div3'
    const input = document.createElement('input');
    input.classList.add('form-control');
    input.id = 'validationDefault03';
    input.type = 'number';
    input.placeholder = 'Precio de lista';
    input.setAttribute('required', '');
    document.getElementById('form2').appendChild(div);
    document.getElementById('div3').appendChild(input);
}

function crearBoton(){
    const div = document.createElement('div');
    div.classList.add('col-md-3');
    div.id = 'div4'
    const boton = document.createElement('button');
    boton.textContent = 'CARGAR';
    boton.classList.add('btn');
    boton.classList.add('btn-primary');
    boton.classList.add('botonForm');
    boton.id = 'btnCargar';
    boton.type = 'number';
    document.getElementById('form2').appendChild(div);
    document.getElementById('div4').appendChild(boton);
}

//Esta función crea una empresa cuando ponemos el nombre de la misma en el formulario y despliega otro formulario.
function nombreEmpresa(e){
    let nombreE = document.getElementById('nombreEmpresa').value;
    e.preventDefault();
    if(nombreE != ''){
        $('#logIn').fadeOut(800);
        let empresa = new Empresa(nombreE);
        const h2 = document.createElement('h2');
        h2.classList.add('tituloEmpresa');
        h2.textContent = `${nombreE}`;
        document.getElementById('empresa').appendChild(h2);
        
        const h3 = document.createElement('h3');
        h3.classList.add('textoForm');
        h3.textContent = 'Cargue sus Productos:';
        document.getElementById('empresa').appendChild(h3);

        crearInput1();      //desplegando el formilario
        crearInput2();
        crearInput3();
        crearBoton();

        $('#empresa').fadeIn(800, function() {
            $('#form2').slideDown(700, function() {
                $('.tituloEmpresa').css('color', 'brown');
                $('.tituloEmpresa').css('font-weight', 'bolder');
            })
        });

        empresa.cargarDeposito();

        let carga = document.getElementById('btnCargar');
        carga.addEventListener('click', cargarProducto)
        
        //Función para agregar los productos al dom y q los guarde en el local storage.
        function cargarProducto(e) {
            e.preventDefault();
            let id = document.getElementById('validationDefault01').value;
            let nombre = document.getElementById('validationDefault02').value.toUpperCase();
            let precio = parseFloat(document.getElementById('validationDefault03').value);
            let producto;
            if((id !='' && nombre != '' && precio != '')){
                producto = new Producto(id, nombre, precio);
                let arrayDeIds = [];
                let productosDelDeposito = JSON.parse(localStorage.getItem(nombreE));
                if(!productosDelDeposito){
                    localStorage.setItem(nombreE, JSON.stringify([producto]))
                    empresa.agregarProducto(producto);
                    empresa.mostrarProductos(producto);
                    arrayDeIds.push(producto.id);
                } else{
                    for (let prod of productosDelDeposito) {
                        arrayDeIds.push(prod.id);
                    }
                    if (arrayDeIds.includes(producto.id)) {
                        return Swal.fire('El producto ingresado ya existe');
                    } else {
                        empresa.agregarProducto(producto);
                        empresa.actualizarDeposito();
                        empresa.mostrarProductos(producto);
                    }
                }
            } else {
                return Swal.fire('Faltan DATOS');
            }
        }
    }
}


class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

//Clase y contructor para la empresa y sus metodos.
class Empresa {
    constructor(nombre){
        this.nombre = nombre;
        this.productos = [];
    }

    cargarDeposito() {
        const deposito = JSON.parse(localStorage.getItem(`${this.nombre}`));
        if(deposito != null) {
            this.productos.pushdeposito;
        } else {
            this.productos = [];
        }
    }

    agregarProducto(producto) {
        if(this.productos.find(producto => producto.id == document.getElementById('validationDefault01').value)) {
            return Swal.fire('El producto ingresado ya existe');
        } else {
            return this.productos.push(producto);
        }
    }

    actualizarDeposito() {
        localStorage.setItem(`${this.nombre}`, JSON.stringify(this.productos));
    }

    mostrarProductos(producto) {
        const div = document.createElement('div');
        div.appendChild(this.armarTarjeta(producto));
        document.getElementById('productosPorEmpresa').appendChild(div);
        $('.tarjeta').slideDown('slow');
    }

    armarTarjeta(producto) {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');
        tarjeta.style.display = 'none';
        
        const nombreProducto = document.createElement('h3');
        nombreProducto.textContent = `${producto.nombre}`;
        tarjeta.appendChild(nombreProducto);

        const idP = document.createElement('p');
        idP.textContent = `Id: ${producto.id}`;
        tarjeta.appendChild(idP);

        const precioP = document.createElement('p');
        precioP.textContent = `Precio: ${producto.precio}`;

        if(producto.precio <= 2000) {
            precioP.classList.add('costoBajo')
        } else if (producto.precio >= 6000) {
            precioP.classList.add('costoAlto')
        } else {
            precioP.classList.add('costoMedio')
        }

        tarjeta.appendChild(precioP);
        return tarjeta;
    }
}