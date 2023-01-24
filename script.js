const sectionSelectAttack = document.getElementById("select-attack")
const sectionReiniciar = document.getElementById("reiniciar")
const BotonSelectJugador = document.getElementById('boton-select')

    
const sectionSelectPet = document.getElementById("select-pet")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo") 
const spanVidasJugador = document.getElementById("vidas-jugador")

const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let playerid = null
let enemigoid = null
let chupetonas = []
let chupetonasEnemigos = []
let optionChupetonas
let ataqueEnemigo = []
let inputHi  
let inputCa  
let inputRa  
let inputLa  
let inputTu  
let inputPy
let btnFuego 
let btnAgua
let btnTierra 
let botones = []
let mascotaJugador
let mascotaJugadorObjeto
let ataquesChupetona
let attacksEnemyPet
let ataqueJugador = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = './imagenes/mapafondo.png'
let alturaBuscada 
let anchoMapa = window.innerWidth - 20
const anchoMaximoMapa = 750

if (anchoMapa > anchoMaximoMapa) {
    anchoMapa = anchoMaximoMapa - 20
}

alturaBuscada = anchoMapa * 600 / 800

mapa.width = anchoMapa
mapa.height = alturaBuscada

class Chupetona {
    constructor(nombre, foto, vida,fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = random(0, mapa.width - this.ancho)
        this.y = random(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0  
    }

    pintarChupetona() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let boris = new Chupetona('Boris', './imagenes/boris.jpg', 5, './imagenes/boris.jpg')

let abner = new Chupetona('Abner', './imagenes/abner.jpg', 5, './imagenes/abner.jpg')

let vicho = new Chupetona('Vicho', './imagenes/vicho.jpg', 5, './imagenes/vicho.jpg')

let aaron = new Chupetona('Aaron', './imagenes/aaron.jpg', 5, './imagenes/aaron.jpg')

let willi = new Chupetona('Willi', './imagenes/willi.jpg', 5, './imagenes/willi.jpg')

let mitchel = new Chupetona('Mitchel', './imagenes/mitche.jpg', 5, './imagenes/mitche.jpg')

const BORIS_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},

] 
boris.ataques.push(...BORIS_ATAQUES)

const ABNER_ATAQUES = [
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},

]
abner.ataques.push(...ABNER_ATAQUES)

const VICHO_ATAQUES = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},

]
vicho.ataques.push(...VICHO_ATAQUES)

const AARON_ATAQUES = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},

]
aaron.ataques.push(...AARON_ATAQUES)

const WILLI_ATAQUES = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},

]
willi.ataques.push(...WILLI_ATAQUES)

const MITCHEL_ATAQUES = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},

]
mitchel.ataques.push(...MITCHEL_ATAQUES)

chupetonas.push(boris, abner, vicho, aaron, willi, mitchel)


function iniciarJuego(){
    
    sectionSelectAttack.style.display = "none"
    sectionReiniciar.style.display = "none"
    sectionVerMapa.style.display = "none"

    chupetonas.forEach((chupetona) => {
        optionChupetonas = `
        <input type="radio" name="pet" id=${chupetona.nombre}>
            <label class="box-pet" for=${chupetona.nombre}>
                <p>${chupetona.nombre}</p>
                <img src=${chupetona.foto} alt=${chupetona.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += optionChupetonas

        inputHi = document.getElementById("Boris")
        inputCa = document.getElementById("Abner")
        inputRa = document.getElementById("Vicho")
        inputLa = document.getElementById("Aaron")
        inputTu = document.getElementById("Willi")
        inputPy = document.getElementById("Mitchel")

    })

    BotonSelectJugador.addEventListener('click', SelectPetPlayer)
    
    btnReiniciar = document.getElementById("boton-reiniciar")
    btnReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("https://a4ronr1.github.io/chupetonasgame/unirse")
    .then(function (res) {
        if (res.ok) {
            res.text()
            .then(function (respuesta) {
                console.log(respuesta)
                playerid = respuesta
            })
        }
    })
}

function SelectPetPlayer(){
    

    if (inputHi.checked){
        spanMascotaJugador.innerHTML = inputHi.id
        mascotaJugador = inputHi.id
    } else if (inputCa.checked){
        spanMascotaJugador.innerHTML = inputCa.id
        mascotaJugador = inputCa.id
    } else if (inputRa.checked){
        spanMascotaJugador.innerHTML = inputRa.id
        mascotaJugador = inputRa.id
    } else if (inputLa.checked){
        spanMascotaJugador.innerHTML = inputLa.id
        mascotaJugador = inputLa.id
    } else if (inputTu.checked){
        spanMascotaJugador.innerHTML = inputTu.id
        mascotaJugador = inputTu.id
    } else if (inputPy.checked){
        spanMascotaJugador.innerHTML = inputPy.id
        mascotaJugador = inputPy.id
    } else {
        alert("Selecciona un lol")
        return
    }

    sectionSelectPet.style.display = "none"

    seleccionarChupetona(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarChupetona(mascotaJugador) {
    fetch(`https://a4ronr1.github.io/chupetonasgame/chupetona/${playerid}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chupetona: mascotaJugador
        })
    }) 
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < chupetonas.length; i++) {
        if (mascotaJugador === chupetonas[i].nombre) {
            ataques = chupetonas[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => { 
        ataquesChupetona = `
        <button id=${ataque.id} class="btn-ataques BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesChupetona
    })

     btnFuego = document.getElementById("boton-fuego")
     btnAgua = document.getElementById("boton-agua")
     btnTierra = document.getElementById("boton-tierra")
     botones = document.querySelectorAll(".BAtaque")

}

function secuenciaAtaque() {
    botones.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                btn.style.background = '#112f58'
                btn.disabled = true
            } else if (e.target.textContent === "💧"){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                btn.style.background = '#112f58'
                btn.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                btn.style.background = '#112f58'
                btn.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`https://a4ronr1.github.io/chupetonasgame/chupetona/${playerid}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`https://a4ronr1.github.io/chupetonasgame/chupetona/${enemigoid}/ataques`)
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ ataques }) {
                    if (ataques.length === 5) {
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
        }
    })
}

