import React from "react";
import { MenuItem, SelectField } from 'material-ui';

import ResultsPieChart from './ResultsPieChart';
import StateDropdown from '../../StateDropdown';

import { getAverage } from '../../../utils/footprint/get-average-american-footprint';

const containerStyle = {
    margin: 'auto',
    marginTop: '20px',
    textAlign: 'center'
};

const buttonStyles = { // Buttons to change state, age, gender
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '15px',
    marginTop: '15px'
}

export default class Compare extends React.Component {
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    updateStateDropdown(event, index, value) {
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_STATE', payload: value});
        this.updateAverageAmerican(value, null, null);
    }

    updateAgeDropdown(event, index, value) {
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_AGE', payload: value});
        this.updateAverageAmerican(null, value, null);
    }

    updateGenderDropdown(event, index, value) {
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_GENDER', payload: value});
        this.updateAverageAmerican(null, null, value);
    }

    updateAverageAmerican(stateOrNull, ageOrNull, genderOrNull) {
        const state = stateOrNull || this.props.averageAmericanstate;
        const age = ageOrNull || this.props.age;
        const gender = genderOrNull || this.props.gender;
        const average = getAverage(state, age, gender);
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN', payload: average});
    }
    
	render() {
        console.log('in compare. Average american is', this.props.averageAmerican);
        const res = this.props.results;

        let averageGraphData;
        switch(this.props.category) { // Next switch needs averageGraphData.  So 2 switches ><
            case 'energy':
                averageGraphData = this.props.averageAmerican.energy;
                break;
            case 'co2':
                averageGraphData = this.props.averageAmerican.co2;
                break;
            case 'water':
                averageGraphData = this.props.averageAmerican.water;
                break;
        };
        let averageTotal = parseInt(averageGraphData.total);
        let title;
        let units;
        let subtitle;
        let total;
        switch(this.props.category) {
            case 'energy':
                averageGraphData = this.props.averageAmerican.energy;
                total = res.totalEnergy;
                title = 'Energy';
                units = 'kwhs';
                subtitle = `Total energy: ${averageTotal.toLocaleString()} kwhs per month`;
                break;
            case 'co2':
                averageGraphData = this.props.averageAmerican.co2;
                total = res.totalCo2;
                title = 'Co2';
                units = 'lb/CO2';
                subtitle = `Total Co2: ${averageTotal.toLocaleString()} lb/Co2 per month`;
                break;
            case 'water':
                averageGraphData = this.props.averageAmerican.water;
                total = res.totalWater;
                title = 'Water';
                units = 'gallons';
                subtitle = `Total water: ${averageTotal.toLocaleString()} gallons per month`;
                break;
        }

        const monthlyUse = this.props.monthlyUse;
        const diff = averageTotal - monthlyUse;
        const percentDiff = ((diff/averageTotal) * 100).toFixed(0);
        const comparisonText = percentDiff > 0 ? `Congratulations you use ${percentDiff}% less ${this.props.category} than this average American!` : `You use ${percentDiff * -1}% more ${this.props.category} than this average American`;
        
        // Personal
        const categoryBreakDownData = [
            {source: 'Appliances', amount: parseInt(res.appliance)},
            {source: 'Food', amount: parseInt(res.food)},
            {source: 'Transportation', amount: parseInt(res.transportation) || 0},
        ];

        // Average American Summary
        
        const averageAmerican = [
            {source: 'Appliance', amount: parseInt(averageGraphData.appliance)},
            {source: 'Food', amount: parseInt(averageGraphData.food)},
            {source: 'Transportation', amount: parseInt(averageGraphData.transportation) || 0}
        ];
        
        const genderSelects = ['male', 'female'].map(gender => <MenuItem key={gender} primaryText={this.capitalize(gender)} value={gender} />);

        const ageRanges = ['American Average', '16-19', '20-34', '35-54', '55-64', '65+'];
        const ageSelects = ageRanges.map(age => <MenuItem key={age} primaryText={age} value={age} />);

		return (
            <div style={containerStyle}>
                <div style={{display:'flex'}}>
                    <ResultsPieChart 
                        graphData={categoryBreakDownData} 
                        title={`Your ${title} Breakdown`}
                        subtitle={`Total ${title}: ${monthlyUse.toLocaleString()} ${units} per month`}
                        category={this.props.category}
                        /> 
                    <div id="average-american">
                        <ResultsPieChart 
                            graphData={averageAmerican}
                            title={`Average American ${title} Breakdown`}
                            subtitle={subtitle}
                            category={this.props.category}
                            /> 
                    </div>
                </div>   
                <p style={{marginTop:'15px', marginBottom: '15px'}}>{comparisonText}</p>
                <div id="compare-button-container" style={buttonStyles}>
                    <div>
                        <b style={{marginBottom: '5px'}}>Change State</b>
                        <br />
                        <StateDropdown
                            id="compare-state-dropdown"
                            updateQuestion={this.updateStateDropdown.bind(this)}
                            value={this.props.averageAmericanstate} 
                            subText={''}
                        />
                    </div>
                    <div>
                        <b>Change age group</b>
                        <br />
                        <SelectField 
                            id="age-bracket"
                            menuItemStyle={{fontWeight: 'bold'}}
                            menuStyle={{textAlign: 'center'}}
                            onChange={this.updateAgeDropdown.bind(this)}
                            value={this.props.age}
                        >
                            {ageSelects}
                        </SelectField>
                    </div>
                    <div>
                        <b>Change gender</b>
                        <br />
                        <SelectField 
                            id="gender"
                            menuItemStyle={{fontWeight: 'bold'}}
                            menuStyle={{textAlign: 'center'}}
                            onChange={this.updateGenderDropdown.bind(this)}
                            value={this.props.gender}
                        >
                            {genderSelects}
                        </SelectField>
                    </div>
                </div>
            </div>
		);
	}
};

