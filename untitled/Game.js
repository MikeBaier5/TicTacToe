var grid = []

var player = {
    CROSS : 1, CIRCLE : 2, FREE : 0
}

var currentPlayer = player.CROSS

var canvas = document.querySelector("canvas")

var size = canvas.width / 3

var ctx = canvas.getContext("2d")

var gameWon = false

for(var x = 0; x < 3; x++) {
    for(var y = 0; y < 3; y++) {
        grid[x + "," + y] = player.FREE
    }
}

drawGame()

canvas.addEventListener("mousedown", function (e) {
    if(!gameWon) {
        var x = Math.floor((e.x - canvas.getBoundingClientRect().x) / size)
        var y = Math.floor((e.y - canvas.getBoundingClientRect().y) / size)


        if(grid[x + "," + y] === player.FREE) {
            grid[x + "," + y] = currentPlayer
        }

        if(checkWin()) {
            gameWon = true
            var p = document.createElement("p")

            if(currentPlayer === player.CROSS) {
                p.innerText = "Kreuz hat gewonnen"
            }
            if(currentPlayer === player.CIRCLE) {
                p.innerText = "Kreis hat gewonnen"
            }
            document.body.append(p)
        }

        if(currentPlayer === player.CIRCLE) {
            currentPlayer = player.CROSS
        }
        else if(currentPlayer === player.CROSS) {
            currentPlayer = player.CIRCLE
        }
        drawGame()
    }
})

function drawGame() {
    ctx.strokeStyle = "rgb(0,0,0)"
    ctx.lineWidth = canvas.width / 75

    for(var i = 1; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(i * size, 0)
        ctx.lineTo(i * size, canvas.height)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.moveTo(0, i * size)
        ctx.lineTo(canvas.width, i * size)
        ctx.stroke()
        ctx.closePath()
    }

    for(var x = 0; x < 3; x++) {
        for(var y = 0; y < 3; y++) {
            if(grid[x + "," + y] === player.CROSS) {
                drawCross(x * size, y * size)
            }
            else if(grid[x + "," + y] === player.CIRCLE) {
                drawCircle(x * size, y* size)
            }
        }
    }
}

function drawCross(x, y)
{
    ctx.strokeStyle = "rgb(255, 0, 0)"
    ctx.lineWidth = canvas.width / 38
    ctx.beginPath()
    ctx.moveTo(x + (canvas.width / 15), y + (canvas.width / 15))
    ctx.lineTo(x + size - (canvas.width / 15), y + size - (canvas.width / 15))
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(x + size - (canvas.width / 15), y + (canvas.width / 15))
    ctx.lineTo(x + (canvas.width / 15), y + size - (canvas.width / 15))
    ctx.stroke()
    ctx.closePath()
}

function drawCircle(x, y)
{
    ctx.strokeStyle = "rgb(0, 0, 255)"
    ctx.lineWidth = canvas.width / 38
    ctx.beginPath()
    ctx.arc(x + size / 2, y + size / 2, size / 2 - (canvas.width / 30), 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()
}

function checkWin()
{
    var countDiagonal1 = 0
    var countDiagonal2 = 0

    for (let i = 0; i < 3; i++)
    {
        var countX = 0
        var countY = 0

        for(let j = 0; j < 3; j++)
        {
            if(grid[j + "," + i] === currentPlayer)
            {
                countX++
            }
            if(grid[i + "," + j] === currentPlayer)
            {
                countY++;
            }
        }

        if(countX >= 3 || countY >= 3)
        {
            return true
        }
        else
        {
            countX = 0
            countY = 0
        }

        if(grid[i + "," + i] === currentPlayer)
        {
            countDiagonal1++
        }
        if(grid[(2 - i) + "," + i] === currentPlayer)
        {
            countDiagonal2++
        }
    }
    if(countDiagonal1 >= 3 || countDiagonal2 >= 3)
    {
        return true
    }
}
