import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { cupData, usesPerWash} from './cup-data';
import footprintQuestions from '../../../../../public/data/footprint-questions.js';
import { utilityEmissionsPerState }from '../../../utils/utils-data/state-energy-and-emissions';

import ids from '../../../utils/ids/index';
import { gallonsPerWashedDish, kwhPerGallon } from '../../../utils/utils-data/constants';
import Cup from './Cup';

import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.questions.questions,
    };
})
export default class CupHoc extends React.Component {
    getUses(resuableCreateCo2, disposableCreateCo2, cupWashCo2) {
         return Math.round((resuableCreateCo2/ (disposableCreateCo2 - cupWashCo2)));
    }

    getAllUses(resuableCreateCo2, cupWashCo2) {
        const paper = this.getUses(resuableCreateCo2, this.getCupDataCo2('Paper'),cupWashCo2)
        const styrafoam = this.getUses(resuableCreateCo2, this.getCupDataCo2('Styrafoam'),cupWashCo2)
        return { paper, styrafoam};
    }

    getCupDataCo2(type) {
        return cupData.filter(data => data.name === type)[0].co2;
    }

    getPaperStyrafoamUseText(reuseableUses, cupType, washType) {
        const wash = washType === 'Handwash' ? 'by hand' : 'using a dishwasher';
        const dishwasher = washType === 'Dishwasher' ? 'and the energy used in a dishwasher' : '';
        const paper = reuseableUses.paper > 0 ? `After ${reuseableUses.paper} uses, a ${cupType} will have a lower footprint than drinking from paper cups. `
            : `Surprisingly, it releases more CO2 to wash a ${cupType} ${wash} than it takes to create a paper cup. The CO2 of washing comes from pumping water into your house ${dishwasher}. I did not include the transportation or disposal costs of the paper cup. `
        const styrafoam = reuseableUses.styrafoam > 0 ? `After ${reuseableUses.styrafoam} uses, a ${cupType} will have a lower footprint than drinking from styrafoam cups. `
            : `Surprisingly, it releases more CO2 to wash a cup ${wash} than it takes to create a styrafoam cup. The CO2 of washing comes from pumping water into your house ${dishwasher}. I did not include the transportation or disposal costs of the styrafoam cup. `

        const bothUnder = `Surprisingly, it releases more CO2 to wash a ${cupType} ${wash} than it takes to create either a styrafoam cup or a paper cup. The CO2 of washing comes from pumping water into your house ${dishwasher}. I did not include the transportation or disposal costs of the styrafoam cup nor the paper cup.`;

        const returnText = reuseableUses.paper <= 0 && reuseableUses.styrafoam <= 0 ? bothUnder : paper + styrafoam;
        return returnText;
    }

    calculateText(typeSelected, cupWashCo2, washType) {
        let reuseableUses;
        let cupType;
        let text;
        let paperStyrafoamText;
        switch(typeSelected) {
            case 'Ceramic Mug':
                reuseableUses = this.getAllUses(this.getCupDataCo2('Ceramic Mug'), cupWashCo2);
                paperStyrafoamText = this.getPaperStyrafoamUseText(reuseableUses, 'ceramic mug', washType);
                text = 'Ceramic mugs are a good choice.  They can be used for years and contain hot and cold drinks. ' + paperStyrafoamText;  
                break;
            case 'Glass':
                reuseableUses = this.getAllUses(this.getCupDataCo2('Glass'), cupWashCo2);
                paperStyrafoamText = this.getPaperStyrafoamUseText(reuseableUses, 'glass cup', washType);
                text = 'Glass cups are a great choice.  They tend to last for years and don\'t take up much room in the dishwasher. ' + paperStyrafoamText;  
                break;
            case 'Reuseable Plastic':
                reuseableUses = this.getAllUses(this.getCupDataCo2('Reuseable Plastic'), cupWashCo2);
                paperStyrafoamText = this.getPaperStyrafoamUseText(reuseableUses, 'plastic cup', washType);
                text = 'Reuseable plastic cups are either the best or worst.  They have the lowest footprint of the reuseable cups.  However, most people don\'t use them to their full potential and tend to throw them away after just a few uses. ' + paperStyrafoamText;
                break;
            case 'Paper':
                text = `Paper cups can be the worst of the disposable cups and produce 3 times the CO2 of a styrafoam cup.  Many paper cups have a plastic lining that prevent recycling.  To make things worse, they don't insulate hot drinks well and usually require an addition cardboard sleeve.`;
                break;
            case 'Styrafoam':
                text = `Styrafoam cups are a reasonable choice for a disposable cup given that they take one third of the CO2 to produce vs a paper cup.  However, styrafoam does not degrade and improper disposal can have a significant impact.`;
                break;
        }
        return text;
    }

