const express = require("express")
const mongoose = require ("mongoose")
const bycrypt = require("bcryptjs")
const dotenv = require("dotenv")
const { handleRegisterUser, handleLoginUser, handleGames, handlePostGames, handlePlaceBet, handleGameResults, handlePayouts, handleBetHistory, handleUserBetHistory, handleGetResults, handleHome } = require("./controllers")
const { validateRegister, authorization, validateLogin, adminAuthorization, validatePostGame, validatePlaceBet, validatePostResult, validateProcessPayment, validateGetResult } = require("./middlewares")


dotenv.config()
const app = express ()

app.use(express.json())



const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("MongoDB connected...");
    
    app.listen(PORT, ()=>{
        console.log(`Server started on Port ${PORT} `);
})
})


app.get("/",handleHome)

//api to register users 
app.post("/auth/register", validateRegister, handleRegisterUser)


//api for login 
app.post("/auth/login",validateLogin, handleLoginUser)

//Api for Admin to post games
app.post("/games",adminAuthorization, validatePostGame, handlePostGames)

//Api for users to view games
app.get("/games",authorization, handleGames)


app.post("/place-bet", authorization,validatePlaceBet,handlePlaceBet)

app.patch("/games-result/:id",adminAuthorization,validatePostResult ,handleGameResults)

app.post("/calculate-payouts",authorization,validateProcessPayment,handlePayouts)

app.get("/bets-history/:id",authorization,handleUserBetHistory)

app.get("/admin/bets-history",authorization,handleBetHistory)

app.get("/results",authorization,validateGetResult,handleGetResults)

