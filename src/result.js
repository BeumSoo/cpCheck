import {reset_dom} from "./general.js";

let NUM_RQ = 0;
let user_answer;
let NOW_DIALOGUE;
let target_MD;

const default_blop = ["말풍선을 수정해보세요!","클릭하면 수정할 수 있어요","이곳에 기본 대화를 입력","말풍선을 없앨수도 있답니다. 말풍선 안의 모든 내용을 지워보세요!","말풍선을 좀 더 추가할 수도 있어요 우측 상단의 연필 버튼을 눌러보세요!","나만의 생각을 작성해보세요...","텍스트를 입력할 수 있어요 ~_~"];
const user_default = [
    "이런 상황에서 뫄뫄는 어떤 말을 할까?",
    "간단하게 당신의 생각을 적어보세요",
    "모든 말풍선은 수정 및 추가·제거 할 수 있어요!",
    "타이틀 옆의 연필버튼을 누르면 말풍선을 좀 더 추가 할 수 있어요."];

let CP = [];

export function set_result_array(arr){
    user_answer = arr;
}//set_result_array

/* 💜 로딩화면 숨기기 */
export function hide_loading(){
    const sect_loading = document.getElementById('sect_loading');
    sect_loading.classList.add('hide_animation');
    setTimeout(()=>{
        sect_loading.classList.add('hidden');
    },1000);
}//hide_loading

/* 💛 타이틀 및 배열 가져오기 */
export function save_CP_info(left,right){
    CP.push(left);
    CP.push(right);
}//save_CP_info

export function set_title_result(){
    const name_left = document.getElementById('result_head-left');
    const name_right = document.getElementById('result_head-right');
    name_left.innerText = CP[0].name;
    name_right.innerText = CP[1].name;
}//set_title_result

/* 💛 본격적인 결과 부분 */
/* 🧡 질문 기본 세팅 */
export function load_main_question(){
    return fetch('./data/question.json')
    .then(res=>res.json())
    .then(data => data.questions);
}//load_main_question

export function set_default_result(arr){
    const sect_result = document.getElementById('sect_result');
    //초기화 합니다
    reset_dom(sect_result);

    //기본 질문 목록을 불러와 세팅합니다.
    for(let mainQ of arr){
        const area = document.createElement('ARTICLE');

        create_rq_title(area,mainQ);
        create_rq_who(area);
        create_rq_dialogue(area);

        sect_result.appendChild(area);
        NUM_RQ++;
    }//for

    //말풍선 지우기 관련 이벤트 위임
    sect_result.addEventListener('keyup',(e)=>{
        if(e.key == "Escape" && e.target.classList.contains('blop')){
            inspect_blop(e.target);
        }
    });
}//set_default_result

function create_rq_title(area,mainQ){
    const rq_title = document.createElement('DIV');
    rq_title.classList.add('rq_title');

    const content = `
    <span class="rq_num">${String(NUM_RQ + 1).padStart(2,"0")}.</span>
    <p class="rq_txt">${mainQ.main}</p>
    <button class="btn_mod_rq" title="말풍선 추가 및 가리기"></button>`;

    rq_title.innerHTML = content;
    area.appendChild(rq_title);
}//create_rq_title

function create_rq_who(area){
    const rq_who = document.createElement('UL');
    rq_who.classList.add('rq_who');

    const li_left = `<li data-who="left"><span class="color"></span>${CP[0].name}</li>`;
    const li_right = `<li data-who="right"><span class="color"></span>${CP[1].name}</li>`;

    switch(user_answer[NUM_RQ]){
        case "left" :
            rq_who.innerHTML = li_left;
            break;
        case "right" :
            rq_who.innerHTML = li_right;
            break;
        case "both" :
            rq_who.innerHTML = li_left + li_right;
            break;
        default :
            break;
    }//switch

    area.appendChild(rq_who);
}//create_rq_who

function create_rq_dialogue(area){
    const rq_dialogue = document.createElement('DIV');
    rq_dialogue.classList.add('rq_dialogue');

    const content = 
    `<div data-who="left" class="DIAL_left">
        <div class="profile_img color"></div>
        <div class="profile_name">${CP[0].name}</div>
        <div class="wrap_blop">
            <div class="blop" contenteditable="true">${get_random_blop(default_blop)}</div>
            <span class="rq_time">${get_time()}</span>
        </div><!-- wrap_blop -->
    </div><!-- DIAL_left -->

    <div data-who="right" class="DIAL_right">
        <div class="profile_img color"></div>
        <div class="profile_name">${CP[1].name}</div>
        <div class="wrap_blop">
            <div class="blop" contenteditable="true">${get_random_blop(default_blop)}</div>
            <span class="rq_time">${get_time()}</span>
        </div><!-- wrap_blop -->
    </div><!-- DIAL_right -->

    <div class="DIAL_user">
        <div class="wrap_blop">
            <div class="blop" contenteditable="true">${get_random_blop(user_default)}</div>
            <span class="rq_time">${get_time()}</span>
        </div>
    </div><!-- DIAL_user -->`;

    rq_dialogue.innerHTML = content;
    area.appendChild(rq_dialogue);
}//create_rq_dialogue

