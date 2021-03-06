import { getQuestionFromId } from '../../utils/footprint/get-question-utils';
import { updateQuestionSet } from '../../utils/footprint/update-question-set';
import { getValidatorFromStep } from '../../components/footprint-form/forms/utils';
import triggers, { TRIGGER_QUESTION_IDS } from './triggers/trigger-router';

// Actions

export const changeStep = (current, toStep) => {
    return dispatch => {
        const validator = getValidatorFromStep(current);
        const validation = dispatch(validator());
        dispatch({type: 'SET_ERROR_QUESTIONS', payload: validation.errorQuestions})
        if(!validation.valid) {
            dispatch(updateErrorQuestions(validation.errorQuestions));
        } else {
            dispatch({type: 'SET_STEP', payload: toStep});
            location.href = '#'; // Solves a bug in safari or something
            location.href = '#form-tabs';
        }
    }
 }

 export const updateErrorQuestions = ids => {
    return (dispatch, getState) => {
        const questions = getState().questions.questions;
        ids.forEach(id => {
            if(id === -1) {
                return;
            }
            const question = getQuestionFromId(questions, id);
            question.errorText = question.errorText ? question.errorText : 'Please answer the question correctly';
            dispatch(updateQuestionsV2(question));
        });
        const topId = ids[0];
        location.href = "#"; // Solves a bug in safari or something
        location.href = `#question-${topId}`;
    }
 }

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
        const updatedQuestionSet = updateQuestionSet(allQuestions, questionInfo);
        dispatch({type: 'UPDATE_QUESTIONS', payload: updatedQuestionSet});
        if(questionInfo.id === 1046) {
            dispatch({type: 'UPDATE_USER_STATE', payload: questionInfo.value});
        }

        // Triggers should happen after all other updates have gone through.
        if( TRIGGER_QUESTION_IDS.includes(parseInt(questionInfo.id)) && question.trigger) {
            if(questionInfo.value) {
                triggers({  // All triggers should directly interact with state to modify stuff
                    dispatch,
                    getState,
                    triggerCode: question.trigger,
                    allQuestions,
                    question
                });
            } 
        }
    }
};
