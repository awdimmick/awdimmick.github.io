let qr; // QR code instance

function generateUrl() {
  const text = document.getElementById("inputText").value;

  const encoded = encodeURIComponent(text);
  
  const compressed_text = LZString.compressToEncodedURIComponent(encoded);

  const url = "https://awdimmick.net/codecopy/getcode.html?enc=" + compressed_text;
  document.getElementById("resultUrl").value = url;

  // Show QR code only if URL is short enough
  const qrContainer = document.getElementById("qrcode");
  const qrNotice = document.getElementById("qrNotice");

  qrContainer.innerHTML = "";
  qrNotice.style.display = "none";

  if (url.length <= 1000) {
    qr = new QRCode(qrContainer, {
      text: url,
      width: 256,
      height: 256,
      correctLevel: QRCode.CorrectLevel.H,
    });
  } else {
    qrNotice.style.display = "block";
  }
}

function toggle_dark_mode() {
  dark_mode = !dark_mode;

  if (dark_mode) {
    document.getElementsByTagName("h1")[0].classList.add("dark_mode");
    document.getElementsByTagName("body")[0].classList.add("dark_mode");
    document.getElementById("dark_mode_label").innerText = "Turn off dark mode";
  } else {
    document.getElementsByTagName("h1")[0].classList.remove("dark_mode");
    document.getElementsByTagName("body")[0].classList.remove("dark_mode");
    document.getElementById("dark_mode_label").innerText = "Turn on dark mode";
  }
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function decodeText(encoded) {
  if (!encoded) return "";
  return decodeURIComponent(LZString.decompressFromEncodedURIComponent(encoded));
}
