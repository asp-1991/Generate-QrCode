let qrCode = null;

function isURL(valor) {
    try {
        new URL(valor);
        return true;
    } catch {
        return false;
    }
}

function atualizarQR() {
    const input = document.getElementById("qrInput");
    const preview = document.getElementById("qrPreview");
    const tipo = document.getElementById("tipoConteudo");
    const downloadBtn = document.getElementById("downloadBtn");

    const valor = input.value.trim();

    preview.innerHTML = "";
    tipo.textContent = "";
    downloadBtn.disabled = true;

    if (!valor) return;

    if (isURL(valor)) {
        tipo.textContent = "🔗 Conteúdo detectado: URL";
        tipo.style.color = "#2563eb";
    } else {
        tipo.textContent = "📝 Conteúdo detectado: Texto";
        tipo.style.color = "#16a34a";
    }

    qrCode = new QRCode(preview, {
        text: valor,
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.H
    });

    downloadBtn.disabled = false;
}

function baixarQR() {
    const canvas = document.querySelector("#qrPreview canvas");

    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qrcode.png";
    link.click();
}