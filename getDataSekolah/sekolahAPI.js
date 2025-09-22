// api untuk mendapatkan data sekolah

// publik api
const API = "https://api-sekolah-indonesia.vercel.app/sekolah"

// untuk mengambil data api 
const getData = function(link = API){
    return fetch(link)
    .then(response=>response.json())
    .then(({dataSekolah})=>dataSekolah)
}
// mengambil berdasarkan perPage
export async function getPerPage(page,clbk){
    const data = await getData(`${API}?perPage=${page}`)
    if(typeof clbk === "function"){
        clbk(data)
    }
    return data    
}

// mengambil berdasarkan nama sekolah
export async function getByName(name,clbk){
    const data = await getData(`${API}/s?sekolah=${name}`)
    if(typeof clbk === "function"){
        clbk(data)
    }
    return data
}

// mengambil berdasrkan jenjang sekolah sd,smp,sma,smk
export async function getByJenjang(jenjang,page=5,clbk){
    const data = await getData(`${API}/${jenjang}?perPage=${page}`)
    if(typeof clbk === "function"){
        clbk(data)
    }
    return data
}

