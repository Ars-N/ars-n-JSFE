let isPsycho=false
const btns=document.querySelectorAll(".btn"),
pianoKeys=document.querySelectorAll('.piano-key')
let isMouseDown=0


/*            animation btn   Сhildren's Mode             */
document.querySelector('a.psycho').addEventListener('click',(event)=>{
    if (isPsycho)event.target.style.background= 'yellowgreen'
    else event.target.style.background= 'none'
})

/*                  fullscreen                    */
document.querySelector('.fullscreen').addEventListener("click", ()=> {
        !document.fullscreenElement?document.documentElement.requestFullscreen()
            :document.exitFullscreen?document.exitFullscreen():0
});


/*              toggle btn Letters/Notes                */
[...btns].forEach(a=>a.addEventListener('click', (e)=>{
    if (!e.target.classList.contains('btn-active')) {
        [...btns].forEach(a => a.classList.toggle('btn-active'));
        [...pianoKeys].forEach(a => a.classList.toggle('piano-key-letter'))
    }
}));



/*                     наведение на клавишу                         */

[...pianoKeys].forEach(a=>a.addEventListener('mouseenter',
        (event)=>{event.target.classList.add('piano-key-remove-mouse')
                if (isMouseDown){
                    let audio=document.querySelector(`audio[data-letter="${event.target.getAttribute('data-letter')}"]`)
                    audio.currentTime = 0
                    audio.play()
                    event.target.classList.add('piano-key-active','piano-key-active-pseudo')
                }
        })
);

[...pianoKeys].forEach(a=>a.addEventListener('mouseleave',
    (event)=>{
        event.target.classList.remove('piano-key-remove-mouse')
        event.target.classList.contains('piano-key-active')?
            event.target.classList.remove('piano-key-active'):0
        event.target.classList.contains('piano-key-active-pseudo')?
            event.target.classList.remove('piano-key-active-pseudo'):0
}));
/*//////////////////////////////////////////////////////////////////////////*/

/*        режим  Сhildren's  Mode        */
let mas = ['red','blue','yellow','green','grey','pink','brown','black','turquoise','greenyellow','indigo','lightsalmon','orange']
let randomColor=()=> mas[Math.floor(Math.random()*(mas.length-1))];
//////////////////////////////////////////////////////////////

/*             mouse   включение звука и анимации нажатия                 */
[...pianoKeys].forEach(a=>a.addEventListener('mousedown', (event)=>{isMouseDown=1
        let audio=document.querySelector(`audio[data-letter="${event.target.getAttribute('data-letter')}"]`)
        audio.currentTime = 0
        audio.play()
        event.target.classList.remove('piano-key-remove-mouse')
        event.target.classList.add('piano-key-active','piano-key-active-pseudo')
}));
document.addEventListener('mouseup', (event)=>{isMouseDown=0
        event.target.classList.remove('piano-key-active')
})
/*//////////////////////////////////////////////////////////////////////////*/



/*             клавиатура                 */

document.addEventListener('keydown', (event) => {
        let audio=document.querySelector(`audio[data-letter="${event.code.replace('Key','')}"]`),
            key=document.querySelector(`div[data-letter="${event.code.replace('Key','')}"]`)
        if (!audio||!key||event.repeat) return
        audio.currentTime = 0
        audio.play()
        if (isPsycho){
            key.style.backgroundColor=randomColor()
        } else {
            key.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            [...document.querySelectorAll('.q')].forEach(a=>a.style.backgroundColor='#313940')
        }
    key.classList.add('piano-key-active')
})

window.addEventListener('keyup',(event)=>{
        let a=document.querySelector(`div[data-letter="${event.code.replace('Key','')}"]`)
        if (!a) return
        a.classList.remove('piano-key-active')
})









