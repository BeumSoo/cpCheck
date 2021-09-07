import { display_next_wrap } from "./general.js";
import { change_progress, change_question } from "./question.js";
import { set_result_array, set_title_result, hide_loading, load_main_question, set_default_result, change_color_all, ready_setting_modal} from "./result.js";


let arr_answer = [];
let NOW_NUM = 0;

const ul_animation = 'answer_animation';

export function set_click_answer(len){
    const ul = document.getElementById('ul_answer');
    ul.addEventListener('click', (e)=>on_click_answer(e,len));
}//set_click_answer

function on_click_answer(e,len){
    e = e || window.event;
    const target = e.target;
    if(target.tagName !== "LI"){return;}
    const ul = target.parentElement;

    add_on_li(target);
    add_arr(target.dataset.answer);
    setTimeout(()=>{reset_answer_ul(ul,len)},800);
    ul.classList.add(ul_animation);
    setTimeout(()=>{
        ul.classList.remove(ul_animation);
    },1500);
}//on_click_answer


function add_on_li(target){
    reset_answer_li(target.parentElement);
    target.classList.add('on');
}//add_on_li


function reset_answer_li(parent){
    const all = parent.children;
    for(let li of all){li.classList.remove('on');}
}//reset_answer_li

function add_arr(asw){
    arr_answer.push(asw);
    // console.log(arr_answer);
}//add_arr

function reset_answer_ul(ul,len){
    if(NOW_NUM >= len - 1){
        const now = document.getElementById('wrap_questions');
        const next = document.getElementById('wrap_result');

        //결과화면의 기본적인 틀을 세팅한다.
        set_result_array(arr_answer);
        set_title_result();

        load_main_question()
        .then(arr => {
            set_default_result(arr);
            change_color_all();
            ready_setting_modal();
        })
        .then(()=>{
            //최종적으로 로딩화면으로 넘긴다.
            display_next_wrap(now,next);
            setTimeout(hide_loading, 5000);
        });
        return;
    }//if - 다 했을시 로딩 및 결과로 넘김

    NOW_NUM++;
    change_progress(NOW_NUM);
    change_question(NOW_NUM);
    reset_answer_li(ul);
}//reset_answer_ul