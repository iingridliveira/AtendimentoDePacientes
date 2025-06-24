const namePatiente = document.getElementById("patient-name");
const nameReson = document.getElementById("patient-reason");

let patients = [];

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
}

// Dummy implementation for displayPatients to prevent errors
function displayPatients() {
    // You can implement the logic to display patients here
    console.log("Displaying patients:", patients);
}

console.log(patients);