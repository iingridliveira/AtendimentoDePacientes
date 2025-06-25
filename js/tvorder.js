import { getTriagedPatients } from "./trige.js";

function renderOrderedPatients() {
  const displayQueue = document.getElementById("display-queue");
  if (!displayQueue) return;

  displayQueue.innerHTML = "";

  const triagedPatients = getTriagedPatients();

  if (triagedPatients.length === 0) {
    displayQueue.innerHTML = "<p>Nenhum paciente na fila.</p>";
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "list-group";

  triagedPatients.forEach((patient) => {
    const levelDot = document.createElement("span");
    levelDot.className = "ms-2 rounded-circle d-inline-block align-middle";
    levelDot.style.width = "16px";
    levelDot.style.height = "16px";
    if (patient.level === 1) {
      levelDot.classList.add("bg-success");
    } else if (patient.level === 2) {
      levelDot.classList.add("bg-warning");
    } else if (patient.level === 3) {
      levelDot.classList.add("bg-danger");
    } else {
      levelDot.classList.add("bg-secondary");
    }
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${patient.name} - Motivo: ${patient.reason} - Nível: `;
    li.appendChild(levelDot);
    ul.appendChild(li);

   


    // Cor da bolinha usando classes Bootstrap
  
  });

  displayQueue.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", renderOrderedPatients);

export { renderOrderedPatients };
