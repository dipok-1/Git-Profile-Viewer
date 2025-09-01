import mongoose from "mongoose";


async function mongodb(){
    try {
        const mongoUrl: string = process.env.mongo_url ?? '';
        await mongoose.connect(mongoUrl)
        console.log('mongodb is connected')
    } catch (error) {
        console.log('mongodb is not connected')
    }
    
}

export default mongodb