#!/usr/bin/env ts-node-script

import { RiskParameters, HealthProfile, PreexistingCondition, CovidTest, CovidTestResult, Symptom, CloseContact } from './CovidRiskParams';
import { NumberLimit, BirthSex, State, StateCovidData, CovidTestType, CovidTestOutcome } from './CovidRiskParams';
import { StatewiseCovidData, PreexistingConditions, CovidTests, Symptoms } from './CovidRiskParams';

let risk_params: RiskParameters = {
    health_profile: {
        age: 25,
        birth_sex: BirthSex.MALE,
    },
    preexisting_conditions: [
        PreexistingConditions.Type2Diabetes,
    ],
    state_covid_data: StatewiseCovidData.CA,
    covid_test_results: [
        {
            test: CovidTests.BDVeritor,
            date_taken: new Date(),
            result: CovidTestOutcome.POSITIVE,
        }
    ],
    symptoms: [
        Symptoms.FeverChills,
    ],
    close_contacts: [],
};

const util = require('util');
console.log(util.inspect(risk_params, { depth: null }));
