import {display_next_wrap} from "./general.js";
import { set_answer_ul } from "./question.js";
import { save_CP_info } from "./result.js";

export function couple_name(){
    const form_cp = document.getElementById('form_couple_name');
    form_cp.addEventListener('submit',set_cp_name);
}//couple_name

function set_cp_name(e){
    e = e || window.event;
    e.preventDefault();
    const left = {
        name : document.getElementById('name-left').value,
        color : document.getElementById('color-left').value
    }
    const right = {
        name : document.getElementById('name-right').value,
        color : document.getElementById('color-right').value
    }

    const now = document.getElementById('wrap_couple_name');
    const next = document.getElementById('wrap_questions');
    
    display_next_wrap(now,next);
    set_answer_ul(left,right);
    save_CP_info(left,right);

    
}//set_cp_name

