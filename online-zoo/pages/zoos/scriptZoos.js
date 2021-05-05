/*/////////////////// Switcher \\\\\\\\\\\\\\\\\*/
document.querySelector('body').classList.add('light-theme')

document.querySelector('.switcher').addEventListener('click', ()=>{
    document.querySelector('body').classList.toggle('light-theme')
    document.querySelector('body').classList.toggle('dark-theme')
})

/*////////////////////////// menu \\\\\\\\\\\\\\\\\\\\*/

const iconMenu = document.querySelector('.menu_icon'),
    menu = document.querySelector('.menu')
if (iconMenu) {
    iconMenu.addEventListener('click', ()=> {
        document.querySelector('body').classList.toggle('lock')
        menu.classList.toggle('menu_active')
        iconMenu.classList.toggle('icon_active')
    } )
}
/*/////////// slider \\\\\\\\\\\*/
document.querySelectorAll('.video-wrapper').forEach(a=>{
    a.addEventListener('click', (e)=>{
        let mainVideo=document.querySelector('.video-main'),
            video=a.firstElementChild,
            c=video.getAttribute('src')
        video.setAttribute('src', mainVideo.getAttribute('src'))
        mainVideo.setAttribute(`src`, c)
    })
})
