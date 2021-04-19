const isNumberInputIntro = document.querySelector('.intro--input__number');
[...document.querySelectorAll('.btn-range')].forEach(a=>{
    a.oninput = (event)=>{
        event.target.previousElementSibling.firstChild.innerHTML='0'+event.target.value
    }
})

/*///////////// menu \\\\\\\\\\\\\*/
const iconMenu = document.querySelector('.menu_icon'),
    menu = document.querySelector('.menu')
if (iconMenu) {
    iconMenu.addEventListener('click', ()=> {
        document.querySelector('body').classList.toggle('lock')
        menu.classList.toggle('menu_active')
        iconMenu.classList.toggle('icon_active')
    } )
}
/*document.querySelectorAll('.menu-link').forEach(a=>{
    a.addEventListener('click', ()=>{
        document.querySelector('body').classList.remove('lock')
        menu.classList.remove('menu_active')
        iconMenu.classList.remove('icon_active')
    })
})*/

/*////pets-in-zoo  slider\\\\*/
const item = document.querySelectorAll('.pets-in-zoo--slide')
const sliderLine = document.querySelector('.pets-in-zoo--slider')
let count = 0,
    width;
function init() {
    width = item[0].offsetWidth + +window.getComputedStyle(item[0]).marginRight.replace('px','');
    console.log(width)
    sliderLine.style.width = (width)*item.length + 'px'
    rollSlider()
}
init()
document.querySelector('.btn-left').addEventListener('click', ()=>{
    count--
    if (count<0) count=item.length-1
    rollSlider()
})
document.querySelector('.btn-right').addEventListener('click', ()=>{
    count++
    if (count>=8) {
        count = 0
    }
    console.log(count)
    rollSlider()
})

function rollSlider() {
    sliderLine.style.transform='translate(-' + count * width+'px)'
}

