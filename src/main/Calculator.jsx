import "./Calculator.css"
import React, { Component } from "react";

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory() {
        
        this.setState({ ...initialState })
    }

    setOperation(operation) { 
        
        const equals = operation === "="

        if (this.state.current === 0) {
            this.setState({
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: true
            }) 
            return
        }
        
        const operations = [
            { sign: "+", func: (a, b) => a + b},
            { sign: "-", func: (a, b) => a - b},
            { sign: "*", func: (a, b) => a * b},
            { sign: "/", func: (a, b) => a / b},
        ]
        
        const currentOperation = this.state.operation
        const values = [ ...this.state.values ]
        
        const op = operations.find(op => op.sign === currentOperation)        
        values[0] = op?.func(values[0], values[1]) ?? values[0]
        values[1] = 0
        if (isNaN(values[0]) || !isFinite(values[0])) {
            this.clearMemory()
            return
        }        

        this.setState({
            displayValue: values[0],
            operation: equals ? null : operation,
            current: equals ? 0 : 1,
            values: [ ...values ],
            clearDisplay: !equals
        })
        
    }

    addDigit(digit) {     
        
        if (digit === "." && this.state.displayValue.includes(".")) return       

        console.log(this.state.displayValue)
        console.log(this.state.clearDisplay)
        
        const clearDisplay = this.state.displayValue === "0" || this.state.clearDisplay
        console.log(clearDisplay)
        const currentValue = clearDisplay ? "" : this.state.displayValue
        const displayValue = currentValue + digit
        this.setState({ displayValue, clearDisplay: false })

        if (digit !== ".") {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [ ...this.state.values ]
            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {       

        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button triple label={"AC"} click={this.clearMemory} />
                <Button operation label={"/"}  click={this.setOperation}/>
                <Button label={"7"}  click={this.addDigit}/>
                <Button label={"8"}  click={this.addDigit}/>
                <Button label={"9"}  click={this.addDigit}/>
                <Button operation label={"*"}  click={this.setOperation}/>
                <Button label={"4"}  click={this.addDigit}/>
                <Button label={"5"}  click={this.addDigit}/> 
                <Button label={"6"}  click={this.addDigit}/>
                <Button operation label={"-"}  click={this.setOperation}/>
                <Button label={"1"}  click={this.addDigit}/>
                <Button label={"2"}  click={this.addDigit}/> 
                <Button label={"3"}  click={this.addDigit}/>
                <Button operation label={"+"}  click={this.setOperation}/>
                <Button double label={"0"}  click={this.addDigit}/>
                <Button label={"."}  click={this.addDigit}/> 
                <Button label={"="}  click={this.setOperation}/> 
            </div>
        )
    }
}
