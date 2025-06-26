import { getTriagedPatients } from "./trige.js";
import { levelDot } from "./levelDot.js";

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

  triagedPatients.filter(
    (patient) =>
      patient.level === 1 || patient.level === 2 || patient.level === 3
  ).map((patient) => {
    const tr = document.createElement("tr");

    // Nome
    const tdName = document.createElement("td");
    tdName.textContent = patient.name;
    tr.appendChild(tdName);

    // Nível (usa levelDot)
    const tdLevel = document.createElement("td");
    tdLevel.appendChild(levelDot(patient));
    tr.appendChild(tdLevel);

    // Motivo
    const tdReason = document.createElement("td");
    tdReason.textContent = patient.reason;
    tr.appendChild(tdReason);

    const tdActions = document.createElement("td");
    const buttonAttend = document.createElement("button");
    if (patient.status === 1) {
      buttonAttend.className = "btn btn-warning btn-sm me-1";
      buttonAttend.textContent = "em atendimento";
      buttonAttend.disabled = true;
    } else {
      buttonAttend.className = "btn btn-success btn-sm";
      buttonAttend.textContent = "Atender";
      buttonAttend.onclick = () => {
        patient.status = 1;
        localStorage.setItem("patients", JSON.stringify(triagedPatients));
        renderPatientsMedical();
      };
    }
    const buttonRemove = document.createElement("button");
    buttonRemove.className = "btn btn-danger btn-sm";
    buttonRemove.textContent = "Parar atendimento";
    buttonRemove.onclick = () => {
      const index = triagedPatients.indexOf(patient);
      if (index > -1) {
        triagedPatients.splice(index, 1);
        localStorage.setItem("patients", JSON.stringify(triagedPatients));
        renderPatientsMedical();
      }
    };
    tdActions.appendChild(buttonAttend);
    tdActions.appendChild(buttonRemove);

    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });

  medicalArea.appendChild(table);
}

document.addEventListener("DOMContentLoaded", renderPatientsMedical);

export { renderPatientsMedical };
