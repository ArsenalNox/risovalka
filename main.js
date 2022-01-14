var current_color = null
var canvas = document.getElementById('canvas1')
var ctx = canvas.getContext('2d')
var dimensions = {
    x: canvas.width,
    y: canvas.height
}

var isMouseClicked = false

function load_main_colors(){
    for(let color_cont of document.getElementsByClassName('color')){
        color_cont_color = color_cont.getAttribute('picker_color')
        console.log(color_cont_color)
        color_cont.style.backgroundColor = color_cont_color
        color_cont.addEventListener('click', (e)=>{
            current_color = e.target.getAttribute('picker_color')
            console.log(current_color)
        })
    }
    return 1
}


function load_custom_colors(){

}



load_custom_colors()
load_main_colors()

canvas.addEventListener('mousemove', () => {
    if(isMouseClicked){
        console.log('nowDrawing')
    }
})

canvas.addEventListener('mousedown', () => {
    isMouseClicked = true
})

canvas.addEventListener('mouseup', () => {
    isMouseClicked = false
})
