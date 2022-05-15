import { Form, Input, Button, Card } from "antd";
import { useState } from "react";
import {
  calculateObjectValueForGeneral,
  calculateObjectValueForNeighbor,
} from "./Solution";
function App() {
  let solutionStringForNeighbor: number[] = [];
  let solutionStringForGeneral: number[] = [];
  let dimensionOfProblem: number = 0;
  let objectValueForNeighbor: number = 0;
  let objectValueForGeneral: number = 0;
  let upperBound: number = 0;
  let lowerBound: number = 0;
  let temperature: number = 0;
  let alpha: number = 0;
  let maxIterations: number = 0;
  let result: string = "";
  const [showResult, setShowResult] = useState("");

  const generateNeighbour = () => {
    let lbN = lowerBound * 0.1;
    let ubN = upperBound * 0.1;
    for (let i = 0; i < dimensionOfProblem; i++) {
      solutionStringForNeighbor[i] =
        lowerBound + Math.random() * (upperBound - lowerBound);
    }
    for (let i = 0; i < solutionStringForNeighbor.length; i++) {
      let k: number = 0;
      let r = lbN + Math.random() * (ubN - lbN);
      solutionStringForNeighbor[i] = solutionStringForNeighbor[i] + r;
      if (solutionStringForNeighbor[i] < lowerBound) {
        solutionStringForNeighbor[i] = lowerBound;
        k = solutionStringForNeighbor[i];
      } else if (solutionStringForNeighbor[i] > upperBound) {
        solutionStringForNeighbor[i] = upperBound;
        k = solutionStringForNeighbor[i];
      }
      return k;
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <Form style={{ margin: 90 }}>
          <h2>Simulated Annealing Algorithm</h2>
          <Form.Item>
            <Input
              type="number"
              onChange={(event) => {
                dimensionOfProblem = Number(event.target.value);
              }}
              placeholder="Enter the dimension of the problem"
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="number"
              onChange={(event) => {
                lowerBound = Number(event.target.value);
              }}
              placeholder="Enter the value of lower bound"
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="number"
              onChange={(event) => {
                upperBound = Number(event.target.value);
              }}
              placeholder="Enter the value of upper bound"
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="number"
              onChange={(event) => {
                temperature = Number(event.target.value);
              }}
              placeholder="Enter the value of temperature"
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="number"
              onChange={(event) => {
                alpha = Number(event.target.value);
              }}
              placeholder="Enter the value of alpha"
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="number"
              onChange={(event) => {
                maxIterations = Number(event.target.value);
              }}
              placeholder="Enter the maximum number of iterations"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                for (let i = 0; i < dimensionOfProblem; i++) {
                  solutionStringForGeneral[i] =
                    lowerBound + Math.random() * (upperBound - lowerBound);
                }
                objectValueForGeneral = calculateObjectValueForGeneral(
                  solutionStringForGeneral,
                  dimensionOfProblem
                );
                result = "f(x)=\r\n0: " + objectValueForGeneral + "\r\n";
                for (let i = 0; i < maxIterations; i++) {
                  generateNeighbour();
                  objectValueForNeighbor = calculateObjectValueForNeighbor(
                    solutionStringForNeighbor,
                    dimensionOfProblem
                  );
                  let delta = objectValueForNeighbor - objectValueForGeneral;
                  if (
                    delta < 0 ||
                    Math.random() <= Math.pow(Math.E, -delta / temperature)
                  ) {
                    objectValueForGeneral = objectValueForNeighbor;
                  }
                  result +=
                    (i + 1).toString() + ": " + objectValueForGeneral + "\r\n";
                  temperature = temperature * alpha;
                  console.log("result: " + result);
                  setShowResult(result);
                }
              }}
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Card title="Result">{showResult}</Card>
          </Form.Item>
        </Form>
      </header>
    </div>
  );
}

export default App;
