import './style.css';

const API = 'http://localhost:3000/';
const main = document.querySelector ('#ulin');

// untuk mengubah data menjadi json
const getData = function(link){
  return fetch(link).then(res=>res.json())
}

// untuk merender ui nya
const renderUI = function(response){
  const data = response.map (el => {
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
}

// untuk data defaults baru di buka
const defaults = async (link=API)=>{
  const response = await getData(link)
  return response
}

// untuk perPage
const perPage = async (link=API,page)=>{
  const data = await getData(`${link}API/sekolah/perPage/?per=${page}`)
  return data
}

// saat baru pertama kali di buka
window.onload = async () => {
  if (history.state == null) {
    const data = await defaults()
    renderUI(data)
  }else{
    if(history.state?.page == "perPage"){
      const data = await perPage()
      renderUI(data)
    }
  }
};

// jalankan perPage
document.querySelector("#filter").addEventListener("change",async(event)=>{
    const val = event.target.value
    const data = await perPage(API,val)
    renderUI(data)
  })

