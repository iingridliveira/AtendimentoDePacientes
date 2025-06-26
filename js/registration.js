import { getTriagedPatients } from "./trige.js";
import { levelDot } from "./levelDot.js";
import { generatPDF } from "./PDF.js"; 

function renderPatientsRegistration() {
    
  const RegistrtionArea = document.getElementById("registration");
  if (!RegistrtionArea) return;

  RegistrtionArea.innerHTML = "";

  const triagedPatients = getTriagedPatients();

  if (triagedPatients.length === 0) {
    RegistrtionArea.innerHTML = "<p>Nenhum paciente na ficha.</p>";
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
    .filter(
      (patient) =>
        patient.level === 1 || patient.level === 2 || patient.level === 3
    )
    .map((patient) => {
      const tr = document.createElement("tr");
      tr.id = `patient-row-${patient.id}`;

   
      const tdName = document.createElement("td");
      tdName.textContent = patient.name;
      tr.appendChild(tdName);

  
      const tdLevel = document.createElement("td");
      tdLevel.appendChild(levelDot(patient));
      tr.appendChild(tdLevel);

      
      const tdReason = document.createElement("td");
      tdReason.textContent = patient.reason;
      tr.appendChild(tdReason);

      const tdActions = document.createElement("td");
      const buttonPDF = document.createElement("button");
      buttonPDF.className = "btn btn-warning btn-sm";
      buttonPDF.textContent = "Gerar PDF";
      buttonPDF.onclick = () => {
        generatPDF(patient.id);
      };

      tdActions.appendChild(buttonPDF);
      tr.appendChild(tdActions);

      tbody.appendChild(tr);
    });

  RegistrtionArea.appendChild(table);
}

document.addEventListener("DOMContentLoaded", renderPatientsRegistration);

export { renderPatientsRegistration };