function SelectPetEnemy(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    attacksEnemyPet = enemigo.ataques
    secuenciaAtaque()
}


function RandomAttackEnemy(){
    let ataqueAleatorio = random(0,attacksEnemyPet.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO")
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if((ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "TIERRA") || (ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "FUEGO") || (ataqueJugador[index] == "TIERRA" && ataqueEnemigo[index] == "AGUA")){
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        
    }
    revisarVictorias()

}

function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("EMPATE")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("GANASTE :)")
    } else {
        crearMensajeFinal("Has perdido :(")
    }
}

function crearMensaje(resultado){

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    let sectionMensajes = document.getElementById("resultado")

    sectionMensajes.innerHTML = resultadoFinal


    sectionReiniciar.style.display = "block"   
}

function reiniciarJuego(){
    limpiarJuego()
    location.reload()
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
            0,
            0,
            mapa.width,
            mapa.height
    )
    mascotaJugadorObjeto.pintarChupetona()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    chupetonasEnemigos.forEach(function (chupetona) 
    {
        if (chupetona != undefined) {
            chupetona.pintarChupetona()
            revisarColision(chupetona)
        }
    })
}

function enviarPosicion(x, y) {
    fetch(`https://a4ronr1.github.io/chupetonasgame/chupetona/${playerid}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemys }) {
                    console.log(enemys)
                    chupetonasEnemigos = enemys.map(function(enemy) 
                    {
                        let chupetonaEnemigo = null
                        if(enemy.chupetona != undefined) 
                        {
                            const chupetonaNombre = enemy.chupetona.nombre
                            switch (chupetonaNombre) 
                            {
                                case "Boris":
                                    chupetonaEnemigo = new Chupetona('Boris', './imagenes/boris.jpg', 5, './imagenes/boris.jpg', enemy.id)
                                    break
                                case "Abner":
                                    chupetonaEnemigo = new Chupetona('Abner', './imagenes/abner.jpg', 5, './imagenes/abner.jpg', enemy.id)
                                    break
                                case "Vicho":
                                    chupetonaEnemigo = new Chupetona('Vicho', './imagenes/vicho.jpg', 5, './imagenes/vicho.jpg', enemy.id)
                                    break
                                case "Aaron":
                                    chupetonaEnemigo = new Chupetona('Aaron', './imagenes/aaron.jpg', 5, './imagenes/aaron.jpg', enemy.id)
                                    break
                                case "Willi":
                                    chupetonaEnemigo = new Chupetona('Willi', './imagenes/willi.jpg', 5, './imagenes/willi.jpg', enemy.id)
                                    break
                                case "Mitchel":
                                    chupetonaEnemigo = new Chupetona('Mitchel', './imagenes/mitche.jpg', 5, './imagenes/mitche.jpg', enemy.id)
                                    break   
                            }
                            
                            chupetonaEnemigo.x = enemy.x
                            chupetonaEnemigo.y = enemy.y
                        }
                            return chupetonaEnemigo
                    })
                })
        }
    })
}

function moverDerecha() {
    const miChupetona = obtenerObjetoMascota()
    miChupetona.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function PressKey(event) {
    switch (event.key) {
        case 'w':
            moverArriba()
            break;
        case 's':
            moverAbajo()
            break;
        case 'a':
            moverIzquierda()       
            break;
        case 'd':
            moverDerecha()
            break;     
    
        default:
            break;
    }

}

function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', PressKey)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < chupetonas.length; i++) {
        if (mascotaJugador === chupetonas[i].nombre) {
            return chupetonas[i]
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaChupetona = mascotaJugadorObjeto.y
    const abajoChupetona = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaChupetona = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaChupetona = mascotaJugadorObjeto.x

    if (
        abajoChupetona < arribaEnemigo ||
        arribaChupetona > abajoEnemigo ||
        derechaChupetona < izquierdaEnemigo ||
        izquierdaChupetona > derechaEnemigo
    ) {
        return;
    }

    if (enemigo.x == undefined || enemigo.y == undefined) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto una colision")
    enemigoid = enemigo.id
    sectionSelectAttack.style.display = "flex"
    sectionVerMapa.style.display = "none"
    SelectPetEnemy(enemigo)
}

function limpiarJuego() {
    fetch(`https://a4ronr1.github.io/chupetonasgame/chupetona/${playerid}/clear`)
    .then( (res) => {
        if(res.ok){
            res.text()
                .then( (respuesta) => {
                    playerid = respuesta
                } )
        }
    })
}

window.addEventListener('load', iniciarJuego)
