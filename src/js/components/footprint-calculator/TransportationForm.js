import React from "react";
import Question from './Question';
import BooleanQuestion from './BooleanQuestion';

// const formQuestions = [
//     {
//         name: 'Whats the MPG of you car?',
//         "use-type": "transportation"
//     },
//     {
//         name: 'How many miles do you drive for work/school/errands each week?',
//         "use-type": "transportation"
//     },
//     {
//         name: 'Do you carpool?',
//         "use-type": "transportation",
//         useBool: true
//     },
//     {
//         name: 'How many miles do you bus for work/school/errands each week?',
//         "use-type": "transportation"
//     },
//     {
//         name: 'Within the last year, how many times did you take a roadtrip?',
//         "use-type": "transportation"
//     },
//     {
//         name: 'Do you usually carpool for roadtrips?',
//         "use-type": "transportation",
//         useBool: true
//     },
//     {
//         name: 'How many far is your average roadtrip?',
//         "use-type": "transportation"
//     },
//     {
//         name: 'Within the last year, how many miles did you fly?',
//         "use-type": "transportation"
//     }
// ];

export default class TransportationForm extends React.Component {

    constructor(props) {
	    super();
        this.updateQuestion = this.updateQuestion.bind(this)
        this.updateQuestionBool = this.updateQuestionBool.bind(this)
	}

    updateQuestion(e) {
        let id = e.target.id;
		let value = document.getElementById(id).value;
        value = parseInt(value) >= 0 ? value : 0; // Only counts numbers
        this.props.updateData('transportation', id, value)
    }
    updateQuestionBool(e) {
        let id = e.target.id;
		let value = document.getElementById(id).checked;
        this.props.updateData('transportation', id, value)
    }

	render() {
        const subCategory = {
            fontWeight: 'bold',
            textAlign: 'center'
        };
        const questionsStyle = {
            textAlign: 'left',
            marginLeft: '15px',
            marginTop: '5px',
            marginBottom: '5px'
        };
        const textWidth = '350px';
        const questions = this.props.questions.map(question => {
                let value = this.props.getQuestionValue(question, 'transportation');
                if(question.useBool) {
                    let checked = value ? 'checked' : 'unchecked';
                    return (<BooleanQuestion key={question.name} id={question.name} question={question} updateQuestion={this.updateQuestionBool} checked={checked} textWidth={textWidth}  />)
                }
                return (<Question key={question.name} id={question.name} question={question} updateQuestion={this.updateQuestion} value={value} textWidth={textWidth} />);
            });
		return (
            <div>
            <h3 style={subCategory}>Transportation</h3>
                <div style={questionsStyle}>
                    What are your travel habits
                    <ul>
                        {questions}
                    </ul>
                </div>
            </div>
		);
	}
};
