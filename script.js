function isPrime(n) {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;
  for (let i = 5n; i * i <= n; i += 6n) {
    if (n % i === 0n || n % (i + 2n) === 0n) return false;
  }
  return true;
}

function findClosestGoldbachPair(E) {
  const half = E / 2n;
  for (let offset = 0n; offset <= E / 2n; offset++) {
    const p = half - offset;
    const q = E - p;
    if (isPrime(p) && isPrime(q)) {
      return { p, q };
    }
  }
  return null;
}

function calculerEtVerifier() {
  const input = document.getElementById("inputE");
  const output = document.getElementById("resultat");
  const verify = document.getElementById("verification");
  const valeur = input.value.trim();

  if (!valeur || isNaN(valeur)) {
    output.innerText = "Veuillez entrer un nombre pair valide.";
    verify.innerText = "";
    return;
  }

  const E = BigInt(valeur);

  if (E < 4n || E % 2n !== 0n) {
    output.innerText = "E doit être un nombre pair supérieur ou égal à 4.";
    verify.innerText = "";
    return;
  }

  // Formule prédictive
  const ln = x => Math.log(Number(x));
  const sqrtE = BigInt(Math.floor(Math.sqrt(Number(E))));
  const logE = ln(E);
  const loglogE = Math.log(logE);
  const delta = BigInt(Math.round(Number(sqrtE) * (loglogE / logE)));

  const p = E / 2n - delta;
  const q = E / 2n + delta;

  output.innerHTML = `
    <h3>Résultat prédictif :</h3>
    <p>E = ${E.toString()}</p>
    <p>p = ${p.toString()}</p>
    <p>q = ${q.toString()}</p>
    <p>p + q = ${(p + q === E) ? "✓" : "✗"} (${(p + q).toString()})</p>
    <p><em>Note : Ces valeurs sont issues de la formule prédictive.</em></p>
  `;

  // Vérification réelle : trouver une vraie paire (p, q) de Goldbach
  const vraiePair = findClosestGoldbachPair(E);

  if (vraiePair) {
    verify.innerHTML = `
      <h3>Vérification des nombres premiers :</h3>
      <p>p réel = ${vraiePair.p.toString()} (${isPrime(vraiePair.p) ? "premier" : "non premier"})</p>
      <p>q réel = ${vraiePair.q.toString()} (${isPrime(vraiePair.q) ? "premier" : "non premier"})</p>
      <p>p + q = ${(vraiePair.p + vraiePair.q).toString()}</p>
    `;
  } else {
    verify.innerHTML = `<p>Aucune paire (p, q) de premiers trouvée.</p>`;
  }
}
