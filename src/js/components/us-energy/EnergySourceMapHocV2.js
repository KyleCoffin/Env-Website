import React from 'react';
import { connect } from 'react-redux';
import GoogleMaps from '../google-energy-map/GoogleMap';

import FilterBox from './FilterBoxV2';

const MINIMUM_PLANT_OUTPUT = 50; //MW.  Display no plants under 100MW

@connect(store => {
	return {
        allPlants: store.usEnergyMap.allPlants,
        displayedPlants: store.usEnergyMap.displayedPlants,
        currentSources: store.usEnergyMap.currentSources,
        showMap: store.usEnergyMap.showMap
	};
})
export default class EnergySourceMapHoc extends React.Component {

    componentDidMount() {
        if(this.props.showMap) {
            return true;
        };
        console.log('Getting US Energy Data');
        fetch('/api/get-all-energy-sources')  
            .then(res => res.json())
            .then(sources => {
                const currentSources = this.props.currentSources;
                const filteredPlants = sources.filter(source => (source.total > MINIMUM_PLANT_OUTPUT) && source.primaryFuel && currentSources.some(currentSource => source[currentSource] > 0));
                this.props.dispatch({ type: 'LOADED_ENERGY_PLANTS', payload: filteredPlants })
                this.props.dispatch({ type: 'SET_DISPLAYED_ENERGY_PLANTS', payload: filteredPlants })
            });
    };

    filterEnergySource(currentSources) {
        const allPlants = this.props.allPlants;
        const filteredPlants = allPlants.filter(source => (source.total > MINIMUM_PLANT_OUTPUT) && source.primaryFuel && currentSources.some(currentSource => source[currentSource] > 0));
        this.props.dispatch({ type: 'SET_DISPLAYED_ENERGY_PLANTS', payload: filteredPlants })
        this.props.dispatch({ type: 'SET_CURRENT_SOURCES', payload: currentSources })
    }


  render() {
      const startingCoords = { lat: 37.0902, lng: -95.7129};
      const maxDistance = 2200; // For zoom level
    
    return (
        <div className="us-energy-map-container">
            <p className="us-energy-map-title">Energy generated by source</p>
            <p className="us-energy-map-text">This interactive map shows the location, output (MWHs/year), and type of electricity generated in the US.  This includes all utility power stations in the US which produce over 50 MW of energy as of 2018 (source: <a href="https://www.eia.gov/electricity/data/eia860m/">EIA</a>).  The map contains a lot of data and exploring may be slow.  Please use the <a href="/local-energy" target="_blank">local energy</a> page if you want to see energy sources near you.</p>
            
            <FilterBox
                currentSources={this.props.currentSources}
                filterEnergySource={this.filterEnergySource.bind(this)}
            />

            <div>
                {this.props.showMap && <GoogleMaps
                    circlesToRender={this.props.displayedPlants}
                    maxDistance={maxDistance}
                    startingCoords={startingCoords}
                    sizeMultiplier={8000}
                    height={'400px'}
                />}
                {!this.props.showMap && <div className="us-energy-map-loading">
                    <p className="us-energy-map-title">Map is loading</p>
                </div>}
            </div>
        </div>
    )
  }
}  