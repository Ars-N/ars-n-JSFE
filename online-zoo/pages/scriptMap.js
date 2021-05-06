/*/////////////////// Switcher \\\\\\\\\\\\\\\\\*/
document.querySelector('body').classList.add('light-theme')

document.querySelector('.switcher').addEventListener('click', ()=>{
    document.querySelector('body').classList.toggle('light-theme')
    document.querySelector('body').classList.toggle('dark-theme')
})
/*////////////////////////////////// menu \\\\\\\\\\\\\\*/
const iconMenu = document.querySelector('.menu_icon'),
    menu = document.querySelector('.menu')
if (iconMenu) {
    iconMenu.addEventListener('click', ()=> {
        document.querySelector('body').classList.toggle('lock')
        menu.classList.toggle('menu_active')
        iconMenu.classList.toggle('icon_active')
    } )
}

/*///////////  slider map  \\\\\\\\\\\*/
const itemsMap = document.querySelectorAll('.map--slide')
const sliderLine = document.querySelector('.map--slider-line')
let countMap = 0,
    activeEl=1,
    widthMap,
    mapMax=8,
    mapMin=0,
    range=8
if (document.querySelector('.map--slider').offsetWidth<1111){
    mapMax=4
    mapMin=0
    range=4
    countMap = 0
}
window.onresize=()=> {
    if (document.querySelector('.map--slider').offsetWidth<1111) {
        mapMax=4
        mapMin=0
        range=4
        countMap=activeEl-mapMax
    } else {
        mapMax=8
        mapMin=0
        range=8
        countMap=0
    }
    initMap()
}



itemsMap[1].classList.add('map--slide__active')
function initMap() {
    widthMap = sliderLine.offsetWidth/8 + 3;
    // sliderLine.style.width = (widthMap)*itemsMap.length + 'px'
    rollSliderMap()
}
initMap()
let rangeMap=document.querySelector('.btn-range')


document.querySelector('.btn-left').addEventListener('click', ()=>{
    activeEl--
    if (activeEl<0) {activeEl=itemsMap.length-1}
    if (activeEl>mapMax){
        countMap=activeEl-range
        mapMin=activeEl-range
        mapMax=activeEl
    } else if (activeEl<mapMin) {
        countMap=activeEl
        mapMin=activeEl
        mapMax=activeEl+range
    }
    itemsMap.forEach(a=>a.classList.remove('map--slide__active'))
    itemsMap[activeEl].classList.add('map--slide__active')
    rangeMap.value=activeEl+1
    rangeMap.previousElementSibling.firstChild.innerHTML=(rangeMap.value>9?'':'0')+rangeMap.value+'/'
    rollSliderMap()
    activatePoint()
})
document.querySelector('.btn-right').addEventListener('click', ()=>{
    activeEl++
    if (activeEl>itemsMap.length-1) {activeEl=0}
    if (activeEl>mapMax){
        countMap=activeEl-range
        mapMin=activeEl-range
        mapMax=activeEl
    } else if (activeEl<mapMin) {
        countMap=activeEl
        mapMin=activeEl
        mapMax=activeEl+range
    }
    itemsMap.forEach(a=>a.classList.remove('map--slide__active'))
    itemsMap[activeEl].classList.add('map--slide__active')
    rangeMap.value=activeEl+1
    rangeMap.previousElementSibling.firstChild.innerHTML=(rangeMap.value>9?'':'0')+rangeMap.value+'/'
    rollSliderMap()
    activatePoint()
})

//translate line after change input

rangeMap.addEventListener('input', ()=>{
    activeEl=rangeMap.value-1
    rangeMap.previousElementSibling.firstChild.innerHTML=(rangeMap.value>9?'':'0')+rangeMap.value+'/'

    if (activeEl>mapMax){
        countMap=activeEl-range
        mapMin=activeEl-range
        mapMax=activeEl
    } else if (activeEl<mapMin) {
        countMap=activeEl
        mapMin=activeEl
        mapMax=activeEl+range
    }
    itemsMap.forEach(a=>a.classList.remove('map--slide__active'))
    itemsMap[activeEl].classList.add('map--slide__active')
    rollSliderMap()
    activatePoint()
})

/*//click\\*/
itemsMap.forEach((a,i)=>{

    a.addEventListener('click', (e)=>{
        activeEl=i
        rangeMap.value=i+1

        rangeMap.previousElementSibling.firstChild.innerHTML=(rangeMap.value>9?'':'0')+rangeMap.value+'/'
        
        if (activeEl>mapMax){
            countMap=activeEl-range
            mapMin=activeEl-range
            mapMax=activeEl
        } else if (activeEl<mapMin) {
            countMap=activeEl
            mapMin=activeEl
            mapMax=activeEl+range
        }
        itemsMap.forEach(a=>a.classList.remove('map--slide__active'))
        itemsMap[activeEl].classList.add('map--slide__active')
        rollSliderMap()
        activatePoint()
    })
})


function rollSliderMap() {
    sliderLine.style.transform='translate(-' + countMap * widthMap+'px)'
}


let linkToZoos=document.querySelector('.map-btn')
function activatePoint() {
    if (activeEl===0){
        linkToZoos.setAttribute('href', './zoos/monkey.html')
        document.querySelectorAll('.point').forEach(a=>a.classList.remove('_active'))
        document.querySelector('.point-monkey').classList.add('_active')
    } else if (activeEl===1){
        document.querySelectorAll('.point').forEach(a=>a.classList.remove('_active'))
        document.querySelector('.point-panda').classList.add('_active')
        linkToZoos.setAttribute('href', './zoos/Panda.html')
    } else if (activeEl===2){
        document.querySelectorAll('.point').forEach(a=>a.classList.remove('_active'))
        document.querySelector('.point-crocodile').classList.add('_active')
        linkToZoos.setAttribute('href', './zoos/crocodile.html')
    } else if (activeEl===3){
        document.querySelectorAll('.point').forEach(a=>a.classList.remove('_active'))
        document.querySelector('.point-eagle').classList.add('_active')
        linkToZoos.setAttribute('href', './zoos/eagle.html')
    } else {
        document.querySelectorAll('.point').forEach(a => a.classList.remove('_active'))
        linkToZoos.setAttribute('href', './zoos/Panda.html')
    }
}
