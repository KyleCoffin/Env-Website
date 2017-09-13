import React from "react";
import _ from 'lodash';


import ApplianceForm from './ApplianceForm';
import HouseholdForm from './HouseholdForm';
import FoodForm from './FoodForm';
import TransportationForm from './TransportationForm';

import calculateFootprintSubmit from '../../../utils/footprint/calculate-footprint-submit';

export default class FootprintForm extends React.Component {
	constructor(props) {
		super();
    this.getQuestionValue = this.getQuestionValue.bind(this)
    this.updateData = this.updateData.bind(this)
    
    this.state = {
        data: props.data,
        step: 1,
        maxSteps: 4
    }
	}
  componentDidMount() {
        // The data fetch should happen in a HOC, not here
        console.log('Getting Questions');
        fetch('/data/temp-footprint-questions.json')
        .then(response => {
          return response.json()
        })
        .then( response => {
          const allQuestions = response.questions;
          const applianceHour = _.filter(allQuestions, function(o) { return o['use-type'] === 'hour'; });
          const houseHoldQuestions = _.filter(allQuestions, function(o) { return o['use-type'] === 'monthly-own' || o['use-type'] === 'monthly-use'; });
          const foodQuestions = _.filter(allQuestions, function(o) { return o['use-type'] === 'serving'; });
          const transportation = _.filter(allQuestions, function(o) { return o['use-type'] === 'transportation'; });

          this.setState({
            allQuestions,
            applianceHour,
            houseHoldQuestions,
            foodQuestions,
            transportation
          });
          console.log('state has been set');
        });
  };

    getQuestionFromName(name) {
      let question = _.filter(this.state.allQuestions, function(o) { return o.name === name; });
      return question[0];
    }

    getQuestionValue(question, questionGroup) {
		  let group = this.state.data[questionGroup]
      if(group && group[question.name]) {
            return question.value;
      }
      return '';
    }
    

    updateData(questionGroup, questionName, value) {
      let data = this.state.data;
      let dataGroup = data[questionGroup];
      let question = dataGroup[questionName];
      if (question) {
        question.value = value;
      } else {
        question = this.getQuestionFromName(questionName)
        dataGroup[questionName] = question;
        dataGroup[questionName].value = value;
      }
      this.setState({data});
    }

    validateData() {
      let transportData = this.state.data.transportation;
      let transportationQuestions = _.filter(this.state.transportation, function(o) { return o['useBool'] !== true; })
        .map(question => question.name);
      let missingQuestions = [];
      transportationQuestions.forEach(question => {
        if(!transportData[question] || transportData[question].value === '') {
          if(transportData["What's the fuel for your car?"].value !== 'Electric' || question !== 'What\'s the MPG of your car?') {
            missingQuestions.push(question);
          }
        }
      });

      if(transportData['What\'s the MPG of your car?'] && transportData['What\'s the MPG of your car?'].value == 0) {
          return false;
        }
      if(missingQuestions.length > 0) {
        return false;
      }
      return true;

  }
    submitCalculator() {
        let valid = this.validateData();
        if (valid) {
          let footprintResults = calculateFootprintSubmit(this.state.data);
          console.log('Footprint results are back.  Values in kwh/period', footprintResults);
          fetch('/api/footprint-form/answer', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              formName: 'footprint-finder',
              formAnswers: this.state.data,
              results: footprintResults
            })
          });
          this.props.displayResults(this.state.data,footprintResults);
        } else {
          alert('Please fill out all of the fields');
        }
    }

    increaseStep() {
      let newStep = this.state.step + 1;
      this.setState({step: newStep});
    }

    decreaseStep() {
      let newStep = this.state.step - 1;
      this.setState({step: newStep});
    }

	render() {
      if(!this.state.applianceHour) {
        return (<div>{'Loading Data'}</div>);
      }
        const containerStyle = {
            border: '3px solid gray',
            margin: 'auto',
            backgroundColor: 'lightgrey',
            width: '500px'
        };
        const headerStyle = {
            fontWeight: 'bold',
            border: '3px solid gray',
            textAlign: 'center',
            backgroundColor: 'white'
        };

        const buttonStyle = {
          display: 'flex',
          justifyContent: 'space-between'
        };
        let form;
        let leftButton = this.state.step === 1 ? <div /> : (<button type="button" className="left-btn" onClick={this.decreaseStep.bind(this)}>Back</button>);
        let rightButton = this.state.step === this.state.maxSteps ? (<button type="button" className="right-btn" onClick={this.submitCalculator.bind(this)}>Calculate My Footprint</button>) : (<button type="button" className="right-btn" onClick={this.increaseStep.bind(this)}>Next</button>);
        switch(this.state.step) {
          case 1: 
            form = (<ApplianceForm questions={this.state.applianceHour} updateData={this.updateData} getQuestionValue={this.getQuestionValue} />);
            break;
          case 2:
            form = (<HouseholdForm questions={this.state.houseHoldQuestions} updateData={this.updateData} getQuestionValue={this.getQuestionValue} />);
            break;
          case 3:
            form = (<FoodForm questions={this.state.foodQuestions} updateData={this.updateData} getQuestionValue={this.getQuestionValue} />);
            break;
          case 4:
            // Transportation has the questions within itself
            form = (<TransportationForm questions={this.state.transportation} updateData={this.updateData} getQuestionValue={this.getQuestionValue} />);
            break;
          default:
            form = (<ApplianceForm questions={this.state.applianceHour} updateData={this.updateData} getQuestionValue={this.getQuestionValue} />);
        };

		return (
      <div>
        <div style={{textAlign:'left'}}>
            <p>There is a ton of advice on how to lower your ecological footprint, "drive less, turn off your lights, dont' eat meat".  Sure, they're all good ideas, but have drastically different impacts.  One flaw I've found in all of these suggestions is that they take a qualitative approach to a very quantitative problem.</p>
            <p>The calculator below attempts to give you reasonably accurate insights on your ecological footprint.  The goal is to give you the ability to reduce your footprint in a way that fits with your life.  The form takes about 5 minutes to fill out.</p>    
        </div>
        <div style={containerStyle}>
          
          <h2 style={headerStyle}> Calculate your environmental footprint</h2>
            {form}
            <div style={buttonStyle}>
              {leftButton}
              Step {this.state.step} of {this.state.maxSteps}
              {rightButton}
            </div>
        </div>
      </div>
		);
	}
}