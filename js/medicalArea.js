import { getTriagedPatients } from "./trige.js";
import { levelDot } from "./levelDot.js";
import { generatPDF } from "./PDF.js";

function renderPatientsMedical() {
  const medicalArea = document.getElementById("medical-area");
  if (!medicalArea) return;

  medicalArea.innerHTML = "";

  const triagedPatients = getTriagedPatients();

  if (triagedPatients.length === 0) {
    medicalArea.innerHTML = "<p>Nenhum paciente na área médica.</p>";
    return;
  }

  const table = document.createElement("table");
  table.className = "table table-hover table-striped";
  table.innerHTML = `
      <thead>
        <tr>
          <th scope="col">Nome do Paciente</th>
          <th scope="col">Nível</th>
          <th scope="col">Motivo</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

  const tbody = table.querySelector("tbody");

  triagedPatients
    .filter((patient) => patient.level === 1 || patient.level === 2 || patient.level === 3)
    .forEach((patient) => {
      const tr = document.createElement("tr");

      // Nome
      const tdName = document.createElement("td");
      tdName.textContent = patient.name;
      tr.appendChild(tdName);

      // Nível
      const tdLevel = document.createElement("td");
      tdLevel.appendChild(levelDot(patient));
      tr.appendChild(tdLevel);

      // Motivo
      const tdReason = document.createElement("td");
      tdReason.textContent = patient.reason;
      tr.appendChild(tdReason);

      // Ações
      const tdActions = document.createElement("td");

      // Botão Atender
      const buttonAttend = document.createElement("button");
      if (patient.status === 1) {
        buttonAttend.className = "btn btn-warning btn-sm me-1";
        buttonAttend.textContent = "Em atendimento";
        buttonAttend.disabled = true;
      } else {
        buttonAttend.className = "btn btn-success btn-sm me-1";
        buttonAttend.textContent = "Atender";
        buttonAttend.onclick = () => {
          patient.status = 1;
          const allPatients = JSON.parse(localStorage.getItem("patients")) || [];
          const index = allPatients.findIndex(p => p.id === patient.id);
          if (index > -1) {
            allPatients[index].status = 1;
            localStorage.setItem("patients", JSON.stringify(allPatients));
            renderPatientsMedical();
          }
        };
      }

      // Botão Finalizar Atendimento
      const buttonRemove = document.createElement("button");
      buttonRemove.className = "btn btn-danger btn-sm";
      buttonRemove.textContent = "Finalizar atendimento";
      buttonRemove.onclick = () => {
        const allPatients = JSON.parse(localStorage.getItem("patients")) || [];
        const attendedPatients = JSON.parse(localStorage.getItem("attendedPatients")) || [];

        const index = allPatients.findIndex(p => p.id === patient.id);
        if (index > -1) {
          const removedPatient = allPatients.splice(index, 1)[0];
          attendedPatients.push(removedPatient);

          localStorage.setItem("patients", JSON.stringify(allPatients));
          localStorage.setItem("attendedPatients", JSON.stringify(attendedPatients));

          renderPatientsMedical();
          renderAttendedPatients();
        }
      };

      tdActions.appendChild(buttonAttend);
      tdActions.appendChild(buttonRemove);
      tr.appendChild(tdActions);
      tbody.appendChild(tr);
    });

  medicalArea.appendChild(table);
}

function renderAttendedPatients() {
  const attendedArea = document.getElementById("attended-area");
  if (!attendedArea) return;

  attendedArea.innerHTML = "";

  const attendedPatients = JSON.parse(localStorage.getItem("attendedPatients")) || [];

  if (attendedPatients.length === 0) {
    attendedArea.innerHTML = "<p>Nenhum paciente atendido ainda.</p>";
    return;
  }

  const table = document.createElement("table");
  table.className = "table table-bordered table-striped";
  table.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Nome do Paciente</th>
        <th scope="col">Nível</th>
        <th scope="col">Motivo</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  attendedPatients.forEach((patient) => {
    const tr = document.createElement("tr");
    tr.id = `patient-row-${patient.id}`; // Necessário para o PDF

    const tdName = document.createElement("td");
    tdName.textContent = patient.name;

    const tdLevel = document.createElement("td");
    tdLevel.appendChild(levelDot(patient));

    const tdReason = document.createElement("td");
    tdReason.textContent = patient.reason;

    const tdActions = document.createElement("td");

    // Botão de gerar PDF
    const buttonPDF = document.createElement("button");
    buttonPDF.className = "btn btn-warning btn-sm";
    buttonPDF.textContent = "Gerar PDF";
    buttonPDF.onclick = () => {
      generatPDF(patient.id);
    };

    tdActions.appendChild(buttonPDF);

    tr.appendChild(tdName);
    tr.appendChild(tdLevel);
    tr.appendChild(tdReason);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });

  attendedArea.appendChild(table);
}

// Executa tudo no carregamento da página
document.addEventListener("DOMContentLoaded", () => {
  renderPatientsMedical();
  renderAttendedPatients();
});

export { renderPatientsMedical, renderAttendedPatients };
