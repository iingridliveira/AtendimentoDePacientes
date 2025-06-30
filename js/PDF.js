function generatPDF(patientId) {
  const allPatients = JSON.parse(localStorage.getItem("patients")) || [];
  const attendedPatients = JSON.parse(localStorage.getItem("attendedPatients")) || [];

  // Procura o paciente nas duas listas
  const patient = [...allPatients, ...attendedPatients].find(p => p.id === patientId);

  if (!patient) {
    alert("Paciente não encontrado!");
    return;
  }

  const pdfContent = document.createElement("div");
  pdfContent.style.padding = "30px";
  pdfContent.style.fontFamily = "Arial, sans-serif";
  pdfContent.style.maxWidth = "600px";
  pdfContent.style.margin = "0 auto";
  pdfContent.style.border = "1px solid #ccc";
  pdfContent.style.borderRadius = "10px";

  const levelColor = {
    1: "#198754", // verde
    2: "#ffc107", // amarelo
    3: "#dc3545", // vermelho
    default: "#6c757d" // cinza
  };

  const levelLabel = {
    1: "Baixa Urgência (Verde)",
    2: "Média Urgência (Amarelo)",
    3: "Alta Urgência (Vermelho)",
    default: "Não triado"
  };

  const atendimentoData = new Date().toLocaleDateString();

  pdfContent.innerHTML = `
    <h2 style="text-align:center; margin-bottom: 20px;">Prontuário de Atendimento</h2>
    <p><strong>Nome do Paciente:</strong> ${patient.name}</p>
    <p><strong>Motivo da Visita:</strong> ${patient.reason}</p>
    <p>
      <strong>Nível de Urgência:</strong> 
      <span style="color: ${levelColor[patient.level] || levelColor.default}; font-weight: bold;">
        ${levelLabel[patient.level] || levelLabel.default}
      </span>
    </p>
    <p><strong>Data do Atendimento:</strong> ${atendimentoData}</p>
    <br>
    <hr>
    <p style="text-align: right; font-style: italic; margin-top: 40px;">
      _______________________________________<br>
      Médico Responsável
    </p>
  `;

  html2pdf()
    .set({
      margin: 10,
      filename: `prontuario-${patient.name.replace(/\s/g, "_")}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    })
    .from(pdfContent)
    .save();
}


export { generatPDF };
