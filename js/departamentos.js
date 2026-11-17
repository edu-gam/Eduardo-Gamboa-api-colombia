
// URL DE LA API

const API_URL = "https://api-colombia.com/api/v1/Department";


// SELECCIONAR ELEMENTOS DEL HTML

const contenedor = document.getElementById("contenedorDepartamentos");

const mensajeCarga = document.getElementById("mensajeCarga");

const totalDepartamentos = document.getElementById("totalDepartamentos");

const totalRegiones = document.getElementById("totalRegiones");


// FUNCION PARA OBTENER LOS DEPARTAMENTOS

function obtenerDepartamentos() {

    fetch(API_URL)

        .then(response => {

            if (!response.ok) {
                throw new Error("Error al obtener los departamentos");
            }

            return response.json();

        })

        .then(datos => {

            // OCULTAR MENSAJE DE CARGA

            mensajeCarga.textContent = "";

            // ACTUALIZAR TOTAL DE DEPARTAMENTOS

            totalDepartamentos.textContent = datos.length;

            // CONTAR REGIONES

            let regiones = [];

            datos.forEach(departamento => {

                if (departamento.region && departamento.region.name) {

                    if (!regiones.includes(departamento.region.name)) {

                        regiones.push(departamento.region.name);

                    }

                }

            });

            totalRegiones.textContent = regiones.length;


            // MOSTRAR DEPARTAMENTOS

            datos.forEach(departamento => {

                // CREAR TARJETA

                const tarjeta = document.createElement("div");

                tarjeta.classList.add("card");


                // CREAR NOMBRE

                const nombre = document.createElement("h3");

                nombre.textContent = departamento.name;


                // CREAR REGION

                const region = document.createElement("p");

                region.textContent = "Región: " +
                    (departamento.region?.name || "No disponible");


                // CREAR POBLACION

                const poblacion = document.createElement("p");

                poblacion.textContent = "Población: " +
                    (departamento.population || "No disponible").toLocaleString("es-CO");


                // CREAR SUPERFICIE

                const superficie = document.createElement("p");

                superficie.textContent = "Superficie: " +
                    (departamento.surface || "No disponible") + " km²";


                // CREAR DESCRIPCION

                const descripcion = document.createElement("p");

                descripcion.textContent = departamento.description
                    ? departamento.description.substring(0, 180) + "..."
                    : "Descripción no disponible";


                // AGREGAR ELEMENTOS A LA TARJETA

                tarjeta.appendChild(nombre);

                tarjeta.appendChild(region);

                tarjeta.appendChild(poblacion);

                tarjeta.appendChild(superficie);

                tarjeta.appendChild(descripcion);


                // AGREGAR TARJETA AL CONTENEDOR

                contenedor.appendChild(tarjeta);

            });

        })

        .catch(error => {

            mensajeCarga.textContent =
                "No fue posible cargar los departamentos. Intenta nuevamente.";

            console.log("Error:", error);

        });

}


// EJECUTAR FUNCION

obtenerDepartamentos();
