import React from 'react'
import {calculateInvestmentResults, formatter} from "../util/investment";

function Results({ userInput }) {

const resultData = calculateInvestmentResults(userInput);
let totalInterest = 0;

  return (
    <table id='result'>
        <thead>
            <tr>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest (year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
            </tr>
        </thead>
        <tbody>
            {resultData.map((yearData) => {
                totalInterest += yearData.interest;

                return (
                 <tr key={yearData.year}>
                    <td>{yearData.year}</td>
                    <td>{formatter.format(yearData.valueEndOfYear)}</td>
                    <td>{formatter.format(yearData.interest)}</td>
                    <td>{formatter.format(totalInterest)}</td>
                    <td>{formatter.format(yearData.annualInvestment * yearData.year)}</td>
                </tr>
            )})}
        </tbody>
    </table>
  )
}

export default Results
