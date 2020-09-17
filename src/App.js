import React, { useEffect, useState } from 'react';
import './App.css';
import ConverterRow from './ConverterRow'

const CONV_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
	const [currencySelectOptions, setCurrencySelectOptions] = useState([])
	const [upperCurrency, setUpperCurrency] = useState()
	const [lowerCurrency, setLowerCurrency] = useState()
	const [exRate, setExRate] = useState()
	const [amount, setAmount] = useState(1)
	const [amountUpperChange, setAmountUpperChange] = useState(true)

	let lowerAmount, upperAmount
	if (amountUpperChange) {
		upperAmount = amount
		lowerAmount = amount * exRate
	} else {
		upperAmount = amount / exRate
		lowerAmount = amount
	}
	
	useEffect(() => {
		fetch(CONV_URL)
			.then(res => res.json())
			.then(data => {
				const firstCurrencyOption = Object.keys(data.rates)[0]
				setCurrencySelectOptions([data.base, ...Object.keys(data.rates)])
				setUpperCurrency(data.base)
				setLowerCurrency(firstCurrencyOption)
				setExRate(data.rates[firstCurrencyOption])
			})
	}, [])

	useEffect(() => {
		if (upperCurrency != null && lowerCurrency != null) {
			fetch(`${CONV_URL}?base=${upperCurrency}&symbols=${lowerCurrency}`)
				.then(res => res.json())
				.then(data => setExRate(data.rates[lowerCurrency]))
		}
	}, [upperCurrency, lowerCurrency])

	function handleUpperAmount(e) {
		setAmount(e.target.value)
		setAmountUpperChange(true)
	}

	function handleLowerAmount(e) {
		setAmount(e.target.value)
		setAmountUpperChange(false)
	}


	return (
		<>
			<h2>Convert Money</h2>
			<ConverterRow 
				currencySelectOptions={currencySelectOptions}
				selectedOption={upperCurrency}
				changeCurrency={e => setUpperCurrency(e.target.value)}
				amount={upperAmount}
				changeAmount={handleUpperAmount}
			/>
			<div className="equal">=</div>
			<ConverterRow 
				currencySelectOptions={currencySelectOptions}
				selectedOption={lowerCurrency}
				changeCurrency={e => setLowerCurrency(e.target.value)}
				amount={lowerAmount}
				changeAmount={handleLowerAmount}
			/>
		</>
	);
}

export default App;
