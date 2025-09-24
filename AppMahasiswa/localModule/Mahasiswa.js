import fs from "fs"
import readline from "readline/promises"
import { stdin as input,stdout as output } from "process"

// buat interface inputan nya
export const rl = readline.createInterface({input,output})
export const fss = fs

export const tambahMahasiswa = function(nama,prodi,semester,kelas){
    const result = {nama,prodi,semester,kelas}
    
    const read = fs.readFileSync("./dbJSON/data.json","utf-8")
    const readJson = JSON.parse(read)

    // push ke element terakhir
    readJson.push(result)
    // tulis kembali
    const writeResult = fs.writeFileSync("./dbJSON/data.json",JSON.stringify(readJson))
    console.log("Berhasil di tambahkan ke dalam data")
}