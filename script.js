const quesContainer = document.querySelectorAll('.ques__container');

let prevElement,
    rightAnswers = [],
    counter = 0,
    selected = false;

const unfocusElem = (elem) => {
    if (elem != undefined) {
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

const nextQuestion = () => {
    if (prevElement.classList.contains('right')) {
        rightAnswers.push(prevElement);
    }

    quesContainer[counter].style.display = 'none';
     if ((counter + 1) !== 8) {
        quesContainer[counter + 1].style.display = 'flex';
        counter++;
    }
  
    console.log(rightAnswers);
};

const clickHandler = (event) => {
    let target = event.target;

    if (target.classList.contains('next') && selected) {
        nextQuestion();
    }

    if (!target.classList.contains('answ')) {
        selected = false;
        return;
    }

    focusElem(target);
};


document.addEventListener('click', clickHandler);