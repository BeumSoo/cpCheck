export function display_about(){
    const header = document.getElementById('header');
    header.addEventListener('click', (e)=>toggle_about(e));
}//display_about

function toggle_about(e){
    const target = e.target.id;
    const wrap_about = document.getElementById('wrap_about');

    switch(target){
        case "btn_help" :
            wrap_about.classList.remove('hidden');
            break;
            
        case "btn_close_about" :
            wrap_about.classList.add('hidden');
            break;

        default :
            break;
    }//switch
}//toggle_about