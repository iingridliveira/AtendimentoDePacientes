import { displayPatienTriage } from "./trige.js";
import { renderOrderedPatients } from "./tvorder.js";
import { renderPatientsMedical } from "./medicalArea.js";
import { renderPatientsRegistration } from "./registration.js";

const namePatiente = document.getElementById("patient-name");
const nameReson = document.getElementById("patient-reason");

window.addPatient = addPatient;
export let patients = [];

window.onload = function () {
  const savedPatients = localStorage.getItem("patients");
  if (savedPatients) {
    patients = JSON.parse(savedPatients);
    displayPatients();
  }
};

function addPatient(event) {
  event.preventDefault();
  const name = namePatiente.value.trim();
  const reason = nameReson.value.trim();

  const patient = {
    id: patients.length + 1,
    name: name,
    reason: reason,
    level: 0,
    status:0, // Nível de triagem padrão
  };

  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients)); // Salva no localStorage
  displayPatients();
  namePatiente.value = "";
  nameReson.value = "";
  console.log(patients);
}

// Dummy implementation for displayPatients to prevent errors
function displayPatients() {
  // You can implement the logic to display patients here
  console.log("Displaying patients:", patients);
  displayPatienTriage(); // Atualiza a lista de triagem
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrderedPatients();
  renderPatientsRegistration();
  document
    .getElementById("em-atendimento-tab")
    ?.addEventListener("click", () => {
      renderPatientsMedical();
    });
});

document
  .getElementById("atendidos-tab")
  ?.addEventListener("click", () => {
    renderAttendedPatients();
  });