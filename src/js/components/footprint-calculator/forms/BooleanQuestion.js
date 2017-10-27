import React from "react";

import { updateQuestions} from '../../../actions/footprint/form-actions';

export default class Question extends React.Component {

    formatName(name) {
        name = name.replace(/-/g,' ');
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
    }

    updateQuestion(e) {
        const id = e.target.id;
        let value = document.getElementById(id).value;
        value = this.props.checked && value === 'on' ? 'off' : 'on';
        this.props.dispatch(updateQuestions(id, value));
    }

	render() {
        const input = this.props.checked ? (
            <input id={this.props.id} type="checkbox" onChange={this.updateQuestion.bind(this)} checked="checked"/>
        ) : (
            <input id={this.props.id} type="checkbox" onChange={this.updateQuestion.bind(this)} />
        );
		const textWidth = this.props.textWidth ? this.props.textWidth : '250px';
        const textStyle = {width: textWidth, display: 'inline-block'}
        return (
            <li style={{marginTop: '6px'}}>
                <div>
                    <div style={textStyle}>{this.formatName(this.props.question.name)} </div>
                    {input}
                </div>
            </li>
		);
	}
};
