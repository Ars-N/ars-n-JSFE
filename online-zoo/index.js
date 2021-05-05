/*///////////// menu for mobile \\\\\\\\\\\\\*/
const iconMenu = document.querySelector('.menu_icon'),
    menu = document.querySelector('.menu')
if (iconMenu) {
    iconMenu.addEventListener('click', ()=> {
        document.querySelector('body').classList.toggle('lock') //lock double scroll
        menu.classList.toggle('menu_active')
        iconMenu.classList.toggle('icon_active')
    } )
}

/*/////////////////// Switcher themes \\\\\\\\\\\\\\\\\*/
document.querySelector('body').classList.add('light-theme')

document.querySelector('.switcher').addEventListener('click', ()=>{
    document.querySelector('body').classList.toggle('light-theme')
    document.querySelector('body').classList.toggle('dark-theme')
});

/*/////////////////// inputs \\\\\\\\\\\\\\\\\*/
[...document.querySelectorAll('.btn-range')].forEach(a=>{
    a.oninput = (event)=>{
        /* set all inputs value */
        event.target.previousElementSibling.firstChild.innerHTML=(event.target.value>9?'':'0')+event.target.value+'/'
    }
})








/*//////////  intro slider  \\\\\\\\\\*/
const itemIntro = document.querySelectorAll('.intro--slider-item')
const sliderLineIntro = document.querySelector('.intro--slider')
let countIntro = 1,
    widthIntro

///////// add class active for input value item
itemIntro[countIntro+2].classList.add('intro--slider-item__active')

function initIntro() {
    // calculate width of line
    widthIntro = itemIntro[0].offsetWidth+8
        + +window.getComputedStyle(itemIntro[0]).marginRight.replace('px','')*2;
    sliderLineIntro.style.width = (widthIntro)*itemIntro.length +104 + 'px'
    rollSliderIntro()
}
initIntro()
let rangeIntro=document.querySelector('.intro__btn-range')
rangeIntro.oninput =(e)=>{
    countIntro=e.target.value-1
    itemIntro.forEach(a=>{
        a.classList.remove('intro--slider-item__active') //remove class active to all
    })
    itemIntro[countIntro+2].classList.add('intro--slider-item__active')

    e.target.previousElementSibling.firstChild.innerHTML=(e.target.value>9?'':'0')+e.target.value+'/'
    rollSliderIntro()
}



itemIntro.forEach((a,i)=>{
    if (i>1&&i<itemIntro.length-2){
        a.style.cursor='pointer'
        a.addEventListener('click', ()=>{
            rangeIntro.value=i-1
            countIntro=i-2
            itemIntro.forEach(a=>{
                a.classList.remove('intro--slider-item__active') //remove class active to all
            })
            itemIntro[countIntro+2].classList.add('intro--slider-item__active')
            rangeIntro.previousElementSibling.firstChild.innerHTML=(rangeIntro.value>9?'':'0')+rangeIntro.value+'/'
            rollSliderIntro()
        })
    }
})

function rollSliderIntro() {
    sliderLineIntro.style.transform='translate(-' + countIntro * (widthIntro-1) + 'px)'
}

/*//// how int works  slider\\\\*/
const itemHowSlider = document.querySelectorAll('.information--img__wrapper')
const sliderLineHow = document.querySelector('.information-slider')
let countHow = 0,
    widthHow;
function initHow() {
    widthHow = itemHowSlider[0].offsetWidth;
    sliderLineHow.style.width = (widthHow)*itemHowSlider.length + 'px'
    rollSliderHow()
}
initHow()
let rangeHow=document.querySelector('.how--btn-range')

//translate line after change input
rangeHow.addEventListener('input', ()=>{
    countHow=rangeHow.value-1
    initHow()
})

function rollSliderHow() {
    sliderLineHow.style.transform='translate(-' + countHow * widthHow+'px)'
}


/*////pets-in-zoo  slider\\\\*/
const itemPitsInZooSlider = document.querySelectorAll('.pets-in-zoo--slide')
const sliderLine = document.querySelector('.pets-in-zoo--slider')
let countPets = 0,
    activeEl=0,
    widthPets;
itemPitsInZooSlider[0].classList.add('_active')
function initPets() {
    widthPets = itemPitsInZooSlider[0].offsetWidth + +window.getComputedStyle(itemPitsInZooSlider[0]).marginRight.replace('px','');

    sliderLine.style.width = (widthPets)*itemPitsInZooSlider.length + 'px'
    rollSliderPets()
}
initPets()
let rangePets=document.querySelector('.pets__btn-range')
let petsMax=3,
    petsMin=0
const range=3
document.querySelector('.btn-left').addEventListener('click', ()=>{
    activeEl--
    if (activeEl<0) {activeEl=itemPitsInZooSlider.length-1}
    if (activeEl>petsMax){
        countPets=activeEl-range
        petsMin=activeEl-range
        petsMax=activeEl
    } else if (activeEl<petsMin) {
        countPets=activeEl
        petsMin=activeEl
        petsMax=activeEl+range
    }
    itemPitsInZooSlider.forEach(a=>a.classList.remove('_active'))
    itemPitsInZooSlider[activeEl].classList.add('_active')
    rangePets.value=activeEl+1
    rangePets.previousElementSibling.firstChild.innerHTML=(rangePets.value>9?'':'0')+rangePets.value+'/'
    rollSliderPets()
})
document.querySelector('.btn-right').addEventListener('click', ()=>{
    activeEl++
    if (activeEl>itemPitsInZooSlider.length-1) {activeEl=0}
    if (activeEl>petsMax){
        countPets=activeEl-range
        petsMin=activeEl-range
        petsMax=activeEl
    } else if (activeEl<petsMin) {
        countPets=activeEl
        petsMin=activeEl
        petsMax=activeEl+range
    }
    itemPitsInZooSlider.forEach(a=>a.classList.remove('_active'))
    itemPitsInZooSlider[activeEl].classList.add('_active')
    rangePets.value=activeEl+1
    rangePets.previousElementSibling.firstChild.innerHTML=(rangePets.value>9?'':'0')+rangePets.value+'/'
    rollSliderPets()
    console.log(petsMin,petsMax)
})

//translate line after change input

rangePets.addEventListener('input', ()=>{
    activeEl=rangePets.value-1
    rangePets.previousElementSibling.firstChild.innerHTML=(rangePets.value>9?'':'0')+rangePets.value+'/'

    if (activeEl>petsMax){
        countPets=activeEl-range
        petsMin=activeEl-range
        petsMax=activeEl
    } else if (activeEl<petsMin) {
        countPets=activeEl
        petsMin=activeEl
        petsMax=activeEl+range
    }
    itemPitsInZooSlider.forEach(a=>a.classList.remove('_active'))
    itemPitsInZooSlider[activeEl].classList.add('_active')
    rollSliderPets()
})

function rollSliderPets() {
    sliderLine.style.transform='translate(-' + countPets * widthPets+'px)'
}

