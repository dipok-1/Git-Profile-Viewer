import axios from "axios"
import {formatDistanceToNow} from 'date-fns'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
const apiBaseUrl = import.meta.env.VITE_API_URL;

const user ={
    avatar_url:'',
    html_url:"",
    name:"",
    login:"",
    bio:"",
    location:"",
    followers:0,
    following:0,
    public_repos:0,
    public_gists:0,
    created_at:""
}
interface repo {
    name:string,
    language:string,
    languages_url:string,
    updated_at:string,
    html_url:string,
    forks_count:number,
    watchers_count:number,
    open_issues_count:number,
    stargazers_count:number
}



function View(){
const {username} = useParams()
const [inputvalue,setinputvalue] = useState("")
const navigate = useNavigate()
const [response,setresponse] = useState(user)
const [repoResponse,setRepo] = useState<repo[]>([])
useEffect(()=>{
   const fetchData = async()=>{
      const [response,repoResponse] = await Promise.all([
          axios.get(`${apiBaseUrl}/user/${username}`),
          axios.get(`${apiBaseUrl}/repo/${username}`)
      ])
      setresponse(response.data.data)
      setRepo(repoResponse.data)
   }
   fetchData()

},[username])

function formhandling(e: { preventDefault: () => void }){
e.preventDefault()
   if(inputvalue.trim()){
    navigate(`/user/${inputvalue.trim()}`)
   }
}

    return(
        <div className="min-h-[100vh] flex flex-col ">
      <header className=" flex h-[10vh] bg-[#26667F] items-center justify-between p-4 sm:p-8">
          <div className=" flex items-center gap-3 sm:gap-5">
            <img src="/github.png" alt="git" className="w-6 sm:w-10"/>
            <h2 className=" text-white text-sm sm:text-2xl font-semibold">GitProfileViewer</h2>
          </div>
          <form onSubmit={formhandling} className="flex gap-3 sm:gap-5 items-center" >
            <input type="text" placeholder="Enter Github Username..." className=" w-24 sm:w-60 p-2 sm:p-4 border rounded text-white bg-transparent placeholder-white focus:outline-none" value={inputvalue} onChange={e=>setinputvalue(e.target.value)} />
            <button  type="submit" className=" border rounded p-2 sm:p-4 text-white hover:bg-[#369bc3b8] cursor-pointer transition">Search</button>
          </form>
      </header>



      <section className="flex-grow min-h-[90vh] flex flex-col sm:flex-row items-start justify-center gap-10 sm:gap-20 p-4 sm:p-8 overflow-auto">
          <div className="shadow-md h-auto max-h-[75vh] w-full max-w-[350px] p-6 sm:p-8 rounded-lg bg-white">
            <div className="border-b-2 border-gray-100 flex items-center gap-4 sm:gap-5 p-4">
                <img src={response.avatar_url} alt="userimg" className="w-16 h-16 rounded-2xl object-cover"/>
                <h2 className="font-bold font-mono text-xl sm:text-2xl">{response.name}</h2>
                <a href={response.html_url} className="text-mono text-sm sm:text-base text-blue-700 hover:underline"><p className="hover:border-b border-blue-700">{response.login}</p></a>
            </div>
            
            <div className="flex flex-col mt-5 space-y-3 text-[16px] sm:text-[18px] font-mono">
              <p className="border-b border-gray-100 p-2">{response.bio? response.bio : "bio is not provided"}</p>
              <p className="border-b border-gray-100 p-2">Location: {response.location}</p>
              <p className="border-b border-gray-100 p-2">Followers: {response.followers}</p>
              <p className="border-b border-gray-100 p-2">Following:{response.following}</p>
              <p  className="border-b border-gray-100 p-2">Gists:{response.public_gists}</p>
              <p className="border-b border-gray-100 p-2">Repos: {response.public_repos}</p>
              <p className="p-2 text-lg">Github member since {new Date(response.created_at).getFullYear()}</p>
            </div>
          </div>

          <div className="shadow-2xl bg-white rounded-xl p-4 w-full max-w-full sm:max-w-[650px] max-h-[70vh] overflow-y-auto">
              {Array.isArray(repoResponse) && repoResponse.length > 0 ? (repoResponse.map((repo,index)=>(
                <div key={index} className="flex flex-col sm:flex-row justify-between border-b-2 border-gray-100 py-4 last:border-none">
                <div className="flex flex-col gap-2 p-2 sm:p-4 sm:max-w-[70%]">
                  <a href={repo.html_url}><h1 className="font-mono text-lg sm:text-2xl font-bold text-blue-700 hover:underline">{repo.name}</h1></a>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-start sm:items-center">
                    <p className="font-mono text-sm sm:text-base">Language: {repo.language ? repo.language : "No language"}</p>
                    <p className="font-mono text-sm sm:text-base">Updated {formatDistanceToNow(new Date(repo.updated_at),{ addSuffix: true })}</p>
                  </div>
                </div>
                <div className="flex flex-wrap sm:flex-col gap-3 p-2 sm:p-4 max-w-full sm:max-w-[30%] justify-start sm:justify-end">
                <div  className="flex items-center bg-gray-50 rounded-lg px-3 py-2 shadow min-w-[90px] justify-center">
                   <span><img src="/star.png" alt="star" className="w-5" /></span>
                   <span className="font-bold ml-2">{repo.stargazers_count}</span>
                   <span className="ml-2 text-gray-600">Stars</span>
                </div>
                <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 shadow min-w-[90px] justify-center">
                   <span><img src="/issue.png" alt="issue" className="w-5" /></span>
                   <span className="font-bold ml-2">{repo.open_issues_count}</span>
                   <span className="ml-2 text-gray-600">Issues</span>
                </div>  
                <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 shadow min-w-[90px] justify-center">
                   <span><img src="/fork.png" alt="fork" className="w-5"/></span>
                   <span className="font-bold ml-2">{repo.forks_count}</span>
                   <span className="ml-2 text-gray-600">Fork</span>
                </div>
                <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 shadow min-w-[90px] justify-center">
                   <span><img src="/watch.png" alt="watch" className="w-5"/></span>
                   <span className="font-bold ml-2">{repo.watchers_count}</span>
                   <span className="ml-2 text-gray-600">Watch</span>
                </div>                                              
                </div>
                </div>
              ))): (
  <p>No repositories found.</p>
)}
          </div>
      </section>
      </div>
    )
}
export default View