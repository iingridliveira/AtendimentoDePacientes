import { patients } from "./script.js"; // Importa a lista de pacientes

function displayPatienTriage() {
  const triagemList = document.getElementById("triagem-list");
  const noPatientsMsg = document.getElementById("no-patients-msg");
  if (!triagemList || !noPatientsMsg) return; // Evita erro se não existir

  triagemList.innerHTML = "";

  if (patients.length === 0) {
    noPatientsMsg.style.display = "block";
    return;
  }

  noPatientsMsg.style.display = "none";

  patients.forEach((patient) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${patient.name} - Motivo: ${patient.reason}`;
    triagemList.appendChild(li);
  });
}

export { displayPatienTriage }; // Exporta a função para uso em outros módulos