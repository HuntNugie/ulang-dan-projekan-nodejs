import './style.css';

const API = 'http://localhost:3000/';

// saat baru pertama kali di buka
window.onload = () => {
  if (history.state == null) {
    fetch (API).then (res => res.json ()).then (res => {
      const main = document.querySelector ('#ulin');

      const data = res.map (el => {
        const alamat = `${el.alamat_jalan}, ${el.kecamatan}, ${el.kabupaten_kota}, ${el.propinsi}, ${el.kode_prop}`;
        return `
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform border-2 border-indigo-500">
        <h2 class="text-xl font-semibold text-indigo-400 mb-2">${el.sekolah}</h2>
        <p class="text-gray-300"><strong>Lokasi:</strong> ${alamat}</p>
        <p class="text-gray-300"><strong>Jenjang:</strong> ${el.bentuk}</p>
        <p class="text-gray-300"><strong>NPSN:</strong> ${el.npsn}</p>
        </div>
      </div>
      `
      }).join("");
      main.innerHTML = data
    });
  }
};
