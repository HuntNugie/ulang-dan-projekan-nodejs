fetch("http://localhost:3000/API/perPage")
    .then(response => response.json())
    .then(res=> {
        const dataSekolah = res.dataSekolah
        const result = dataSekolah.map(el=>{
            return `<li>${el.sekolah}</li>`
        }).join("")
        const hasil = `<ol>
            ${result}
        </ol>`
        document.body.innerHTML = hasil
    })