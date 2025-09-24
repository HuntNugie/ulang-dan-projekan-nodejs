import './style.css';
import debounce from "debounce"

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

// untuk search
const searchByname = async (link=API,name)=>{
  const data = await getData(`${link}API/sekolah?search=${name}`)
  return data
}

// saat baru pertama kali di buka
window.onload = async () => {
  if (history.state == null) {
    const data = await defaults()
    renderUI(data)
  }else{
    const data = renderUI(history.state?.data)
    if(history.state?.page == "perPage" && !history.state?.data){
      const data = await perPage(page=history.state.per)
      renderUI(data)
    }
  }
};

// jalankan perPage
document.querySelector("#filter").addEventListener("change",async(event)=>{
    if(event.state?.per != event.target.value){
      const val = event.target.value
      const data = await perPage(API,val)
      history.pushState({page:"perPage",per:val,data:data},"",`?perPage=${val}`)
      renderUI(data)
    }else{
      const data = renderUI(event.state?.data)
    }
  })


  // jika menggunakan popstate
  window.addEventListener("popstate",async (event)=>{
    if(event.state?.data){
       const data = renderUI(event.state?.data)
    }else{
      main.innerHTML = loading()
      const data = await defaults()
      renderUI(data)
    }
  })

// function untuk loading
  function loading(){
  return `<div class="bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-indigo-500 animate-pulse">
        <div class="h-6 bg-gray-700 rounded mb-2 w-3/4"></div>
        <div class="h-4 bg-gray-700 rounded mb-1 w-1/2"></div>
        <div class="h-4 bg-gray-700 rounded mb-1 w-1/3"></div>
        <div class="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>

      <!-- Placeholder Card 2 -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-indigo-500 animate-pulse">
        <div class="h-6 bg-gray-700 rounded mb-2 w-3/4"></div>
        <div class="h-4 bg-gray-700 rounded mb-1 w-1/2"></div>
        <div class="h-4 bg-gray-700 rounded mb-1 w-1/3"></div>
        <div class="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>

      <!-- Placeholder Card 3 -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-indigo-500 animate-pulse">
        <div class="h-6 bg-gray-700 rounded mb-2 w-3/4"></div>
        <div class="h-4 bg-gray-700 rounded mb-1 w-1/2"></div>
        <div class="h-4 bg-gray-700 rounded mb-1 w-1/3"></div>
        <div class="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>`
}


const debounceSearch = debounce(async(event)=>{
  try{
  const result = await searchByname(API,event.target.value)
  if(result.message){
    main.innerHTML = `<h1 class="text-center">${result.message} Tidak ada sekolah</h1>`
  }else{
    renderUI(result)
  history.pushState({page:"search",data:result},"",`?search=${event.target.value}`)
  }
  }catch(error){
    console.error(error)
  }
},500)

// untuk jika ada search
const searching = document.querySelector("#searchs").addEventListener("input",debounceSearch)