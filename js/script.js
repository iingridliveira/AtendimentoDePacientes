const namePatiente = document.getElementById("patient-name");
const nameReson = document.getElementById("patient-reason");



let patients = [];

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
        reason: reason
    };

    patients.push(patient);
    displayPatients();
    namePatiente.value = "";
    nameReson.value = "";

    patients.push(patient);
localStorage.setItem("patients", JSON.stringify(patients)); // Salva no localStorage
displayPatients();

    console.log(patients);
}


// Dummy implementation for displayPatients to prevent errors
function displayPatients() {
  // You can implement the logic to display patients here
  console.log("Displaying patients:", patients);
  displayPatientstriagem(); // Atualiza a lista de triagem
}

function displayPatientstriagem() {
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

console.log(patients);