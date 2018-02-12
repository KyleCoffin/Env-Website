export const getAnswerFromKey = (questionSet, key) => {
    let answer = null;
    questionSet.forEach(question => {
        if(question.name === key) {
            answer = question.value;
            return;
        }
    });
    return answer;
}

export const getAnswerFromId = (questionSet, id) => {
    let answer = null;
    questionSet.forEach(question => {
        if(question.id === id) {
            answer = question.value;
            return;
        }
    });
    return answer;
}

export const getQuestionFromKey = (questionSet, key) => {
    let foundQuestion = null;
    questionSet.forEach(question => {
        if(question.name === key) {
            foundQuestion = question;
            return;
        }
    });
    return foundQuestion;
}

export const isValidateAnswer = (questionSet, key, condition) => {
    let valid = true;
    let question = getQuestionFromKey(questionSet, key);
    if(question.hidden) {
        return true;  // If question is hidden i dont need to validate.
    }
    const value = question.value;
    if(condition === '>0') {
        if(!value || value < 0 || value == 0) { // only == in case of string "0"
            valid = false;
        }
    } else if (condition === 'not null') {
        if (value === null || value === undefined || value === '') { // Not doing !value for 0 values
            valid = false;
        }
    }
    return valid;
}