import React from "react";
import Question from './Question';

import { TextField } from 'material-ui';

export default class HeatingCoolingForm extends React.Component {

	render() {
        const questions = this.props.questions.map(question => {
            let value = question.value;
            return (<Question 
                errorText={question.errorText || ''}
                key={question.name} 
                id={question.name} 
                question={question} 
                value={value} 
                subtext={question.subtext} 
                dispatch={this.props.dispatch}
                validator={question.validator}
                />);
            });
		return (
            <div>
            <h3 className="footprint-form-header">Heating and Cooling</h3>
                <div >
                    <p className="footprint-form-sub-header">How many hours a day do you use the following?</p>
                    <ul>
                        {questions}
                    </ul>
                </div>
            </div>
		);
	}
};
