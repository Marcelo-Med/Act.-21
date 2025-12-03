// ======================================================
// Cifrado Hill 2x2 con alfabeto A-Z (módulo 26)
// Usa matriz con números primos (ej. [[3,3],[2,5]])
// Encripta y desencripta correctamente.
// ======================================================

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ------------------------
// Utilidades de matemáticas modulares
// ------------------------

function mod(n, m) {
  return ((n % m) + m) % m;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function modInverse(a, m) {
  a = mod(a, m);
  if (gcd(a, m) !== 1) return null;

  let m0 = m;
  let x0 = 0;
  let x1 = 1;

  while (a > 1) {
    const q = Math.floor(a / m);
    let t = m;
    m = a % m;
    a = t;

    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }

  if (x1 < 0) x1 += m0;
  return x1;
}

// ------------------------
// Manejo de texto
// ------------------------

function cleanText(text) {
  return text
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // acentos
    .replace(/[^A-Z]/g, ""); // solo letras
}

function textToNumbers(text) {
  return Array.from(text).map(ch => alphabet.indexOf(ch));
}

function numbersToText(nums) {
  return nums.map(n => alphabet[mod(n, 26)]).join("");
}

// ------------------------
// Matriz clave 2x2 módulo 26
// ------------------------

function getKeyMatrix() {
  const a11 = parseInt(document.getElementById("a11").value, 10) || 0;
  const a12 = parseInt(document.getElementById("a12").value, 10) || 0;
  const a21 = parseInt(document.getElementById("a21").value, 10) || 0;
  const a22 = parseInt(document.getElementById("a22").value, 10) || 0;

  const matrix = [
    [mod(a11, 26), mod(a12, 26)],
    [mod(a21, 26), mod(a22, 26)]
  ];

  const det = mod(a11 * a22 - a12 * a21, 26);
  const invDet = modInverse(det, 26);
  const infoBox = document.getElementById("matrix-info");

  if (invDet === null) {
    infoBox.className = "info-box error";
    infoBox.textContent =
      "❌ La matriz NO es válida (det = " +
      det +
      " no tiene inverso módulo 26). Prueba con otra combinación (puedes usar números primos).";
    return null;
  } else {
    infoBox.className = "info-box";
    infoBox.textContent =
      "✅ Matriz válida. det = " +
      det +
      ", det⁻¹ ≡ " +
      invDet +
      " (mod 26). Se puede encriptar y desencriptar.";
  }

  return { matrix, det, invDet };
}

function getInverseMatrix(key, invDet) {
  const [[a, b], [c, d]] = key;

  const adj = [
    [d, -b],
    [-c, a]
  ];

  const inv = [
    [mod(adj[0][0] * invDet, 26), mod(adj[0][1] * invDet, 26)],
    [mod(adj[1][0] * invDet, 26), mod(adj[1][1] * invDet, 26)]
  ];

  return inv;
}

// ------------------------
// Cifrado Hill
// ------------------------

function encryptHill(plaintext, keyCfg) {
  const { matrix } = keyCfg;

  let clean = cleanText(plaintext);
  if (clean.length === 0) return { text: "", clean: "" };

  if (clean.length % 2 !== 0) {
    clean += "X";
  }

  const nums = textToNumbers(clean);
  const res = [];

  for (let i = 0; i < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i + 1];

    const x2 = mod(matrix[0][0] * x + matrix[0][1] * y, 26);
    const y2 = mod(matrix[1][0] * x + matrix[1][1] * y, 26);

    res.push(x2, y2);
  }

  const cipherText = numbersToText(res);
  return { text: cipherText, clean };
}

function decryptHill(ciphertext, keyCfg) {
  const { matrix, det, invDet } = keyCfg;

  let clean = cleanText(ciphertext);
  if (clean.length === 0) return { text: "", clean: "", invKey: null, det };

  if (clean.length % 2 !== 0) {
    clean += "X";
  }

  const nums = textToNumbers(clean);
  const invKey = getInverseMatrix(matrix, invDet);
  const res = [];

  for (let i = 0; i < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i + 1];

    const x2 = mod(invKey[0][0] * x + invKey[0][1] * y, 26);
    const y2 = mod(invKey[1][0] * x + invKey[1][1] * y, 26);

    res.push(x2, y2);
  }

  const plainText = numbersToText(res);
  return { text: plainText, clean, invKey, det };
}

// ------------------------
// Enlaces con el HTML
// ------------------------

window.addEventListener("DOMContentLoaded", () => {
  const btnEnc = document.getElementById("btn-encriptar");
  const btnDec = document.getElementById("btn-desencriptar");
  const txt = document.getElementById("texto");
  const out = document.getElementById("resultado");
  const detalles = document.getElementById("detalles");

  // Actualizar info de la matriz cuando cambien los valores
  ["a11", "a12", "a21", "a22"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        getKeyMatrix();
      });
    }
  });

  // Mostrar estado inicial de la matriz
  getKeyMatrix();

  btnEnc.addEventListener("click", () => {
    const keyCfg = getKeyMatrix();
    if (!keyCfg) {
      out.value = "";
      detalles.textContent =
        "No se puede encriptar: la matriz clave no es válida.";
      return;
    }

    const original = txt.value;
    const { text: cifrado, clean } = encryptHill(original, keyCfg);

    // Mostramos cifrado y también lo subimos al cuadro de entrada
    out.value = cifrado;
    txt.value = cifrado;  // 👈 esto hace que luego 'Desencriptar' funcione directo

    detalles.textContent =
      "=== ENCRIPTAR (Cifrado Hill) ===\n" +
      "Texto original: " +
      original +
      "\n" +
      "Texto limpio (A-Z): " +
      clean +
      "\n" +
      "Determinante de la matriz: " +
      keyCfg.det +
      " (mod 26)\n" +
      "Mensaje encriptado: " +
      cifrado +
      "\n";
  });

  btnDec.addEventListener("click", () => {
    const keyCfg = getKeyMatrix();
    if (!keyCfg) {
      out.value = "";
      detalles.textContent =
        "No se puede desencriptar: la matriz clave no es válida.";
      return;
    }

    // Ahora desencriptamos LO QUE ESTÁ ARRIBA (ya cifrado)
    const original = txt.value;
    const { text: plano, clean, invKey, det } = decryptHill(original, keyCfg);

    out.value = plano;

    let invStr = "";
    if (invKey) {
      invStr =
        "[ " +
        invKey[0][0] +
        "  " +
        invKey[0][1] +
        " ]\n" +
        "[ " +
        invKey[1][0] +
        "  " +
        invKey[1][1] +
        " ]";
    }

    detalles.textContent =
      "=== DESENCRIPTAR (Cifrado Hill) ===\n" +
      "Texto cifrado ingresado: " +
      original +
      "\n" +
      "Texto limpio (A-Z): " +
      clean +
      "\n" +
      "Determinante: " +
      det +
      " (mod 26)\n" +
      "Matriz inversa K⁻¹ (mod 26):\n" +
      invStr +
      "\n\n" +
      "Mensaje desencriptado: " +
      plano +
      "\n";
  });
});






