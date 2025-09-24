import {rl,tambahMahasiswa,fss} from "./localModule/Mahasiswa.js"

const dirPath = "./dbJSON"
// cek jika tidak mempunyai folder
if(!fss.existsSync(dirPath)){
    fss.mkdirSync(dirPath)
}

const filePath = `${dirPath}/data.json`
// cek jika tidak mempunyai file
if(!fss.existsSync(filePath)){
    fss.writeFileSync(filePath,"[]")
}

// baru kasih pertanyaan
const nama = await rl.question("Masukan nama mahasiswa : ")
const prodi = await rl.question(`Msaukan prodi dari ${nama} : `)
const semester = await rl.question(`${nama} mahasiswa semester berapa : `)
const kelas = await rl.question(`${nama} berada di kelas apa : `)

tambahMahasiswa(nama,prodi,semester,kelas)

rl.close()
