
import { useState } from "react"
import { useNavigate } from "react-router-dom";




function HomePage(){
const [inputVal,setinputVal] = useState("")
const navigate = useNavigate()
function formhandling(event: { preventDefault: () => void; }){
    event.preventDefault()
    if(inputVal.trim()){
        navigate(`/user/${inputVal.trim()}`)
    }
}
    return(<>
    <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
        <header className="py-4 px-10  flex items-center justify-between h-[20vh] border-b">
           <div className="flex gap-5 items-center">
             <img src="/github.png" alt="github" className="w-10"/>
             <h1 className="text-2xl">GitProfileViewer</h1>
           </div>
        </header>
        <div className=" h-[80vh] flex flex-col items-center justify-center gap-5">
            <h1 className="text-center text-2xl sm:text-5xl font-serif">Check Your Favourite user Github Profile.</h1>
            <form onSubmit={formhandling} className="flex gap-10">
                <input type="text" placeholder="Search.." className="border rounded p-4" value={inputVal} onChange={e=>setinputVal(e.target.value)} />
                <button  type="submit" className="border rounded p-4 hover:bg-gray-100 transition cursor-pointer">View</button>
            </form>
        </div>

        </div>
</>
    )
}
export default HomePage