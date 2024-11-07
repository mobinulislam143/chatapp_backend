const app=require("./app");
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 7000
app.listen(port,function () {
    console.log("App Run @7000")
});




