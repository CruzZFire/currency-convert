import React from 'react'

export default function ConverterRow(props) {
    const {
        currencySelectOptions,
        selectedOption,
        changeCurrency,
        changeAmount,
        amount
    } = props

    return (
        <div>
            <input
                type="number"
                className="input-number"
                value={amount}
                onChange={changeAmount}
            />
            <select
                value={selectedOption}
                onChange={changeCurrency}
            >
                {currencySelectOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}
