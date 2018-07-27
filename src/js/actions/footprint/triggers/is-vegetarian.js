import ids from '../../../utils/ids/index';

const NON_VEGETARIAN_QUESTIONS = [ ids.beefFrequency, ids.chickenFrequency, ids.porkFrequency, ids.seafoodFrequency ];

export default (allQuestions) => {
    let modifiedQuestions = allQuestions.map(question => {
        if (NON_VEGETARIAN_QUESTIONS.indexOf(question.id) !== -1) {
            question.hidden = true;
            question.value = 'Never'; // Magic string needs to be in sync with question answers
            question.index = 0;
        }
        return question;
    });
    return modifiedQuestions;
};
