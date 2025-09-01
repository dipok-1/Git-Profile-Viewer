import express from 'express'
import mongodb from './db';
import dotenv from 'dotenv'
dotenv.config()
import { Octokit, App } from "octokit";
const app = express()
mongodb()
const octokit = new Octokit({auth:process.env.auth});
import cors from 'cors';
app.use(cors({
  origin: 'https://git-profile-viewer-zeta.vercel.app'  // Allow frontend origin
}));
app.use(express.json())



app.get('/user/:username',async(req,res)=>{
    const username = req.params.username;
    try {
        const data = await octokit.request('GET /users/{username}',{username:username})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'server error'})
    }
})




app.get('/repo/:username',async(req,res)=>{
    const username = req.params.username;
    let allRepos: Array<Record<string, any>> = [];
        let page = 1;
        const per_page = 100
    try {
        while(true){
            const data = await octokit.request('GET /users/{username}/repos',{username,
        per_page,
        page,});

        allRepos = allRepos.concat(data.data);
        if (data.data.length < per_page) {
        break; 
      }
           page++
        }
        
        
        res.status(200).json(allRepos)
    } catch (error) {
        console.log(error)
       res.status(500).json({msg:'server error'})
    }
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
