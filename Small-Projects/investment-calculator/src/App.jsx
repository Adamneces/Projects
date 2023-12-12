import React, {useState} from "react";
import {calculateInvestmentResults, formatter} from "./util/investment";


function App() {
  const [capital, setCapital] = useState(0);
  const [contribution, setContribution] = useState(0);
  const [expectedReturn, setExpectedReturn] = useState(0);
  const [duration, setDuration] = useState(0);

  let investmentData={
    initialInvestment: Number(capital),
    annualInvestment: Number(contribution),
    expectedReturn: Number(expectedReturn),
    duration: Number(duration)
  }

  let calculatedInvestmentData = calculateInvestmentResults(investmentData);

//Calculation in the <table> element:
  let totalInterest = 0;
  let totalContributedAmount = 0;
  //--

  return (
    <div>
      <form action="" id="user-input">
        <fieldset className="input-group">
          <div>
            <label htmlFor="">Starting Capital</label>
            <input type="number" placeholder="$5 000..." onChange={(e) => setCapital(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="">Annual Investment</label>
            <input type="number" placeholder="$1 000..." onChange={(e) => setContribution(e.target.value)}/>
          </div>
        </fieldset>
        <fieldset className="input-group">
          <div>
            <label htmlFor="">Expected Return%</label>
            <input type="number" placeholder="7%..." onChange={(e) => setExpectedReturn(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="">Duration in years</label>
            <input type="number" placeholder="20..." onChange={(e) => setDuration(e.target.value)}/>
          </div>
        </fieldset>
      </form>

      <table id="result">
        {calculatedInvestmentData.length > 0 ? (<thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>) : null}
        
        <tbody>
          {calculatedInvestmentData.map((data, index) => {

          let totalInterestForYear = data.interest + totalInterest;
          totalInterest = totalInterestForYear;
          totalContributedAmount += data.annualInvestment;

            return (
            <tr>
              <td>{data.year}</td>
            <td>{formatter.format(Math.round(data.valueEndOfYear))}</td>
            <td>{formatter.format(Math.round(data.interest))}</td>
            <td>{formatter.format(Math.round(totalInterestForYear))}</td>
            <td>{formatter.format(totalContributedAmount)}</td>
            </tr>)
          })}
        </tbody>
      </table>

    </div>
  )
}

export default App
