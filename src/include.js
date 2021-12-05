import {display_about} from "./header.js";
import {who_are_you} from "./who_are_you.js";
import { couple_name } from "./couple_name.js";
import { load_questions, set_progress, set_questions } from "./question.js";
import { set_click_answer } from "./answer.js";
// import { capture_browser } from "./capture.js";

export function includeHTML(){
    let includeArea = document.querySelectorAll('[data-include]');

    for(let dom of includeArea){
        const url = dom.dataset.include;

        fetch(url)
        .then(res => res.text())
        .then(data =>{
            dom.innerHTML = data;
            dom.removeAttribute('data-include');

            switch(dom.id){
                case "header" :
                    display_about();
                    break;

                case "wrap_who_are_you" :
                    who_are_you();
                    break;
                
                case "wrap_couple_name" :
                    couple_name();
                    break;

                case "wrap_questions" :
                    load_questions()
                    .then(items => {
                        set_progress(items);
                        set_questions(items);
                        set_click_answer(items.length);
                    });
                    break;
                
                case "wrap_result" :
                    //화면 캡쳐 관련 이벤트 위임
                    // const btn_capt = document.getElementById('btn_capt');
                    // btn_capt.addEventListener('click',capture_browser);
                    break;
                    
                default : break;
            }//switch
        });//fetch 
    }//for
}//includeHTML