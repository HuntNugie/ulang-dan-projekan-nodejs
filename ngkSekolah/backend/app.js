import polka from "polka"
import axios from "axios"
import fs from "fs"
import parseUrl from "url-parse"


// console.log(parseUrl("/update-data?userId=1",true).query)
const app = polka()
const API = "https://api-sekolah-indonesia.vercel.app/sekolah"

app.get("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Content-type","application/json")
    res.end(JSON.stringify({nama:"Nugie kurniawan"}))
});

app.get("/update/API/perPage",async(req,res)=>{
    try{
        const prs = parseUrl(req.url,true)
        const resultUrl = prs.query
        let api = ""
        if(Object.keys(resultUrl).length === 0){
            api = API
        }else{
            api = `${API}?perPage=${resultUrl.per}`
        }
        const response = await axios.get(api)
        const data = response.data
        fs.writeFileSync("perPage.json",JSON.stringify(data))
        res.setHeader("Access-Control-Allow-Origin","*")
        res.setHeader("Control-type","application/json")
        res.end(JSON.stringify({result:true,message:"Success"}))
    }catch(err){
        res.setHeader("Access-Control-Allow-Origin","*")
        res.setHeader("Control-type","application/json")
        res.end(JSON.stringify({result:false,message:err.message}))        
    }
});
app.get("/API/perPage",(req,res)=>{
    // baca file json
    const data = fs.readFileSync("perPage.json","utf-8")
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Control-type","application/json")
    res.end(data)
})
app.listen(3000,err=>{
    if(err)throw err
    console.log("Web berjalan di server http://localhost:3000")
});