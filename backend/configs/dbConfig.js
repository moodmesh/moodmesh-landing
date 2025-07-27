const mongoose = require("mongoose");
const connectDB = async (mongodb_cluster_url)=>{
    try{

        await mongoose.connect(mongodb_cluster_url);
        console.log("✅ mongodb connected");
        return true;

    } catch(err){
       console.error("❌ monodb connection failed", err.message);
       process.exit(1);
    }
}

module.exports = connectDB;