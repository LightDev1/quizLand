const quesContainer = document.querySelectorAll('.ques__container'),
    resultContainer = document.querySelector('.result__container'),
    resultText = document.querySelector('.result__text'),
    rightsContainer = document.querySelector('.right__answers'),
    rightsBtn = document.querySelector('.show');

let prevElement,
    rightAnswers = [],
    counter = 0,
    selected = false;

const unfocusElem = (elem) => {
    if (elem) {
        elem.style.backgroundColor = '';
        elem.style.borderRadius = '';

        selected = false;
    } 
};

const focusElem = (elem) => {   
    if (elem !== prevElement) {
        unfocusElem(prevElement);
    }

    elem.style.backgroundColor = '#71B0FF';
    elem.style.borderRadius = 10 + 'px';

    prevElement = elem;

    selected = true;
};

const showRights = (target) => {
    let div = document.createElement('div');
    div.classList.add('rights');
    div.style.cssText = `
            color: #808592;
            font-size: 18px;
    `;

    let list = `
            1. JavaScript;<br>
            2. Динамическая;<br>
            3. ECMAScript;<br>
            4. ECMAScript 6 (2015);<br>
            5. Сamel case;<br>
            6. Оба варианта верны;<br>
            7. 1;
    `;
    
    div.innerHTML = list;

    if (!rightsBtn.classList.contains('showed')) {
        rightsBtn.textContent = 'Скрыть ответы';
        rightsBtn.classList.add('showed');
        rightsContainer.appendChild(div); 
    } else {
        document.querySelector('.rights').remove();
        rightsBtn.classList.remove('showed');
        rightsBtn.textContent = 'Показать ответы';
    }

    
};

const showResults = () => {
    quesContainer[counter].style.display = 'none';
    resultContainer.style.display = 'flex';

    resultText.textContent = `${rightAnswers.length} из 7`;
};

const returnBack = () => {
    counter = 0;
    resultContainer.style.display = 'none';
    quesContainer[counter].style.display = 'flex';
    rightAnswers = [];
};

const nextQuestion = (target) => {
    if (prevElement.classList.contains('right')) {
        rightAnswers.push(prevElement);
    }

    quesContainer[counter].style.display = 'none';
     if (counter + 1 !== 7) {
        quesContainer[counter + 1].style.display = 'flex';
        counter++;
    }

    if (target.classList.contains('ready')) {
        showResults();
    }

};

const clickHandler = (event) => {
    let target = event.target;

    if (target.classList.contains('next') && selected) {
        nextQuestion(target);
    }

    if (target.classList.contains('complete')) {
        returnBack();
    }

    if (target.classList.contains('show')) {
        showRights(target);
    }

    if (!target.classList.contains('answ')) {
        selected = false;
        return;
    }

    focusElem(target);
};

document.addEventListener('click', clickHandler);