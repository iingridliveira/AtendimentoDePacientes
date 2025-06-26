function generatPDF(patientId) {
  const element = document.getElementById(`patient-row-${patientId}`);
  if (!element) {
    alert("Registro não encontrado!");
    return;
  }
  html2pdf().from(element).save();
}
export { generatPDF };