    getSelectedWashType(cupQuestions) {
        const washTypeQ = getQuestionFromId(cupQuestions, ids.cupClean);
        const washType = washTypeQ && !washTypeQ.hidden && washTypeQ.value;
        return washType;
    }

    getCupWashCo2(washType) {
        let cupWashCo2 = 0;
        if (washType === 'Dishwasher') {
            const dishwasher = getQuestionFromId(footprintQuestions, 35); //Id for dishwasher is 35
            const Co2FromWater = dishwasher.water * kwhPerGallon;
            cupWashCo2 = ((dishwasher.kwh * utilityEmissionsPerState.US) + Co2FromWater) / usesPerWash;
        } else if (washType === 'Handwash') {
            cupWashCo2 = kwhPerGallon * gallonsPerWashedDish * utilityEmissionsPerState.US;
        }
        return cupWashCo2;
    }

    calculateCupCo2(cupQuestions) {
        const cupType = getAnswerFromId(cupQuestions, ids.cupType);
        const cupCo2 = this.getCupDataCo2(cupType);
        const washType = this.getSelectedWashType(cupQuestions);
        const cupWashCo2 = Math.round(this.getCupWashCo2(washType) * 100)/100;
        const compareWashes = this.calculateCompareWashes(cupWashCo2)
        return {cupCo2, cupWashCo2, washType, compareWashes};
    }

    calculateCompareWashes(cupWashCo2) {
        const paperCo2 = this.getCupDataCo2('Paper');
        const styrafoamCo2 = this.getCupDataCo2('Styrafoam');
        const compareWashes = {};
        const cupTypesWashes = cupData.forEach(cup => {
            const cupCo2 = this.getCupDataCo2(cup.name);
            const washDiffWithPaper = paperCo2 - cupWashCo2;
            const washDiffWithStyrafoam = styrafoamCo2 - cupWashCo2;
            compareWashes[cup.name] = {};
            compareWashes[cup.name]['paper'] = cupCo2/washDiffWithPaper;
            compareWashes[cup.name]['styrafoam'] = cupCo2/washDiffWithStyrafoam;
        })

        return compareWashes;
    }

	render() {
        const questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('cup');
            return index !== -1 && !question.hidden; 
        });
        const {cupCo2, cupWashCo2, washType, compareWashes} = this.calculateCupCo2(questions);
        const typeSelected = getAnswerFromId(questions, 1000);
        const displayText = this.calculateText(typeSelected, cupWashCo2, washType);

        const graphData = [
            {name: 'Ceramic Mug', Paper: compareWashes['Ceramic Mug']['paper'], Styrafoam: compareWashes['Ceramic Mug']['styrafoam']},
            {name: 'Reuseable Plastic', Paper: compareWashes['Reuseable Plastic']['paper'], Styrafoam: compareWashes['Reuseable Plastic']['styrafoam']},
            {name: 'Glass', Paper: compareWashes['Glass']['paper'], Styrafoam: compareWashes['Glass']['styrafoam']},
            {name: 'Steel', Paper: compareWashes['Steel']['paper'], Styrafoam: compareWashes['Steel']['styrafoam']}
        ];
        
		return (
            <Cup
                dispatch={this.props.dispatch}    
                questions={questions}
                cupCo2={cupCo2}
                cupWashCo2={cupWashCo2}
                displayText={displayText}
                graphData={graphData}
                washType={washType}
            />
        );
	}
}