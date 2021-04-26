const img = document.querySelector('img');
//  Fullscreen
document.querySelector('.fullscreen').addEventListener("click", ()=> {
    !document.fullscreenElement?document.documentElement.requestFullscreen()
        :document.exitFullscreen?document.exitFullscreen():0
});


// Inputs    and    Reset
[...document.querySelectorAll('input[type="range"]')].forEach(a=>{
    document.querySelector('.btn-reset').addEventListener('click', () => {
        document.querySelector('.btn-active').classList.remove('btn-active')
        document.querySelector('.btn-reset').classList.add('btn-active')
        img.removeAttribute('style')
        if (a.name==='saturate'){a.value=100} else a.value=0
        a.nextElementSibling.value=a.value
    });
    a.addEventListener('input',function () {
        a.nextElementSibling.value=a.value
        img.style.setProperty(`--${this.name}`,(a.value + this.dataset.sizing))
    })
});


// Next picture
let now= (new Date()).getHours()
let directory
if (now>5&&now<12) directory ='https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/'
    else if (now>11&&now<18) directory ='https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/'
        else if (now>17&&now<0) directory ='https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/'
            else directory ='https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/'
let numImg='00'
document.querySelector('.btn-next').addEventListener('click', ()=>{
    document.querySelector('.btn-active').classList.remove('btn-active')
    document.querySelector('.btn-next').classList.add('btn-active')
    if (+numImg<9) numImg='0'+(+numImg+1)
    else numImg = +numImg + 1
    if (+numImg>20) numImg='01'
    img.src=`${directory}${numImg}.jpg`
})


// Load

const fileInput = document.getElementById('btnInput');
fileInput.addEventListener('change', function(e) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        img.src = reader.result;
        fileInput.value=""
    }
    reader.readAsDataURL(file);
});
document.querySelector('.btn-load').addEventListener('click', ()=>{
    document.querySelector('.btn-active').classList.remove('btn-active')
    document.querySelector('.btn-load').classList.add('btn-active')
})


// Save Image
const saveImage = document.querySelector('.btn-save')
saveImage.addEventListener('click', ()=>{
    document.querySelector('.btn-active').classList.remove('btn-active')
    document.querySelector('.btn-save').classList.add('btn-active')
    const canvas = document.createElement("canvas")
    const imgNew = new Image(),
        blur=document.querySelector('.outBlur').value,
        sepia=document.querySelector('.outSepia').value,
        saturate=document.querySelector('.outSaturate').value,
        hue=document.querySelector('.outHue').value,
        invert=document.querySelector('.outInvert').value
    imgNew.setAttribute('crossOrigin', 'anonymous');
    imgNew.src = img.src;
    imgNew.onload = function() {
        canvas.width = imgNew.width;
        canvas.height = imgNew.height;
        let ctx = canvas.getContext("2d");
        ctx.filter= `sepia(${sepia}%) blur(${Math.ceil(canvas.height/img.height)*blur}px) saturate(${saturate}%) hue-rotate(${hue}deg) invert(${invert}%)`
        ctx.drawImage(imgNew, 0, 0);
        let link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL();
        link.click();
        link.delete;
    };
    canvas.delete
})
