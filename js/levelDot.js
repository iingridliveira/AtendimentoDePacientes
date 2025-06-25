



function levelDot(patient) {

    const levelDot = document.createElement("span");
    levelDot.className = "ms-2 rounded-circle d-inline-block align-middle";
    levelDot.style.width = "16px";
    levelDot.style.height = "16px";

    // Cor da bolinha usando classes Bootstrap
    if (patient.level === 1) {
      levelDot.classList.add("bg-success");
    } else if (patient.level === 2) {
      levelDot.classList.add("bg-warning");
    } else if (patient.level === 3) {
      levelDot.classList.add("bg-danger");
    } else {
      levelDot.classList.add("bg-secondary");
    }
    
    return levelDot;
}
export { levelDot };