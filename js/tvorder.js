import { getTriagedPatients } from "./trige.js";
import { levelDot } from "./levelDot.js";

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
  const proximoPaciente = triagedPatients.find((p) => p.status === 0);


  triagedPatients
    .filter(
      (patient) =>
        patient.level === 1 || patient.level === 2 || patient.level === 3
    )
    .map((patient) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      
      const isProximo = proximoPaciente === patient;

      li.textContent = `${patient.name}  - Estado: ${isProximo ? "(Próximo)" : "" || patient.status === 1?"em atendimento" : ""}`;
      li.appendChild(levelDot(patient));
      ul.appendChild(li);
    });

  displayQueue.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", renderOrderedPatients);

export { renderOrderedPatients };
