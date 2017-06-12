import React from "react";
import Header from '../components/Header.js';
import StateEnergyChart from '../components/StateEnergyChart.js';
import TestPie from '../components/TestPie.js';

export default class StateEnergyProfile extends React.Component {

	constructor(props) {
		super();
	}

	render() {
		return (
			<div>
				<Header />
				<p>Rendering state page eventually</p>
                <StateEnergyChart {...this.props} />
				<TestPie />
			</div>
		);
	}
}
