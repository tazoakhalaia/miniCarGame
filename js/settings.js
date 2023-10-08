let settingsBox = document.querySelector('.settings_box')
let isSettingOpen = false
function settingFn(){
    console.log('hello');
    isSettingOpen = !isSettingOpen
    if(isSettingOpen === true){
        isMenuOpen = false
        settingsBox.style.display = 'block'
        menuBox.style.display = 'none'
    }else {
        settingsBox.style.display = 'none'
    }
}