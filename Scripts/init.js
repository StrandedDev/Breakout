
game_play_btn.addEventListener('click', start_game);

function start_game(){

    // play bgm 
    // music.play();
    canvas.style.border = "1px solid #000";

    toggle_intro_dialogue();
    draw();
}

function toggle_intro_dialogue(){
    let intro_dialogue_box = document.getElementById('intro-popup-container');

    if(intro_dialogue_box.classList.contains('flex_visible')){
        intro_dialogue_box.classList.add('flex_hidden')
        intro_dialogue_box.classList.remove('flex_visible')
    }
    else{
        intro_dialogue_box.classList.add('flex_visible')
        intro_dialogue_box.classList.remove('flex_hidden')
    }
    
    if(controller_btn_container.classList.contains('flex_visible')){
        controller_btn_container.classList.add('flex_hidden')
        controller_btn_container.classList.remove('flex_visible')
    }
    else{
        controller_btn_container.classList.add('flex_visible')
        controller_btn_container.classList.remove('flex_hidden')
    }

}