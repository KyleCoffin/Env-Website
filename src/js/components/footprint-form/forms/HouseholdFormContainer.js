import React from "react";
import { array, number, func } from 'prop-types';
import ids from '../../../utils/ids/index';

import { STEPS } from './utils';
import FormTabs from './FormTabs';
import HouseholdFormHome from './HouseholdFormHome';
import HouseholdFormActivities from './HouseholdFormActivites';
import HouseholdFormTemperature from './HouseholdFormTemperature';

import GenericForm from './GenericForm';
import FORMS from './generic-form-data';

import { 
    CoolingIcon,
    LightbulbIcon,
    HouseIcon,
  } from '../../../assets/icons';


const SUB_TABs = [
    {step: STEPS.home, label: 'Home', icon: <HouseIcon size={'24px'} /> },
    {step: STEPS.homeActivities, label: 'Household Activities', icon: <LightbulbIcon size={'24px'} /> },
    {step: STEPS.heatingCooling, label: 'Heating and Cooling', icon: <CoolingIcon size={'24px'} /> },
];

export default class Household extends React.Component {
    static propTypes = {
        questions: array.isRequired,
        step: number.isRequired,
        dispatch: func.isRequired
    }

	render() {
        let form;
        let title;
        switch(this.props.step) {
            case STEPS.home: 
              form = (<GenericForm {...FORMS.HOME_FORM} />);
              title = 'Home';
              break;
            case STEPS.homeActivities: 
            form = (<GenericForm {...FORMS.HOME_ACTIVITY_FORM} />);
              title = 'Household Activities';
              break;
            case STEPS.heatingCooling: 
              form = (<HouseholdFormTemperature questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
              title = 'Heating and Cooling';
              break;
            default:
                throw new Error('Step did not match a form in Household.', step);
          };
		return (
            <div>
                <FormTabs dispatch={this.props.dispatch} step={this.props.step} tabs={SUB_TABs} subLevel={true} />
                <h3 className="footprint-form-header">{title}</h3>
                {form}
            </div>
		);
	}
};



