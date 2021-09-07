export function display_about(){
    const btn_help = document.getElementById('btn_help');
    const btn_close_about = document.getElementById('btn_close_about');
    const modal = document.getElementById('wrap_about');
    btn_help.addEventListener('click',()=>show_about(modal));
    btn_close_about.addEventListener('click',()=>hide_about(modal));
}//display_about

function show_about(modal){
    modal.classList.remove('hidden');
}


function hide_about(modal){
    modal.classList.add('hidden');
}
