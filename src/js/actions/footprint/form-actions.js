import calculateFootprintSubmit from '../../utils/footprint/calculate-footprint-submit';
import { isValidateAnswer, getAnswerFromKey, getQuestionFromKey, getQuestionFromId } from '../../utils/footprint/get-question-utils';
import { updateQuestionSet } from '../../utils/footprint/update-question-set';
import triggers from './triggers/trigger-router';

// Utils. . . maybe make own file eventually?

const validateForm = questions => {
    let valid = true;
    const missingQuestions = [];

    const fuel = isValidateAnswer(questions, "What's the fuel for your car?", 'not null');
    const mpg = isValidateAnswer(questions, "What\'s the MPG of your car?", '>0');
    const commute = isValidateAnswer(questions, "On average, how many miles do you drive for work, school, and errands each day?", 'not null');
    const roadTripTimes = isValidateAnswer(questions, 'Within the last year, how many times did you take a roadtrip or drive for an extended distance?', 'not null');
    const roadTripDistance = isValidateAnswer(questions, 'How far is your average roadtrip?', '>0');
    const busMiles = isValidateAnswer(questions, 'How many miles do you bus each month?', 'not null');
    const trainMiles = isValidateAnswer(questions, 'How many miles do you ride on the train each month?', 'not null');
    const fly = isValidateAnswer(questions, 'Within the last year, how many miles did you fly?', 'not null');
    let question;
    if(!fuel) {
        question = getQuestionFromKey(questions, "What's the fuel for your car?");
        question.errorText = 'Please submit an answer.';
        missingQuestions.push(question);
        valid = false;
    }
    if(!mpg) {
        question = getQuestionFromKey(questions, "What\'s the MPG of your car?");
        question.errorText = 'Please submit an answer.';
        missingQuestions.push(question);
        valid = false;
    }
    if(!commute) {
        question = getQuestionFromKey(questions, "On average, how many miles do you drive for work, school, and errands each day?");
        question.errorText = 'Please submit an answer.';
        missingQuestions.push(question);
        valid = false;
    }
    if(!roadTripTimes) {
        question = getQuestionFromKey(questions, "Within the last year, how many times did you take a roadtrip or drive for an extended distance?");
        question.errorText = 'Please submit an answer.';
        missingQuestions.push(question);
        valid = false;
    }
    if(!roadTripDistance) {
        question = getQuestionFromKey(questions, "How far is your average roadtrip?");
        question.errorText = 'Please submit an answer.';
        missingQuestions.push(question);
        valid = false;
    }
    if(!fly) {
        question = getQuestionFromKey(questions, "Within the last year, how many miles did you fly?");
        question.errorText = 'Please submit an answer.';
        missingQuestions.push(question);
        valid = false;
    }
    if(!busMiles) {
        question = getQuestionFromKey(questions, 'How many miles do you bus each month?');
        question.errorText = 'Please submit an answer.';
        missingQuestions.push(question);
        valid = false;
    }
    if(!trainMiles) {
        question = getQuestionFromKey(questions, 'How many miles do you ride on the train each month?');
        question.errorText = 'Please submit an answer.';
        missingQuestions.push(question);
        valid = false;
    }

    if(!valid) {
        console.log('missing questions', missingQuestions);
        return { valid: false, questions};
    }
    return { valid: true};
};


//
//
//
// Actions

// For footprint form
export const updateQuestions = questionInfo => {
    return (dispatch, getState) => {
        const state = getState();
        const allQuestions = state.footprintForm.questions.slice();
        const updatedQuestionSet = updateQuestionSet(allQuestions, questionInfo);
        dispatch({type: 'UPDATE_QUESTIONS', payload: updatedQuestionSet});
    }
};

export const updateQuestionsV2 = questionInfo => {
    return (dispatch, getState) => {
        const state = getState();
        let allQuestions = state.questions.questions.slice();
        const question = getQuestionFromId(allQuestions, questionInfo.id);
        if(questionInfo.value === 'on' && question.trigger) { // Right now triggers just modify other questions.  ONLY for boolean questions
            allQuestions = triggers(allQuestions, question.trigger);
        }
        const updatedQuestionSet = updateQuestionSet(allQuestions, questionInfo);
        dispatch({type: 'UPDATE_QUESTIONS', payload: updatedQuestionSet});
    }
};


export const submitForm = questionPayload => {
    return (dispatch, getState) => {
        const {valid, questions} = validateForm(questionPayload);  
        const store = getState();
        const state = store.footprintFormAnswers.userState;
        const answerId = store.footprintFormAnswers.answerId;

        if (valid) {
            const payload = {
                questions: questionPayload,
                state
            };
            const footprintResults = calculateFootprintSubmit(payload);
            if(answerId) {
                console.log('i will do an update not a post');
            } else {
                fetch('/api/footprint-form/answer', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        formName: 'footprint-finder',
                        formAnswers: questionPayload,
                        results: footprintResults
                    })
                })
                .then(res => res.json())
                .then(res => {
                    dispatch({type: 'SET_FORM_ANSWER_ID', payload: res['_id']});   
                });
            }
            dispatch({type: 'SUBMIT_READY', payload: true})
            dispatch({type: 'SUBMIT_FORM_RESULTS', payload: footprintResults});
            dispatch({type: 'DISPLAY_ANSWERS', payload: true});
            
        } else {
            dispatch({type: 'UPDATE_QUESTIONS', payload: questions});
            dispatch({type: 'SUBMIT_READY', payload: false})
            console.log('failed validation');
        }
    }
};
