let menuBox = document.querySelector('.menu_box')
let isMenuOpen = false
function menuFn() {
    isMenuOpen = !isMenuOpen
    if(isMenuOpen === true){
        isSettingOpen = false
        menuBox.style.display = 'block'
        settingsBox.style.display = 'none'
    }else {
        menuBox.style.display = 'none'
    }
}