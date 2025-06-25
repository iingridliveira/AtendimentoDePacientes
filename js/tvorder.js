import { getTriagedPatients } from "./trige.js";
import {levelDot} from "./levelDot.js";

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
   
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${patient.name} - Motivo: ${patient.reason} - Nível: `;
    li.appendChild(levelDot(patient));
    ul.appendChild(li);

  
  });

  displayQueue.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", renderOrderedPatients);

export { renderOrderedPatients };
