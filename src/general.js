export function display_next_wrap(now,next){
    now.classList.remove('show');
    now.classList.add('hide_animation');

    setTimeout(()=>{
        now.classList.add('hidden');
        next.classList.remove('hidden');
        next.classList.add('show');
    },500);
}//display_next_wrap

export function display_user_name(name){
    const dom = document.getElementsByClassName('user_name');
    for(let el of dom){el.innerText = name;}
}//display_user_name

export function reset_dom(dom){
    dom.innerHTML = '';
}//reset_dom