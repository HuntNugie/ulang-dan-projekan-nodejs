// import module yang di butuhkan
import * as sekolah from "./sekolahAPI.js"
import * as fs from "fs"
import * as readline from "readline/promises"
import { stdin as input, stdout as output } from "process"

const rl = readline.createInterface({input,output})

async function set(tanya){
    switch(tanya){
    case "1":
        try {
            const page = await rl.question("Masukan berapa halaman : ")
            const data = await sekolah.getPerPage(page)
            fs.writeFileSync("data.json",JSON.stringify(data))
            console.log("Berhasil anda bisa melihat hasilnya di file data.json")
            break;  
        } catch (error) {
            throw console.log(error)
        }
    case "2":
        try {
            const name = await rl.question("Masukan nama sekolah : ")
            const result = await sekolah.getByName(name)
            fs.writeFileSync("data.json",JSON.stringify(result))
            console.log("Berhasil anda bisa melihat hasilnya di file data.json")
            break;
        } catch (error) {
            throw console.log(error)
        }
    case "3":
        try {
            const jenjang = await rl.question("Masukan jenjang sekolah (sd,smp,sma,smk) : ")
            let page = await rl.question("Masukan mau berapa sekolah (di kosongkan berarti default nya 5) : ")
            const hasil = await sekolah.getByJenjang(jenjang,page=5)
            fs.writeFileSync("data.json",JSON.stringify(hasil))
            console.log("Berhasil anda bisa melihat hasilnya di file data.json")
            break;
        } catch (error) {
            throw console.log(error)
        }
    }

}

console.log("selamat datang di konversi data sekolah ke json")
console.log("1.berdasarkan banyak sekolah random \n2.Berdasrkan nama sekolah \n3.Berdasarkan jenjang dan banyak sekolah")
const tanya = await rl.question("Masukan pilihan (1-3) : ")
await set(tanya)
rl.close()