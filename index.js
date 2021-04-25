let btnStart = document.getElementById('start'),
    valBudget = document.getElementsByClassName('budget-value')[0],
    valDayBudget = document.getElementsByClassName('daybudget-value'),
    valLevel = document.getElementsByClassName('level-value')[0],
    valExpenses = document.getElementsByClassName('expenses-value')[0],
    valOptional = document.getElementsByClassName('optionalexpenses-value')[0],
    valIncome = document.getElementsByClassName('income-value')[0],
    valMonth = document.getElementsByClassName('monthsavings-value')[0],
    valYear = document.getElementsByClassName('yearsavings-value')[0],
    valChoose = document.getElementsByClassName('choose-income')[0],
    itemExpenses = document.querySelectorAll('.expenses-item'),
    btnAll = document.getElementsByTagName('button'),
    btnToApprove = btnAll[0],
	btnToApprove2 = btnAll[1],
    btnCalculate = btnAll[2],
    valueInputOptional = document.querySelectorAll('.optionalexpenses-item'),
    valueInputIncome = document.getElementById('income'),
    valueInputSaving = document.getElementById('savings'),
    valueInputSum = document.getElementById('sum'),
    valueInputPercent = document.getElementById('percent'),
	valueSavingYear = document.getElementsByClassName('yearsavings-value')[0],
	valueSavingMonth = document.getElementsByClassName('monthsavings-value')[0],
    valueDataYear = document.getElementsByClassName('year-value')[0],
	valueDataMonth = document.getElementsByClassName('month-value')[0],
	valueDataDay = document.getElementsByClassName('day-value')[0]

let money, time
console.log(valueDataYear)

btnStart.addEventListener('click', () => {
	time = prompt('Введите дату в формате YYYY-MM-DD')
	money = +prompt('Ваш бюджет на месяц?', ' ')
	
	while (isNaN(money) || money == "" || money == null ) {
		money = +prompt('Ваш бюджет на месяц?', '')
	}
	appData.budget = money
	appData.timeData = time

	valBudget.textContent = money.toFixed(1) 
	valueDataYear.value = new Date(Date.parse(time)).getFullYear()
	valueDataMonth.value = new Date(Date.parse(time)).getMonth() + 1
	valueDataDay.value = new Date(Date.parse(time)).getDate()

}) 

btnToApprove.addEventListener('click', () => {
	let sum = 0
	for (let i = 0; i<itemExpenses.length; i++) {
		let a = itemExpenses[i].value,
			b = itemExpenses[++i].value 
			 
			 
		if (typeof(a) === 'string' && typeof(a) != null 
		&& typeof(b) != null && a != '' && b != '' 
		&& a.length < 50) {
			appData.expenses[a] = b
			sum += +b
		} else {
			i = i - 1;
		}
		valExpenses.textContent = sum
	}
})

btnToApprove2.addEventListener('click', () => {
	for (let i = 0; i<valueInputOptional.length; i++){
		let optional = valueInputOptional[i].value
			
		if (typeof(optional) != null &&  optional != ''){
			appData.optionalExpenses[i] = optional
		} else i--
		valOptional.textContent += `${appData.optionalExpenses[i]} `
	}

})

btnCalculate.addEventListener('click', () => {
	if (appData.budget != undefined){
		appData.moneyPerDay = (appData.budget/30).toFixed();
		valDayBudget.textContent =  `${appData.moneyPerDay}`
		if (appData.moneyPerDay < 100) {
			valLevel.textContent = 'Минимальный уровень достатка'
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
			valLevel.textContent = 'Средний уровень достатка'
		} else if (appData.moneyPerDay > 2000){
			valLevel.textContent = 'Высокий уровень достатка'
		} else {
			valLevel.textContent = 'Ошибка'
		}
	} else valLevel.textContent = 'Произошла ошибка. Введите доход'
})

valChoose.addEventListener('input', () => {
	let text = valChoose.value
	appData.income = text.split(', ')
	valIncome.textContent = appData.income
})

valueInputSaving.addEventListener('click', () => {
	(appData.savings) ? appData.savings = false
	: appData.savings = true
	}
)

valueInputSum.addEventListener('input', () => {
	if (appData.savings){
		let sum = +valueInputSum.value,
			percent = +valueInputPercent.value
		 
		appData.yearIncome = sum/100*percent
		appData.monthIncome = sum/100/12*percent

		valueSavingYear.textContent = appData.monthIncome.toFixed(1)
		valueSavingMonth.textContent = appData.yearIncome.toFixed(1)
	}
})

valueInputPercent.addEventListener('input', () => {
	if (appData.savings){
		let sum = +valueInputSum.value,
			percent = +valueInputPercent.value
		 
		appData.yearIncome = sum/100*percent
		appData.monthIncome = sum/100/12*percent

		valueSavingYear.textContent = appData.monthIncome.toFixed(1)
		valueSavingMonth.textContent = appData.yearIncome.toFixed(1)
	}
})

	 
let appData = {
		budget: money,
		expenses: {},
		optionalExpenses: {},
		income: [],
		timeData: time,
		savings: false,
		chooseExpenses(){
			for (let i = 0; i<2; i++) {
				let a = prompt('Введите обязательную статью расходов в это месяце', ' '),
					 b = prompt('Во сколько обойдется?', ' ');
					 
					 
				if (typeof(a) === 'string' && typeof(a) != null 
				&& typeof(b) != null && a != '' && b != '' 
				&& a.length < 50) {
					appData.expenses[a] = b
				} else {
					i = i - 1;
				}
					
			}
		},
		chooseOptExpenses() {
			for (let i = 0; i<3; i++){
				let a = prompt('Статья необязательных расходов?', '')
				
				if (typeof(a) != null &&  a != ''){
					appData.optionalExpenses[i] = a
				} else i--
			}
		},
		detectDayBudget() {	
			appData.moneyPerDay = (appData.budget/30).toFixed();
			alert(`Ежедневный бюджет : ${appData.moneyPerDay}`)
			return appData.moneyPerDay
		},
		datectLevel() {
			if (appData.moneyPerDay < 100) {
				console.log(' Минимальный уровень достатка')
			} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
					console.log('Средний уровень достатка')
			} else if (appData.moneyPerDay > 2000){
					console.log('Высокий уровень достатка')
			} else {
				console.log('Ошибка')
			}
		},
		checkSaving() {
			if (appData.savings == true){
				let save = +prompt('Сумма ваших накоплений?'),
					percent = +prompt('Под какой процент?')
		
				appData.monthIncome = save/100/12*percent
				alert(`Доход в месяц с вашего депозита : ${appData.monthIncome}`)
			}
		},
		chooseIncome() {
			let items = prompt(`Что принесет допольнительный доход?
			(Перечислите через запятую)`, '')
			if (typeof(items) === 'string' && items != '' && items != null){
			appData.income = items.split(', ')
			appData.income.push(prompt('Может что-то еще?'))
			appData.income.sort()
			appData.income.forEach((item) => alert(item))
			}
		},
		allObjects() {
			for (let key in appData){
				console.log(appData[key])
			}
		}
};


