var current_color = null
var canvas = document.getElementById('canvas1')
var ctx = canvas.getContext('2d')

var customColors = []

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
    let customColorsLocal = localStorage.getItem('customColorsJSON')
    if(customColorsLocal){
        customColors = JSON.parse(customColorsLocal)
        console.log(customColors) 
        for (let customColor of customColors){
             console.log(customColor)
             let rgbinputValue = customColor

             let newColorLi = document.createElement('li')
             newColorLi.classList = "color"

             newColorLi.setAttribute('picker_color', rgbinputValue)
             document.getElementById('cpl1').append(newColorLi)
        }
    } else {
        console.log('custom colors not found')
    }
}


function downloadPicture(c, filename){

    var lnk = document.createElement('a'),
        e;

    lnk.download = filename;

    lnk.href = c.toDataURL();

    if (document.createEvent) {

        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
                         0, 0, 0, 0, 0, false, false, false,
                         false, 0, null);

        lnk.dispatchEvent(e);

    } else if (lnk.fireEvent) {

        lnk.fireEvent("onclick");
    }
}


function clearCanvas(){
    ctx.clearRect(0, 0, dimensions.x, dimensions.y)
}

function createColorPopUp(){
    let popup_wrapper = document.createElement('div')
    popup_wrapper.className = 'popup-wrapper'
    popup_wrapper.id = 'ppw1'

    let popup = document.createElement('div')
    popup.className = 'popup'

    let rgbinput = document.createElement('input')
    rgbinput.type = 'color'
    rgbinput.id = 'rgbinput'

    let acceptButton = document.createElement('button')
    acceptButton.innerHTML = 'Сохранить'
    acceptButton.onclick = function (){
        let rgbinputValue = document.getElementById('rgbinput').value
        console.log(rgbinputValue)

        let newColorLi = document.createElement('li')
        newColorLi.classList = "color"

        newColorLi.setAttribute('picker_color', rgbinputValue)
        document.getElementById('cpl1').append(newColorLi)

        customColors.push(rgbinputValue)
        registerColor()
        load_main_colors()
        
        document.body.removeChild(document.getElementById('ppw1'))
    }

    let closeButton = document.createElement('button')
    closeButton.innerHTML = 'Отмена'
    closeButton.id = 'cancelcolor'
    closeButton.onclick = function (){
        document.body.removeChild(document.getElementById('ppw1'))
    }

    popup.append(rgbinput, acceptButton, closeButton)
    popup_wrapper.append(popup)
    document.body.append(popup_wrapper)
}


function registerColor(){
    localStorage.setItem('customColorsJSON', JSON.stringify(customColors))
}


load_custom_colors()
load_main_colors()

canvas.addEventListener('mousemove', (e) => {
    mouse.updatePos(e)

    if(mouse.isHeldDown){
        ctx.beginPath();
        ctx.arc(mouse.posX, mouse.posY, 1+brushSize, 0, 2*Math.PI)
        ctx.fillStyle = current_color
        ctx.fill()
    }
})

canvas.addEventListener('click', (e) => {
    if(!mouse.isHeldDown){
        mouse.updatePos(e)

        ctx.beginPath();
        ctx.arc(mouse.posX, mouse.posY, 1+brushSize, 0, 2*Math.PI)
        ctx.fillStyle = current_color
        ctx.fill()
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