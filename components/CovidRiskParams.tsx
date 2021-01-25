import React from 'react'

interface RiskParameters {
  healthProfile: HealthProfile;
  preexistingConditions: Array<PreexistingCondition>;
  // locationPastWeek: LocationCovidData;
  stateCovidData: StateCovidData;
  covidTestResults: Array<CovidTestResult>;
  symptoms: Array<Symptom>;
  closeContacts: Array<CloseContact>;
}

enum NumberLimit {
  LOW = 0.01,
  HIGH = 0.99,
}

type NumberOrLimit = number | NumberLimit;

interface DataSource {
  covidProbability: int;
}

interface ICovidProps {
}

interface ICovidState {
  dataSources: Array<DataSource>;
}

class CovidReactComponent extends React.Component<ICovidProps, ICovidState> {
  constructor(props) {
    super(props);
    this.state = {
      dataSources: [],
    }
  };

  getCovidProbability() {
    // multiply all probabilities
    if (this.state.dataSources.length == 0) {
      return null
    }
    else {
      return this.state.dataSources.reduce((acc, cur) => acc * cur)
    }
  }
}


// basic health profile and preexisting conditions

enum BirthSex {
  MALE,
  FEMALE,
}

interface HealthProfile extends DataSource {
  age: number;
  birth_sex: BirthSex;
}

interface PreexistingCondition extends DataSource {
  name: string;
  comorbidity: NumberOrLimit;
}

namespace PreexistingConditions {
  // TODO: load from externally defined JSON
  export const Type2Diabetes: PreexistingCondition = {
    name: 'Type-2 Diabetes',
    comorbidity: 0.4,
  }
}


// location

enum State {
  AL = 'AL', AK = 'AK', AZ = 'AZ', AR = 'AR', CA = 'CA', CO = 'CO', CT = 'CT', DE = 'DE', FL = 'FL', GA = 'GA',
  HI = 'HI', ID = 'ID', IL = 'IL', IN = 'IN', IA = 'IA', KS = 'KS', KY = 'KY', LA = 'LA', ME = 'ME', MD = 'MD',
  MA = 'MA', MI = 'MI', MN = 'MN', MS = 'MS', MO = 'MO', MT = 'MT', NE = 'NE', NV = 'NV', NH = 'NH', NJ = 'NJ',
  NM = 'NM', NY = 'NY', NC = 'NC', ND = 'ND', OH = 'OH', OK = 'OK', OR = 'OR', PA = 'PA', RI = 'RI', SC = 'SC',
  SD = 'SD', TN = 'TN', TX = 'TX', UT = 'UT', VT = 'VT', VA = 'VA', WA = 'WA', WV = 'WV', WI = 'WI', WY = 'WY',
}

interface StateCovidData extends DataSource {
  state: State,
  state_name: string,
  positivity_rate: number,
}

namespace StatewiseCovidData {
  // TODO: load from COVID data services
  export const CA: StateCovidData = {
    state: State.CA,
    state_name: 'California',
    positivity_rate: 0.152,
  }
}

// interface LocationCovidData extends DataSource {
//     stateCovidData: StateCovidData;
// }


// COVID tests and results

enum CovidTestType {
  ANTIGEN = 'Antigen',
  PCR = 'PCR',
}

enum CovidTestOutcome {
  POSITIVE = 'Positive',
  NEGATIVE = 'Negative',
}

interface CovidTest {
  type: CovidTestType;
  developer_name: string;
  diagnostic_name: string;
  specificity: NumberOrLimit;
  sensitivity: NumberOrLimit;
  ifu_link: string;
}

namespace CovidTests {
  // TODO: load from externally defined JSON
  export const BDVeritor: CovidTest = {
    type: CovidTestType.ANTIGEN,
    developer_name: 'Becton, Dickinson and Company (BD)',
    diagnostic_name: 'BD Veritor System for Rapid Detection of SARS-CoV-2',
    specificity: NumberLimit.HIGH,
    sensitivity: NumberLimit.LOW,
    ifu_link: 'https://www.fda.gov/media/139755/download',
  }
}

interface CovidTestResult extends DataSource {
  test: CovidTest;
  date_taken: Date;
  result: CovidTestOutcome;
}


// symptoms

interface Symptom {
  name: string;
  comorbidity: NumberOrLimit;
}

interface SymptomOnset extends DataSource {
  symptom: Symptom;
  onset: Date;
}

// namespace Symptoms {
//     // TODO: load from externally defined JSON
//     export const FeverChills: Symptom = {
//         name: 'Fever or Chills',
//         comorbidity: NumberLimit.HIGH,
//     }
//     export const Cough: Symptom = {
//         name: 'Cough',
//         comorbidity: 0.5,
//     }
//     export const ShortnessBreathDifficultyBreathing: Symptom = {
//         name: 'Shortness of breath or difficulty breathing',
//         comorbidity: 0.5,
//     }
// }


// close contacts

interface CloseContact extends DataSource {
  date_contact: Date;
  risk_params_contact: RiskParameters;
}



export type { RiskParameters, HealthProfile, PreexistingCondition, CovidTest, CovidTestResult, Symptom, SymptomOnset, CloseContact };
export { CovidReactComponent, NumberLimit, BirthSex, State, StateCovidData, CovidTestType, CovidTestOutcome };
export { StatewiseCovidData, PreexistingConditions, CovidTests };
