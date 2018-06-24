export const getAnswerFromId = (questionSet, id) => {
    let answer = null;
    questionSet.forEach(question => {
        if(question.id === id) {
            answer = question.value;
            if( question.type === 'bool') {
                answer = question.checked;  // Return bool for boolean questions
            }
            return;
        }
    });
    return answer;
}

export const getQuestionFromId = (questionSet, id) => {
    let foundQuestion = null;
    questionSet.forEach(question => {
        if(question.id === id) {
            foundQuestion = question;
            return;
        }
    });
    if(!foundQuestion) {
        console.log('Warning:  could not find question for id: ', id);
    }
    return foundQuestion;
}

export const formatName = (name, formType) => {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
};

export const getAnswerIndex = question => {
    const answer = question.value;
    return question.selectOptions.indexOf(answer);
}
