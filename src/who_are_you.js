import {display_next_wrap, display_user_name} from "./general.js";
let user_name;

export function who_are_you(){
    const ipt_user = document.getElementById('ipt_user');
    const btn_user = document.getElementById('btn_user');
    

    ipt_user.addEventListener('keyup',(e)=>{
        if(e.key == "Enter"){ save_user_name(ipt_user);}
    });
    btn_user.addEventListener('click',()=>save_user_name(ipt_user));
}//who_are_you

function save_user_name(ipt){
    user_name = ipt.value;
    if(!user_name){user_name = "익명";}
    localStorage.setItem('user_name',user_name);    

    const now = document.getElementById('wrap_who_are_you');
    const next = document.getElementById('wrap_couple_name');
    display_next_wrap(now,next);
    display_user_name(user_name);
}//save_user_name

