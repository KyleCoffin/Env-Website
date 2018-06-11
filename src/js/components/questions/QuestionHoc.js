import React from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import IntQuestion from './IntQuestion';
import DropdownQuestion from './DropdownQuestion';
import BooleanQuestion from './BooleanQuestion';
import MultipleQuestion from './MultipleQuestion';
import UserStateDropdown from '../UserStateDropdown';


import { setQuestionError, updateQuestions, updateQuestionsV2} from '../../actions/footprint/form-actions';
import { updateCostsQuestions} from '../../actions/cost-forms/costs-actions';
import { getErrorText } from '../../utils/footprint/question-validators';


@connect((store, props) => {
	return {
		isMobile: store.userInfo.isMobile,
	};
})
export default class QuestionHoc extends React.Component {
    static proptypes = {
        
        // Routing
        questionType: PropTypes.string.isRequired, 
        question: PropTypes.object.isRequired,
        value: PropTypes.string
    }

	render() {
        const updateFunction = updateQuestionsV2;//this.props.question.formType && this.props.question.formType === 'costs' ? updateCostsQuestions.bind(this) : updateQuestions.bind(this);
        let question;
        switch(this.props.questionType) {
            case 'int':
                question = <IntQuestion {...this.props} updateFunction={updateFunction} />;
                break;
            case 'bool':
                question = <BooleanQuestion {...this.props} updateFunction={updateFunction} />;
                break;
            case 'dropdown':
                question = <DropdownQuestion {...this.props} updateFunction={updateFunction} />;
                break;
            case 'multiple':
                question = <MultipleQuestion {...this.props} updateFunction={updateFunction} />;
                break;
            case 'user-state':
                question = <UserStateDropdown omitUs={this.props.question.omitUs} />
                break;
            default:
                console.log('Error.  Bad question type', this.props);
        };
        if (question.hidden) {
            question = null;
        }
		return (
            <div>
                { question }
            </div>
        );
    }
};
