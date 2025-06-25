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
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    // Texto do paciente
    const info = document.createElement("span");
    info.textContent = `${patient.name} - Motivo: ${patient.reason} - Nível de triagem: ${patient.level}`;

    // Botões de triagem
    const buttonRed = document.createElement("button");
    buttonRed.className = "btn btn-danger btn-sm me-1";
    buttonRed.textContent = "Vermelho";

    const buttonYellow = document.createElement("button");
    buttonYellow.className = "btn btn-warning btn-sm me-1";
    buttonYellow.textContent = "Amarelo";

    const buttonGreen = document.createElement("button");
    buttonGreen.className = "btn btn-success btn-sm";
    buttonGreen.textContent = "Verde";

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

export { displayPatienTriage }; // Exporta a função para uso em outros módulos