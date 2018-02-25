import React from "react";
import { MenuItem, SelectField } from 'material-ui';

import { updateQuestions} from '../../../actions/footprint/form-actions';
import { updateCostsQuestions} from '../../../actions/cost-forms/costs-actions';

export default class DropdownQuestion extends React.Component {

    formatName(name) {
        name = name.replace(/-/g,' ');
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
    }

    updateQuestion(id, event, index, value) {
        if(this.props.formType && this.props.formType === 'costs') { // There is only 1 form type for now.
            this.props.dispatch(updateCostsQuestions({id, value}));
        } else { // Do footprint form
            this.props.dispatch(updateQuestions({id, value}));
        }
    }

	render() {
		const options = this.props.selectOptions;
        const dropDownOptions = options.map(option => {
            return <MenuItem 
                key={option}
                primaryText={this.formatName(option)}
                value={this.formatName(option)}  
            />
        });
        const marginLeft = this.props.marginLeft ? this.props.marginLeft : '10px';
        
        return (
            <div>
                <p className="footprint-form-sub-header" style={{marginLeft}}>{this.formatName(this.props.name)}</p>
                <SelectField
                    id={this.props.id}
                    menuItemStyle={{fontWeight: 'bold'}}
                    onChange={this.updateQuestion.bind(this, this.props.id)}
                    value={this.props.value}
                >
                    {dropDownOptions}
                </SelectField>
            </div>
		);
	}
};
