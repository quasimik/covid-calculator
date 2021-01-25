// import React from 'react';
import { SymptomOnset, CovidReactComponent } from './CovidRiskParams';

class SymptomSelector extends CovidReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectState: "",
      dataSources: [],
    };

    this.handleChange = this.handleChange.bind(this);
    // this.dataSources: Array<SymptomOnset> = [];
  }

  handleChange(event) {
    this.setState({ dataSources: [...this.state.dataSources, event.target.value] })
  }

  render() {
    return (
      <div className="symptoms">
        <h1>Symptoms</h1>
        <h2>Total probability: {this.getCovidProbability()}</h2>
        <select value={this.state.selectState} onChange={this.handleChange}>
          <option key={0} value="">Add new symptom...</option>
          {Object.entries(this.props.symptoms).map(([key, val], i) =>
            <option key={i + 1} value={key}>{val.name}</option>
          )}
        </select>
      </div>
    );
  }
}

export default SymptomSelector
