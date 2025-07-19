const materias = [
  { nombre: "ALGEBRA Y TRIGONOMETRIA", creditos: 4, requisitos: [], abre: ["CALCULO DIFERENCIAL", "FISICA I"] },
  { nombre: "BIOLOGIA CELULAR Y MOLECULAR", creditos: 3, requisitos: [], abre: ["BIOQUIMICA I"] },
  { nombre: "Historia de la educación y la pedagogía", creditos: 2, requisitos: [], abre: ["ENFOQUES PEDAGOGICOS Y DESARROLLO CURRICULAR"] },
  { nombre: "INGLES I", creditos: 2, requisitos: [], abre: ["INGLES II"] },
  { nombre: "INTRODUCCION A LA QUIMICA", creditos: 3, requisitos: [], abre: ["FUNDAMENTOS DE QUIMICA"] },
  { nombre: "LECTURA CRITICA", creditos: 2, requisitos: [], abre: ["PRODUCCION TEXTUAL"] },
  { nombre: "RESOLUCION DE PROBLEMAS MATEMATICOS", creditos: 2, requisitos: [], abre: [] },

  { nombre: "CALCULO DIFERENCIAL", creditos: 4, requisitos: ["ALGEBRA Y TRIGONOMETRIA"], abre: ["CALCULO INTEGRAL", "ESTADISTICA"] },
  { nombre: "DESARROLLO HUMANO Y EDUCACION", creditos: 3, requisitos: [], abre: ["APRENDIZAJE E INTERVENCION PEDAGOGICA"] },
  { nombre: "FISICA I", creditos: 3, requisitos: ["ALGEBRA Y TRIGONOMETRIA"], abre: ["FISICA II"] },
  { nombre: "FUNDAMENTOS DE QUIMICA", creditos: 4, requisitos: ["INTRODUCCION A LA QUIMICA"], abre: ["QUIMICA INORGANICA"] },
  { nombre: "INGLES II", creditos: 2, requisitos: ["INGLES I"], abre: ["INGLES III"] },
  { nombre: "PRODUCCION TEXTUAL", creditos: 2, requisitos: ["LECTURA CRITICA"], abre: [] },
];

const estadoMaterias = {};
const malla = document.getElementById("malla");

materias.forEach(m => {
  const card = document.createElement("div");
  card.className = "materia bloqueada";
  card.id = m.nombre;
  card.innerHTML = `<strong>${m.nombre}</strong><br>${m.creditos} créditos`;
  card.onclick = () => aprobarMateria(m.nombre);
  malla.appendChild(card);
  estadoMaterias[m.nombre] = false;
});

function aprobarMateria(nombre) {
  if (estadoMaterias[nombre]) return;
  const materia = materias.find(m => m.nombre === nombre);
  const requisitosCumplidos = !materia.requisitos.length || materia.requisitos.every(r => estadoMaterias[r]);
  if (requisitosCumplidos) {
    estadoMaterias[nombre] = true;
    const card = document.getElementById(nombre);
    card.classList.remove("bloqueada");
    card.classList.add("aprobada");
    materia.abre.forEach(mAbre => {
      const cardAbre = document.getElementById(mAbre);
      if (cardAbre) cardAbre.classList.remove("bloqueada");
    });
  }
}
