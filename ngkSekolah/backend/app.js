import polka from "polka"
import axios from "axios"
import parseUrl from "url-parse"


// console.log(parseUrl("/update-data?userId=1",true).query)
const app = polka()
const API = "https://api-sekolah-indonesia.vercel.app/sekolah"

// endpoint pertama
app.get("/",async(req,res)=>{
    const response = await axios.get(API+"?page=1&perPage=6")
    const data = response.data
    const sekolah = data.dataSekolah

    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Content-type","application/json")
    res.end(JSON.stringify(sekolah))
});

// berdasarkan perPage
app.get("/API/sekolah/perPage",async(req,res)=>{
    try{
        const {query} = parseUrl(req.url,true)
        let api = ""
        if(Object.keys(query).length === 0){
            api = API
        }else{
            api = `${API}?perPage=${query.per}`
        }
        const response = await axios.get(api)
        const data = response.data
        const result = data.dataSekolah
        // fs.writeFileSync("perPage.json",JSON.stringify(data))
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Content-type","application/json")
        res.end(JSON.stringify(result))
    }catch(err){
        res.setHeader("Access-Control-Allow-Origin","*")
        res.setHeader("Control-type","application/json")
        res.end(JSON.stringify({result:false,message:err.message}))        
    }
});

// untuk search by nama
app.get("/API/sekolah",async (req,res)=>{
    const url = new URL(req.url,`http://${req.headers.host}`)
    const srch = url.searchParams.get("search") || ""
    const urlBersih = decodeURIComponent(srch)
    const response = await axios.get(`${API}/s?sekolah=${urlBersih}`)
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Content-type","application/json")
    res.end(JSON.stringify(response.data))
})




app.listen(3000,err=>{
    if(err)throw err
    console.log("Web berjalan di server http://localhost:3000")
});