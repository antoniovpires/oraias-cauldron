window.addEventListener("load", () => {
  const calcBtn = document.getElementById("potion-calculator");
  const potionTable = document.getElementById("potion-table");
  const fixedTibar = 30;
  const fixedDC = 20;

  let mpCostInput = document.getElementById("mp-cost");

  let potionPrice = document.getElementById("potion-price");
  let potionCost = document.getElementById("potion-cost");
  let potionDc = document.getElementById("potion-dc");

  function calcPrice(mpCost) {

    if (mpCost < 1 || mpCost === "" || mpCost === null) {
      mpCost = 1;
    }

    return fixedTibar * (mpCost * mpCost);
  }

  function calcDc(mpCost) {
    return fixedDC + mpCost;
  }

  calcBtn.addEventListener("click", () => {
    potionTable.hidden = true;

    let nbMpCost = Number(mpCostInput.value);

    potionPrice.textContent = calcPrice(nbMpCost);
    potionCost.textContent = Math.round(calcPrice(nbMpCost) / 3);
    potionDc.textContent = calcDc(nbMpCost);

    potionTable.hidden = false;
  })

  mpCostInput.addEventListener("keyup", (e) => {
    if (Number(mpCostInput.value) === 0) {
      potionTable.hidden = true;
    }
  })
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration.scope);
      })
      .catch(error => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}

// INSTALL PWA


let deferredPrompt;
const installButton = document.getElementById('installButton');

installButton.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  
  deferredPrompt = e;
  
  installButton.style.display = 'block';
});

installButton.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  
  deferredPrompt.prompt();
  
  const { outcome } = await deferredPrompt.userChoice;
  
  deferredPrompt = null;
  
  installButton.style.display = 'none';
});

window.addEventListener('appinstalled', () => {
  installButton.style.display = 'none';
});