import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import SymptomSelector from '../components/SymptomSelector'
import fs from 'fs'
import path from 'path'

export async function getStaticProps(context) {
  const dataPath = path.join(process.cwd(), 'assets', 'symptoms.json')
  const symptoms_obj = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  // console.log(symptoms_obj)
  // const symptoms = new Map(symptoms_obj)
  return {
    props: {
      symptoms: symptoms_obj
    }
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <SymptomSelector
          symptoms={this.props.symptoms}
        />
      </div>
    );
  }
}

export default SymptomSelector