function get_random_blop(arr){
    const min = 0;
    const max = arr.length;
    const random = Math.floor(Math.random() * (max - min));
    return arr[random]; 
}//get_random_blop

function get_time(){
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const final =
        `${hour < 12 ? "오전" : "오후"} ${hour < 12 ? String(hour).padStart(2,"0") :  String(hour - 12).padStart(2,"0")}:${String(min).padStart(2,"0")}`;
    return final;
}//get_time

/* 💖 색깔 일괄 바꾸기 */
export function change_color_all(){
    const all_color_left = document.querySelectorAll('[data-who="left"]');
    const all_color_right = document.querySelectorAll('[data-who="right"]');

    change_color(all_color_left,CP[0].color);
    change_color(all_color_right,CP[1].color);
}//change_color_all

function change_color(dom,color){
    for(let el of dom){
        const this_color = el.getElementsByClassName('color')[0];
        this_color.style.background = color;
    }
}//change_color

/* 💜 연필 누르면 모달창 불러올 수 있게끔 */
export function ready_setting_modal(){
    const sect_result = document.getElementById('sect_result');
    const modal = document.getElementById('sect_modal_wrap');
    const ul_set_blop = document.getElementById('ul_set_blop');

    sect_result.addEventListener('click',(e)=>{
        const target = e.target;
        if(target.classList.contains('btn_mod_rq')){
            inspect_setting_modal(target,ul_set_blop);
            open_setting_modal(target,modal);
        }//연필 버튼 누를시
    });

    modal.addEventListener('click',(e)=>{
        const target = e.target;
        //모달 닫기
        if(target.id == "btn_adjust"){close_setting_modal(modal);}
    });

    ul_set_blop.addEventListener('click',ready_set_blop);
}//ready_setting_modal

function inspect_setting_modal(target,ul){
    const parent = target.parentElement.parentElement
    NOW_DIALOGUE = parent.getElementsByClassName('rq_dialogue')[0];

    const dialogues = NOW_DIALOGUE.querySelectorAll('[class ^= "DIAL_"]');

    for(let i=0; i<dialogues.length; i++){
        const thisColor = ul.children[i].getElementsByClassName('color')[0];
        if(dialogues[i].classList.contains('hidden')){
            thisColor.classList.add('off');
        }else{
            thisColor.classList.remove('off');
        }//if
    }//for
}//inspect_setting_modal

function open_setting_modal(target,modal){
    const num = target.previousElementSibling.previousElementSibling;
    const question = target.previousElementSibling;    
    const num_nowQ = document.getElementById('num-nowQ');
    const txt_nowQ = document.getElementById('txt-nowQ');
    num_nowQ.innerText = num.innerText;
    txt_nowQ.innerText = question.innerText;

    modal.classList.remove('hidden');
}//open_setting_modal

function close_setting_modal(modal){
    modal.classList.add('hidden');
}//close_setting_modal

function ready_set_blop(e){
    e = e || window.event;
    target_MD = e.target;
    
    if(target_MD.tagName == "UL"){return;}

    while(target_MD.tagName != "LI"){
        target_MD = target_MD.parentElement;}
    const this_data = target_MD.dataset.who;

    //toggle blop
    if(e.target.classList.contains('color')){
        toggle_blop(this_data,e.target);
    }//if

    //add blop
    if(e.target.classList.contains('btn_add_blop')){
        add_blop(this_data);
    }//if
}//ready_set_blop

function toggle_blop(data,target){
    const which_blop = `DIAL_${data}`;
    target.classList.toggle('off');
    NOW_DIALOGUE.getElementsByClassName(which_blop)[0].classList.toggle('hidden');
}//toggle_blop

function add_blop(data){
    const which_blop = `DIAL_${data}`;
    const location = NOW_DIALOGUE.getElementsByClassName(which_blop)[0];

    const new_blop = document.createElement('DIV');
    new_blop.classList.add('wrap_blop');
    const content = 
    `<div class="blop" contenteditable="true">${get_random_blop(default_blop)}</div>
    <span class="rq_time">${get_time()}</span>`;
    new_blop.innerHTML = content;

    location.appendChild(new_blop);
}//add_blop

/* 💙 말풍선 삭제 관련 */
function inspect_blop(blop){
    const content = blop.innerText;    
    if(!content){
        const parent = blop.parentElement;
        const ancestor = blop.parentElement.parentElement;
        ancestor.removeChild(parent);
        return;
    }//if
    const rq_time = blop.nextElementSibling;
    rq_time.innerText = `${get_time()}`;
    blop.blur();
}//inspect_blop