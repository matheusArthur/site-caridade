function showLoading() {
    if (document.getElementById("auth-loading")) return;
    const div = document.createElement("div");
    div.id = "auth-loading";
    div.classList.add("auth-loading", "centralize");
    div.setAttribute("role", "status");
    div.setAttribute("aria-live", "polite");
    const label = document.createElement("span");
    label.textContent = "Carregando...";
    div.appendChild(label);
    document.body.appendChild(div);
}
function hideLoading() {
    document.getElementById("auth-loading")?.remove();
}
