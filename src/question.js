let Q_NUM = 0;
let TOTAL = {
    num : undefined,
    per : undefined,
    progress : null
};

/* 💙 프로그레스 바 세팅 */
export function set_progress(items){
    TOTAL.num = items.length;
    TOTAL.per = 100 / TOTAL.num;
    change_progress(0);
}//set_progress

export function change_progress(now){
    const txt = document.getElementById('text-progress');
    const barWID = document.getElementById('bar-progress');
    txt.innerText = `${now + 1}/${TOTAL.num}`;
    barWID.style.width = `${TOTAL.per * (now + 1)}%`;
}//change_progress

/* 🧡 질문 세팅 */
export function load_questions(){
    return fetch('./data/question.json')
    .then(res=>res.json())
    .then(data => data.questions);
}//load_questions

export function set_questions(items){
    const ul = document.getElementById('ul-question');

    ul.innerHTML = '';
    
    items.forEach(item => {
        const li = document.createElement('LI');
        li.classList.add('hidden');

        make_q_num(li);
        make_sub(li, item["sub"]);
        make_main(li, item["main"]);
        
        ul.appendChild(li);
    });
    ul.children[0].classList.remove('hidden');
}//set_questions

function make_q_num(li){
    Q_NUM++;
    const num = document.createElement('SPAN');
    num.classList.add('num-question');
    num.innerText = `Q${Q_NUM}.`;
    li.appendChild(num);
}

function make_sub(li, arr){
    if(!arr){return;}
    for(let el of arr){
        const p = document.createElement('P');
        p.innerText = el;
        li.appendChild(p);
    }
}//make_sub

function make_main(li,data){
    const main_p = document.createElement('P');
    main_p.classList.add('main');
    main_p.innerText = data;
    li.appendChild(main_p);
}//make_main

/* 🧡 질문 변경(가리고 숨기는거) */
export function change_question(num){
    const ul_q = document.getElementById('ul-question');
    const all = ul_q.children;
    for(let li of all){li.classList.add('hidden');}
    all[num].classList.remove('hidden');
    all[num].classList.add('show');
}//change_question


/* 💛 답변 세팅 */
export function set_answer_ul(left,right){
    const ul_answer = document.getElementById('ul_answer');
    const LI_LEFT = ul_answer.querySelector('[data-answer="left"]');
    const LI_RIGHT = ul_answer.querySelector('[data-answer="right"]');
    const LI_BOTH = ul_answer.querySelector('[data-answer="both"]');

    change_answer_ul(LI_LEFT,left);
    change_answer_ul(LI_RIGHT,right);
    make_gradient(LI_BOTH,left.color,right.color);
}//set_answer_ul

function change_answer_ul(LI,obj){
    const {name,color} = obj;
    const color_answer = LI.getElementsByClassName('color-answer')[0];
    const name_answer = LI.getElementsByClassName('name-answer')[0];
    color_answer.style.background = color;
    name_answer.innerText = name;
}//change_answer_ul

function make_gradient(LI,c1,c2){
    const color_answer = LI.getElementsByClassName('color-answer')[0];
    color_answer.style.background = `linear-gradient(-45deg,${c2},${c2},${c1},${c1})`;
}//make_gradient