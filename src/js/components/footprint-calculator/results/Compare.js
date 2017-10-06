import React from "react";

import ResultsPieChart from './ResultsPieChart';
import StateDropdown from '../../StateDropdown';

import { getAverage } from '../../../utils/footprint/get-average-american-footprint';

const containerStyle = {
    margin: 'auto',
    textAlign: 'center'
};

const buttonStyles = { // Buttons to change state, age, gender
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '15px',
    marginTop: '15px'
}

export default class Compare extends React.Component {
    constructor(props) {
	    super();
        this.state = {
            state: 'US',
            age: 'average',
            gender: 'male'
        }
        this.updateQuestion = this.updateQuestion.bind(this);
	}

    updateQuestion(e) {
        const id = e.target.id;
        const value = document.getElementById(id).value;
        if(id === 'compare-state-dropdown') {
            this.setState({state: value});
        } else if( id === 'age-bracket') {
            this.setState({age: value});
        } else if(id === 'gender') {
            this.setState({gender: value});
        } else {
            console.log('Error on the Compare component.  Unexpected id in updateQuestion');
        }
    }

	render() {
        const averageGraphData = getAverage(this.state.state, this.state.age, this.state.gender);

        const monthlyUse = this.props.monthlyUse;
        const averageTotal = parseInt(averageGraphData.total);
        const diff = averageTotal - monthlyUse;
        const percentDiff = ((diff/averageTotal) * 100).toFixed(0);
        const comparisonText = percentDiff > 0 ? `Congratulations you use ${percentDiff}% less energy than this average American!` : `You use ${percentDiff * -1}% more energy than this average American`;
        

        const res = this.props.results;
        // Personal
        const categoryBreakDownData = [
            {source: 'Appliances', amount: parseInt(res.appliance)},
            {source: 'Food', amount: parseInt(res.food)},
            {source: 'Transportation', amount: parseInt(res.transportation)},
        ];

        // Average American Summary
        const averageAmerican = [
            {source: 'Appliance', amount: parseInt(averageGraphData.appliance)},
            {source: 'Food', amount: parseInt(averageGraphData.food)},
            {source: 'Transportation', amount: parseInt(averageGraphData.transportation)}
        ];
        const subtitle = `Total energy: ${averageTotal.toLocaleString()} kwhs per month`;
        
		return (
            <div style={containerStyle}>
                <div style={{display:'flex'}}>
                    <ResultsPieChart 
                        graphData={categoryBreakDownData} 
                        title={'Your Energy Breakdown'}
                        subtitle={`Total energy: ${this.props.results.totalEnergy.toLocaleString()} kwhs per month`} 
                        /> 
                    <div id="average-american">
                        <ResultsPieChart 
                            graphData={averageAmerican} 
                            title={'Average American Energy Breakdown'} 
                            subtitle={subtitle}
                            /> 
                    </div>
                </div>   
                <p style={{marginTop:'15px', marginBottom: '15px'}}>{comparisonText}</p>
                <div id="compare-button-container" style={buttonStyles}>
                    <div>
                        <b style={{marginBottom: '5px'}}>Change State</b>
                        <br />
                        <StateDropdown id="compare-state-dropdown" updateQuestion={this.updateQuestion} selected={this.state.state} />
                    </div>
                    <div>
                        <b>Change age group</b>
                        <br />
                        <select id="age-bracket" onChange={this.updateQuestion.bind(this)} >
                            <option key={'american-average'} value={'average'}>American average</option>
                            <option key={'16-19'} value={'16-19'}>16-19</option>
                            <option key={'20-34'} value={'20-34'}>20-34</option>
                            <option key={'35-54'} value={'35-54'}>35-54</option>
                            <option key={'55-64'} value={'55-64'}>55-64</option>
                            <option key={'65+'} value={'65+'}>65+</option>
                        </select> 
                    </div>
                    <div>
                        <b>Change gender</b>
                        <br />
                        <select id="gender" onChange={this.updateQuestion.bind(this)} >
                            <option key={'change-male'} value={'male'}>Male</option>
                            <option key={'change-female'} value={'female'}>Female</option>
                        </select> 
                    </div>
                </div>
            </div>
		);
	}
};

