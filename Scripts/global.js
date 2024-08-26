// Asset variables

const music_src = "../Assets/Music/sangshad_music.mp3";
const sfx_bounce_src = "../Assets/sfx/bounce.mp3";
const sfx_slap_src = "../Assets/sfx/slap.mp3";
const sfx_tap_src = "../Assets/sfx/tap.ogg";



// HTMl elements
const music_elem = document.getElementById('music');
const sfx_bounce_elem = document.getElementById('sfx_bounce');
const sfx_slap_elem = document.getElementById('sfx_slap');
const sfx_tap_elem = document.getElementById('sfx_tap');

const music_toggle_btn = document.getElementById('music-toggle-btn');
const sfx_toggle_btn = document.getElementById('sfx-toggle-btn');

const menu_toggle_btn = document.getElementById('menu-toggle-button');

const game_play_btn = document.getElementById('game-play-btn');

const controller_btn_container = document.getElementById('controller-btn-container');


function toggle_music(){
    if(menu_toggle_btn.checked){
        console.log('hello world')
    }
}

toggle_music()