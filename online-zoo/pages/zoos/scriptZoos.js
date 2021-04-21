const iconMenu = document.querySelector('.menu_icon'),
    menu = document.querySelector('.menu')
if (iconMenu) {
    iconMenu.addEventListener('click', ()=> {
        document.querySelector('body').classList.toggle('lock')
        menu.classList.toggle('menu_active')
        iconMenu.classList.toggle('icon_active')
    } )
}
