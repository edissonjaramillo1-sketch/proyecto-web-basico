// Datos simulados (como si vinieran de una API)
const catalogo = [
  { id: 101, nombre: "HTML Básico", categoria: "Frontend", nivel: "Inicial", horas: 6 },
  { id: 102, nombre: "CSS Flexbox y Grid", categoria: "Frontend", nivel: "Intermedio", horas: 8 },
  { id: 103, nombre: "JavaScript Fundamentos", categoria: "Frontend", nivel: "Inicial", horas: 10 },
  { id: 201, nombre: "Git y GitHub", categoria: "DevTools", nivel: "Inicial", horas: 5 },
  { id: 202, nombre: "XAMPP y Servidor Local", categoria: "Backend", nivel: "Inicial", horas: 4 },
  { id: 301, nombre: "FastAPI Intro", categoria: "Backend", nivel: "Intermedio", horas: 9 }
];

let datosCargados = []; // aquí guardamos lo que "cargamos"
let datosFiltrados = [];

const btnCargar = document.getElementById("btnCargar");
const btnLimpiar = document.getElementById("btnLimpiar");
const buscador = document.getElementById("buscador");
const contenedor = document.getElementById("contenedor");
const estado = document.getElementById("estado");
const kpiTotal = document.getElementById("kpiTotal");
const kpiFiltrados = document.getElementById("kpiFiltrados");

function nowStr(){
  const d = new Date();
  return d.toLocaleString();
}

function setEstado(texto){
  estado.textContent = `Estado: ${texto} (${nowStr()})`;
}

function render(lista){
  contenedor.innerHTML = "";

  if(lista.length === 0){
    contenedor.innerHTML = `<p><small>No hay resultados para mostrar.</small></p>`;
    kpiFiltrados.textContent = "0";
    return;
  }

  lista.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <h3>${item.nombre}</h3>
      <small>ID: ${item.id} • ${item.nivel} • ${item.horas}h</small><br/>
      <span class="tag">${item.categoria}</span>
    `;
    contenedor.appendChild(div);
  });

  kpiFiltrados.textContent = String(lista.length);
}

function aplicarFiltro(){
  const q = buscador.value.trim().toLowerCase();
  if(q === ""){
    datosFiltrados = [...datosCargados];
  } else {
    datosFiltrados = datosCargados.filter(x =>
      x.nombre.toLowerCase().includes(q) ||
      x.categoria.toLowerCase().includes(q)
    );
  }
  render(datosFiltrados);
}

btnCargar.addEventListener("click", () => {
  // Simulamos "cargar datos"
  datosCargados = [...catalogo];
  datosFiltrados = [...datosCargados];

  console.log("Datos cargados:", datosCargados);
  setEstado("Datos cargados correctamente");
  kpiTotal.textContent = String(datosCargados.length);
  buscador.value = "";
  render(datosFiltrados);
});

btnLimpiar.addEventListener("click", () => {
  datosCargados = [];
  datosFiltrados = [];
  buscador.value = "";
  kpiTotal.textContent = "0";
  kpiFiltrados.textContent = "0";
  setEstado("Sin cargar");
  contenedor.innerHTML = "";
  console.log("Catálogo limpiado");
});

buscador.addEventListener("input", aplicarFiltro);

// Estado inicial
setEstado("Sin cargar");
console.log("Mini App lista. Presiona 'Cargar datos'.");