// Variables

let currentAvatar = 0;


// Logic to initialize game menu

function init_basic_game(){
   // music.src = music_src;
    sfx_tap_elem.src = sfx_tap_src;
    sfx_slap_elem.src = sfx_slap_src;
    sfx_bounce_elem.src = sfx_bounce_src;
    
}





// Logic to toggle the settings menu

function toggleMenu(){
    let menuIcon = document.getElementById('menu-icon-bars');
    let crossIcon = document.getElementById('menu-icon-cross');
    let menu = document.getElementById('menu-container');
    
    // play tap sound
    sfx_tap_elem.play();
    
    // Toggles menu icon
    if(menuIcon.classList.contains('flex_visible')){
        menuIcon.classList.add('flex_hidden') 
        menuIcon.classList.remove('flex_visible')
    }
    else{
        menuIcon.classList.add('flex_visible')
        menuIcon.classList.remove('flex_hidden') 
    }
    
    
    // Toggles cross icon
    if(crossIcon.classList.contains('flex_visible')){
        crossIcon.classList.add('flex_hidden');
        crossIcon.classList.remove('flex_visible');
    }
    else{
        crossIcon.classList.add('flex_visible');
        crossIcon.classList.remove('flex_hidden');
    }
    
    
    // Toggles the menu dialogue box
    if(menu.classList.contains('flex_visible')){
        menu.classList.add('flex_hidden');
        menu.classList.remove('flex_visible');
    }
    else{
        menu.classList.add('flex_visible');
        menu.classList.remove('flex_hidden')
    }
    
}

menu_toggle_btn.addEventListener('click', toggleMenu);





// logic to change avatar

function changeAvatar(num){
    currentAvatar = num;
    toggleMenu();
}






