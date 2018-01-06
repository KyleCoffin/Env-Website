import React from "react";
import { connect } from 'react-redux';

import { RaisedButton } from 'material-ui';

import Header from '../../components/Header';

import ResultsPieChart from '../../components/footprint-calculator/results/ResultsPieChart';
import ResultOptionButtons from '../../components/footprint-calculator/results/ResultOptionButtons';
import PersonalBreakdown from '../../components/footprint-calculator/results/PersonalBreakdown';
import Compare from '../../components/footprint-calculator/results/Compare';
import Savings from '../../components/footprint-calculator/results/Savings';
import Facts from '../../components/footprint-calculator/results/Facts';
import HowMuchCo2 from '../../components/footprint-calculator/results/HowMuchCo2';

@connect((store, props) => {
	return {
        questions: store.footprintForm.questions,
        userState: store.footprintFormAnswers.userState,
        results: store.footprintFormAnswers.formResults,
        resultsShown: store.footprintFormAnswers.resultsShown,
		averageAmerican: store.footprintFormAnswers.averageAmerican,
		averageAmericanState: store.footprintFormAnswers.averageAmericanState,
		averageAmericanAge: store.footprintFormAnswers.averageAmericanAge,
        averageAmericanGender: store.footprintFormAnswers.averageAmericanGender
	};
})
export default class Results extends React.Component {
	render() {
        const res = this.props.results;
        const monthlyEnergyUse = parseInt(res.energy.totalEnergy);
        const monthlyCo2Use = parseInt(res.co2.totalCo2);
        const monthlyWaterUse = parseInt(res.water.totalWater);
        let shownResults;
        switch(this.props.resultsShown) {
            case 'energy-personalBreakdown':
                shownResults = <PersonalBreakdown 
                    results={this.props.results.energy} 
                    category={'energy'}
                    />;
                break;
            case 'co2-personalBreakdown':
                shownResults = <PersonalBreakdown 
                    results={this.props.results.co2} 
                    category={'co2'}
                    />;
                break;
            case 'water-personalBreakdown':
                shownResults = <PersonalBreakdown 
                    results={this.props.results.water} 
                    category={'water'}
                    />;
                break;
            case 'energy-compare':
                shownResults = <Compare 
                                    results={this.props.results.energy}
                                    averageAmerican={this.props.averageAmerican}
                                    averageAmericanstate={this.props.averageAmericanState}
                                    age={this.props.averageAmericanAge}
                                    gender={this.props.averageAmericanGender}
                                    monthlyUse={monthlyEnergyUse}
                                    dispatch={this.props.dispatch}
                                    category={'energy'}
                                />;
                break;
            case 'co2-compare':
                shownResults = <Compare 
                                    results={this.props.results.co2}
                                    averageAmerican={this.props.averageAmerican}
                                    averageAmericanstate={this.props.averageAmericanState}
                                    age={this.props.averageAmericanAge}
                                    gender={this.props.averageAmericanGender}
                                    monthlyUse={monthlyCo2Use}
                                    dispatch={this.props.dispatch}
                                    category={'co2'}
                                />;
                break;
            case 'water-compare':
                shownResults = <Compare 
                                    results={this.props.results.water}
                                    averageAmerican={this.props.averageAmerican}
                                    averageAmericanstate={this.props.averageAmericanState}
                                    age={this.props.averageAmericanAge}
                                    gender={this.props.averageAmericanGender}
                                    monthlyUse={monthlyWaterUse}
                                    dispatch={this.props.dispatch}
                                    category={'water'}
                                />;
                break;
            case 'energy-savings':
                shownResults = <Savings 
                    results={this.props.results}
                    category={'energy'}
                />
                break;
            case 'co2-savings':
                shownResults = <Savings 
                    results={this.props.results}
                    questions={this.props.questions}
                    category={'co2'}
                />
                break;
            case 'water-savings':
                shownResults = <Savings 
                    results={this.props.results}
                    questions={this.props.questions}
                    category={'water'}
                />
                break;
        }

		return (
            <div className="container-fluid text-center">
				<Header />
                <div className="results">
                    <h1><b>My environmental footprint</b></h1>
                    <h2>I use <b>{monthlyEnergyUse.toLocaleString()} kwhs</b> each month.  This releases <b>{monthlyCo2Use.toLocaleString()}</b> pounds of CO<sub>2</sub>.  <b>{monthlyWaterUse.toLocaleString()}</b> gallons of water are used to support my lifestyle.</h2>
                    <div>
                        <HowMuchCo2 co2={monthlyCo2Use} averageAmerican={this.props.averageAmerican.co2.total} />
                        <h2><b>Lets dive a little deeper</b></h2>
                        <ResultOptionButtons dispatch={this.props.dispatch} />
                    </div>
                    
                    {shownResults}
                    <br />
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <a href="/how-your-footprint-was-calculated" target="_blank"><RaisedButton label="How I got these results" backgroundColor={"lightgrey"} /></a>
                    </div>
                    <br />
                    <br />
                    
                    <Facts />
                </div>
            </div>
		);
	}
};
