const DEVICE_ID = 'YOUR_DEVICE_ID';
const PARTICLE_TOKEN = 'YOUR_PARTICLE_ACCESS_TOKEN';

async function getVar(name) {
  const url = `https://api.particle.io/v1/devices/${DEVICE_ID}/${name}?access_token=${PARTICLE_TOKEN}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('Network error');
  const j = await r.json();
  return j.result;
}

async function updateAll() {
  try {
    document.getElementById('moisture').innerText = await getVar('moisture');
    document.getElementById('ph').innerText = await getVar('ph');
    document.getElementById('nitrogen').innerText = await getVar('nitrogen');
  } catch (e) {
    console.error(e);
  }
}

async function waterPlant() {
  const url = `https://api.particle.io/v1/devices/${DEVICE_ID}/water`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `access_token=${PARTICLE_TOKEN}&args=on`
  });
}

// Hook up button
document.getElementById('waterBtn').addEventListener('click', async () => {
  document.getElementById('waterBtn').disabled = true;
  await waterPlant();
  setTimeout(() => document.getElementById('waterBtn').disabled = false, 4000);
});

// Start polling
updateAll();
setInterval(updateAll, 5000);
