import { patients } from "./script.js"; // Importa a lista de pacientes
import { levelDot } from "./levelDot.js";
function displayPatienTriage() {
  const triagemList = document.getElementById("triagem-list");
  const noPatientsMsg = document.getElementById("no-patients-msg");
  if (!triagemList || !noPatientsMsg) return; // Evita erro se não existir

  triagemList.innerHTML = ""; // Limpa a lista antes de exibir

  if (patients.length === 0) {
    noPatientsMsg.style.display = "block";
    return;
  }

  noPatientsMsg.style.display = "none";

  patients.filter((patient) => patient.level === 0).forEach((patient, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    const info = document.createElement("span");
    info.appendChild(
      document.createTextNode(
        `${patient.name} - Motivo: ${patient.reason} - Nível de triagem: `
      )
    );
    info.appendChild(levelDot(patient)); 

    // Botões de triagem
    const buttonRed = document.createElement("button");
    buttonRed.className = "btn btn-danger btn-sm me-1";
    buttonRed.textContent = "Vermelho";
    buttonRed.onclick = () => {
      patient.level = 3; // Exemplo: 3 para vermelho
      localStorage.setItem("patients", JSON.stringify(patients));
      displayPatienTriage();
    };

    const buttonYellow = document.createElement("button");
    buttonYellow.className = "btn btn-warning btn-sm me-1";
    buttonYellow.textContent = "Amarelo";
    buttonYellow.onclick = () => {
      patient.level = 2; // Exemplo: 2 para amarelo
      localStorage.setItem("patients", JSON.stringify(patients));
      displayPatienTriage();
    };

    const buttonGreen = document.createElement("button");
    buttonGreen.className = "btn btn-success btn-sm";
    buttonGreen.textContent = "Verde";
    buttonGreen.onclick = () => {
      patient.level = 1; // Exemplo: 1 para verde
      localStorage.setItem("patients", JSON.stringify(patients));
      displayPatienTriage();
    };

    // Container para os botões
    const btnGroup = document.createElement("div");
    btnGroup.appendChild(buttonRed);
    btnGroup.appendChild(buttonYellow);
    btnGroup.appendChild(buttonGreen);

    li.appendChild(info);
    li.appendChild(btnGroup);
    triagemList.appendChild(li);
  });
}
// Função para obter pacientes triados (ordenados por nível)
function getTriagedPatients() {
  // Busca sempre do localStorage para garantir que está atualizado
  const savedPatients = localStorage.getItem("patients");
  const patients = savedPatients ? JSON.parse(savedPatients) : [];
  return [...patients].sort((a, b) => b.level - a.level);
}


export { displayPatienTriage, getTriagedPatients}; 
