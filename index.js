let money, time

function start () {
	money = +prompt('Ваш бюджет на месяц?', ' '),
	time = prompt('Введите дату в формате YYYY-MM-DD', ' ');

	while (isNaN(money) || money == "" || money == null ) {
		money = +prompt('Ваш бюджет на месяц?', '')
	}
}

start()

	 
let appData = {
		budget: money,
		expenses: {},
		optionalExpenses: {},
		income: [],
		timeData: time,
		savings: true,
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


