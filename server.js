const app = require("express")()
const morgan = require('morgan')('dev')

let PORT = process.env.PORT || 8080 
let serverMsg = `Server listening on port: ${PORT}`

app.use(morgan)
app.get('/', (req,res) => 
        res.send(`<h1>Hello World!</h1><br/>${serverMsg}`))

app.listen(PORT, console.log(serverMsg))