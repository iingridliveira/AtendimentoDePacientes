import { patients } from "./script.js";


function getTriagedPatients() {
 
  const savedPatients = localStorage.getItem("patients");
  const patients = savedPatients ? JSON.parse(savedPatients) : [];
  return [...patients].sort((a, b) => b.level - a.level);
}

// Função para exibir a triagem na tela
function displayPatienTriage() {
  const triagemList = document.getElementById("triagem-list");
  const noPatientsMsg = document.getElementById("no-patients-msg");
  if (!triagemList || !noPatientsMsg) return;

  triagemList.innerHTML = "";

  const triagedPatients = getTriagedPatients();

  if (triagedPatients.length === 0) {
    noPatientsMsg.style.display = "block";
    return;
  }

  noPatientsMsg.style.display = "none";

  triagedPatients.forEach((patient) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    // Texto do paciente
    const info = document.createElement("span");
    info.textContent = `${patient.name} - Motivo: ${patient.reason} - Nível de triagem: ${patient.level}`;

    // Botões de triagem
    const buttonRed = document.createElement("button");
    buttonRed.className = "btn btn-danger btn-sm me-1";
    buttonRed.textContent = "Vermelho";
    buttonRed.onclick = () => {
      patient.level = 3;
      localStorage.setItem("patients", JSON.stringify(patients));
      displayPatienTriage();
    };

    const buttonYellow = document.createElement("button");
    buttonYellow.className = "btn btn-warning btn-sm me-1";
    buttonYellow.textContent = "Amarelo";
    buttonYellow.onclick = () => {
      patient.level = 2;
      localStorage.setItem("patients", JSON.stringify(patients));
      displayPatienTriage();
    };

    const buttonGreen = document.createElement("button");
    buttonGreen.className = "btn btn-success btn-sm";
    buttonGreen.textContent = "Verde";
    buttonGreen.onclick = () => {
      patient.level = 1;
      localStorage.setItem("patients", JSON.stringify(patients));
      displayPatienTriage();
    };

    const btnGroup = document.createElement("div");
    btnGroup.appendChild(buttonRed);
    btnGroup.appendChild(buttonYellow);
    btnGroup.appendChild(buttonGreen);

    li.appendChild(info);
    li.appendChild(btnGroup);
    triagemList.appendChild(li);
  });
}

export { displayPatienTriage, getTriagedPatients };
