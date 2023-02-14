const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const players = []

class Player {
    constructor(id) {
        this.id = id
    }
    asignarChupetona(chupetona) {
        this.chupetona = chupetona
    }
    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
} 

class Chupetona {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`
    const player = new Player(id)
    players.push(player)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})

app.post("/chupetona/:playerid", (req, res) => {
    const playerid = req.params.playerid || ""
    const nombre = req.body.chupetona || ""
    const chupetona = new Chupetona(nombre)
    const playerIndex = players.findIndex((player) => playerid === player.id)
    if (playerIndex >= 0) {
        players[playerIndex].asignarChupetona(chupetona)
    }
    console.log(players)
    console.log(playerid)
    res.end()
})

app.post("/chupetona/:playerid/posicion", (req, res) => {
    const playerid = req.params.playerid || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const playerIndex = players.findIndex((player) => playerid === player.id)
    if (playerIndex >= 0) {
        players[playerIndex].actualizarPosicion(x, y)
    }
    const enemys = players.filter((player) => playerid !== player.id)
    res.send({
        enemys
    })
})

app.post("/chupetona/:playerid/ataques", (req, res) => {
    const playerid = req.params.playerid || ""
    const ataques = req.body.ataques || []
    
    const playerIndex = players.findIndex((player) => playerid === player.id)
    if (playerIndex >= 0) {
        players[playerIndex].asignarAtaques(ataques)
    }
    res.end()
})

app.get("/chupetona/:playerid/ataques", (req, res) => {
    const playerid = req.params.playerid || ""
    const player = players.find((player) => player.id === playerid)
    res.send({
        ataques: player.ataques || []
    })
})

app.get("/chupetona/:playerid/clear", (req, res) => {
    const playerid = req.params.playerid || ""
    const playerIndex = players.findIndex(player => playerid === player.id)

    players.splice(playerIndex, 1)
    const player = new player(playerid)
    players.push(player)

    res.send(playerid)
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Servidor funcionando")
})
