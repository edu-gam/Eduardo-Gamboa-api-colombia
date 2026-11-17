// DIRECCIÓN DE LA API
const url = "https://api-colombia.com/api/v1/TypicalDish";

// IMAGEN DE RESPALDO DESDE INTERNET
const imagenRespaldo = "https://images.unsplash.com/photo-1644753787071-8933b5daed2d?auto=format&fit=crop&fm=jpg&q=80&w=1000";

// CONTENEDORES DEL HTML
const contenedor = document.getElementById("contenedorPlatos");
const mensajeCarga = document.getElementById("mensajeCarga");
const totalPlatos = document.getElementById("totalPlatos");

// CONSULTAR LA API
fetch(url)

    .then(function(respuesta) {

        // COMPROBAR SI LA RESPUESTA FUE CORRECTA
        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los platos");
        }

        return respuesta.json();
    })

    .then(function(datos) {

        // OCULTAR MENSAJE DE CARGA
        mensajeCarga.textContent = "";

        // MOSTRAR TOTAL DE PLATOS
        totalPlatos.textContent = datos.length;

        // RECORRER LOS PLATOS
        datos.forEach(function(plato) {

            // CREAR TARJETA
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("card");

            // CREAR CONTENEDOR DE IMAGEN
            const contenedorImagen = document.createElement("div");
            contenedorImagen.classList.add("dish-image");

            // CREAR IMAGEN
            const imagen = document.createElement("img");
            imagen.alt = plato.name || "Plato típico colombiano";

            // COMPROBAR SI EL PLATO TIENE IMAGEN
            let usandoImagenRespaldo = false;

            if (plato.imageUrl) {
                imagen.src = plato.imageUrl;
            } else {
                imagen.src = imagenRespaldo;
                usandoImagenRespaldo = true;
            }

            // SI LA IMAGEN NO FUNCIONA, USAR LA DE RESPALDO
            imagen.onerror = function() {

                if (!usandoImagenRespaldo) {

                    usandoImagenRespaldo = true;
                    imagen.src = imagenRespaldo;

                } else {

                    imagen.remove();
                    contenedorImagen.textContent = "Imagen no disponible";

                }

            };

            // AGREGAR IMAGEN AL CONTENEDOR
            contenedorImagen.appendChild(imagen);

            // NOMBRE DEL PLATO
            const titulo = document.createElement("h3");
            titulo.textContent = plato.name || "Nombre no disponible";

            // DESCRIPCIÓN
            const descripcion = document.createElement("p");
            descripcion.textContent = plato.description || "Sin descripción disponible";

            // DEPARTAMENTO
            const departamento = document.createElement("p");

            let nombreDepartamento = "No disponible";

            if (plato.department && plato.department.name) {
                nombreDepartamento = plato.department.name;
            }

            departamento.innerHTML = "<strong>Departamento:</strong> " + nombreDepartamento;

            // INGREDIENTES
            const ingredientes = document.createElement("p");
            ingredientes.innerHTML = "<strong>Ingredientes:</strong> " +
                (plato.ingredients || "No disponibles");

            // AGREGAR ELEMENTOS A LA TARJETA
            tarjeta.appendChild(contenedorImagen);
            tarjeta.appendChild(titulo);
            tarjeta.appendChild(descripcion);
            tarjeta.appendChild(departamento);
            tarjeta.appendChild(ingredientes);

            // AGREGAR TARJETA AL CONTENEDOR
            contenedor.appendChild(tarjeta);

        });

    })

    .catch(function(error) {

        // MOSTRAR MENSAJE SI OCURRE UN ERROR
        mensajeCarga.textContent = "Ocurrió un error al cargar los platos típicos.";

        console.log("Error:", error);

    });