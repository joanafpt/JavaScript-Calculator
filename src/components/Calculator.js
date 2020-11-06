import React, { useState } from 'react';
import './Calculator.css';
import functions from '../functions/functions';
import Button from './Button';
import Display from './Display';

const Calculator = () => {
    const [displayedValue, setDisplayedValue] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [nextNumberWillCleanDisplayValue, setNextNumberWillCleanDisplayValue] = useState(false);
    const [lastKeyIsDigit, setLastKeyIsDigit] = useState(true);
    const [lastKeyIsOperator, setLastKeyIsOperator] = useState(false);

    const togglePositiveNegativeNumbers = () => {
        if (displayedValue.charAt(0) === "-") {
            setDisplayedValue(displayedValue.substr(1));
        } else {
            setDisplayedValue("-" + displayedValue);
        }
    }

    const handleDecimal = () => {
        if (displayedValue.indexOf(".") === -1) {
            setDisplayedValue(displayedValue + ".");
            setNextNumberWillCleanDisplayValue(false);
            setLastKeyIsOperator(false);
            setLastKeyIsDigit(true);
        }
    }

    const handleClearButton = () => {
        setPreviousValue(null);
        setDisplayedValue('0');
        setOperator(null);
        setNextNumberWillCleanDisplayValue(false);
        setLastKeyIsDigit(true);
        setLastKeyIsOperator(false);
    }

    const handleCEButton = () => {
        setDisplayedValue(displayedValue.substr(0, displayedValue.length - 1));
        setLastKeyIsOperator(false);
    }

    const handleNumbers = (event) => {
        event.persist();
        const num = event.target.innerHTML;
        if (nextNumberWillCleanDisplayValue) {
            setDisplayedValue(String(num));
            setNextNumberWillCleanDisplayValue(false);
            setLastKeyIsDigit(true);
            setLastKeyIsOperator(false);
        } else {
            displayedValue === "0" ? setDisplayedValue(String(num)) : setDisplayedValue(displayedValue + String(num));
            setLastKeyIsDigit(true);
            setLastKeyIsOperator(false);
        }
    }

    const handleOps = (event) => {
        event.persist();
        const signJustPressed = event.target.innerHTML;
        let resultTemporario = 0;
        if (previousValue && operator) {
            if (lastKeyIsOperator && signJustPressed !== "-") {
                setOperator(signJustPressed);
                setNextNumberWillCleanDisplayValue(true);
                setLastKeyIsOperator(true);
                setLastKeyIsDigit(false);
            }
        }
        if (previousValue && operator) {
            if (lastKeyIsOperator && signJustPressed === "-") {
                setDisplayedValue("-");
                setNextNumberWillCleanDisplayValue(false);
                setLastKeyIsOperator(true);
                setLastKeyIsDigit(false);
            }
            else if (displayedValue !== '-' && !lastKeyIsOperator) {
                resultTemporario = functions.calculate(previousValue, operator, displayedValue);
                setPreviousValue(resultTemporario);
                setDisplayedValue(resultTemporario);
                setOperator(signJustPressed);
                setNextNumberWillCleanDisplayValue(true);
                setLastKeyIsDigit(false);
                setLastKeyIsOperator(true);
            }
        }
        else {
            setPreviousValue(displayedValue);
            setOperator(signJustPressed);
            setNextNumberWillCleanDisplayValue(true);
            setLastKeyIsDigit(false);
        }
    }

    const handleEquals = (event) => {
        event.persist();
        const inp = displayedValue;
        if (previousValue) {
            if (operator) {
                const calculatedValue = functions.calculate(previousValue, operator, inp);
                setDisplayedValue(String(calculatedValue));
                setPreviousValue(null);
                setOperator(null);
                setNextNumberWillCleanDisplayValue(true);
                setLastKeyIsOperator(false);
            }
        } else {
            setPreviousValue(displayedValue);
            setLastKeyIsDigit(true);
            setLastKeyIsOperator(false);
        }
    }

    const valuesRows = [[{ value: 'AC', function: handleClearButton }, { value: 'CE', function: handleCEButton }, { value: '+-', function: togglePositiveNegativeNumbers }, { value: '/', function: handleOps }], [{ value: '7', function: handleNumbers }, { value: '8', function: handleNumbers }, { value: '9', function: handleNumbers }, { value: '*', function: handleOps }], [{ value: '4', function: handleNumbers }, { value: '5', function: handleNumbers }, { value: '6', function: handleNumbers }, { value: '-', function: handleOps }], [{ value: '1', function: handleNumbers }, { value: '2', function: handleNumbers }, { value: '3', function: handleNumbers }, { value: '+', function: handleOps }], [{ value: '0', function: handleNumbers }, { value: '.', function: handleDecimal }, { value: '=', classN: "double-key", function: handleEquals }]];

    return (
        <div className="row">
            <div className="col-sm colu1">
                <Display>{displayedValue}</Display>
                <div className="calculator">
                    {valuesRows.map(function (values) {
                        const buttons = values.map(function (elem) {
                            const classN = elem.classN || "";
                            return (
                                <Button
                                    type="submit"
                                    onClick={elem.function}
                                    className={`btn btn-light btn-lg key ${classN}`}>
                                    {elem.value}
                                </Button>
                            )
                        });
                        return (<div className="row">{buttons}</div>);
                    })}
                </div>

            </div>
        </div>
    )
}
export default Calculator;

