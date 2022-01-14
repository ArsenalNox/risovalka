var current_color = null
var canvas = document.getElementById('canvas1')
var ctx = canvas.getContext('2d')

var dimensions = {
    x: canvas.width,
    y: canvas.height
}

var brushSize = 2

var mouse = {
    posX: null,
    posY: null,
    isHeldDown: false
}

mouse.updatePos = function (e) {
    var boundRect = canvas.getBoundingClientRect()
    this.posX = e.clientX - boundRect.left
    this.posY = e.clientY - boundRect.top
}


function load_main_colors(){
    isFirstColor = true
    for(let color_cont of document.getElementsByClassName('color')){
        color_cont_color = color_cont.getAttribute('picker_color')
        color_cont.style.backgroundColor = color_cont_color
        color_cont.addEventListener('click', (e)=>{
            for (let color_cont of document.getElementsByClassName('color')){
                color_cont.classList.remove('active-color')
            }
            e.target.classList.add('active-color')
            current_color = e.target.getAttribute('picker_color')
        })
        if(isFirstColor){
            current_color = color_cont_color
            isFirstColor = false
        }
    }
}


function load_custom_colors(){
}


function downloadPicture(){

}


function clearCanvas(){
    ctx.clearRect(0, 0, dimensions.x, dimensions.y)
}


function addColor(){

}


load_custom_colors()
load_main_colors()

canvas.addEventListener('mousemove', (e) => {
    mouse.updatePos(e)

    if(mouse.isHeldDown){
        ctx.beginPath();
        ctx.arc(mouse.posX, mouse.posY, 1+brushSize, 0, 2*Math.PI)
        ctx.strokeStyle = current_color
        ctx.stroke()
    }
})

document.addEventListener('mousedown', () => {
    mouse.isHeldDown = true
})

document.addEventListener('mouseup', () => {
    mouse.isHeldDown = false
})

document.getElementById('brushSizeSelector').addEventListener('change', (e) => {
    brushSize = e.target.value
})