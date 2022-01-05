import { custom } from './custom-log.js';

$(() => {

    let region = 'en-US';
    let f = new Intl.NumberFormat(region);
    
    let value1 = {
        value: '0',
        isPositive: true,
        get getValue() {
            return this.isPositive ? this.value : '-' + this.value;
        }
    }
    let value2 = {
        value: null,
        isPositive: true,
        get getValue() {
            return this.isPositive ? this.value : '-' + this.value;
        }
    }
    let operator = '';

    const out = (x) => {
        $('#output span').text(x);

        $('#output').scrollLeft(() => (
            $('#output')[0].scrollWidth - $('#output')[0].clientWidth
        ));
        $('#log-p-wrapper').scrollTop(() => (
            $('#log-p-wrapper')[0].scrollHeight - $('#log-p-wrapper')[0].clientHeight
        ))
    }

    const calc = (a, operator, b) => {
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);

        let result = {
            value: 0,
            calculation: '',
            stringifyCalculation: function(a, operator, b) {
                let aNumForm = f.format(a);
                let bNumForm = f.format(b);
                let formValue = f.format(this.value);
                this.calculation = `${aNumForm} ${operator} ${bNumForm} = ${formValue}`;
            }
        }

        switch (operator) {
            case '+':
                result.value = aNum + bNum;
                break;
            case '-':
                result.value = aNum - bNum;
                break;
            case '*':
                result.value = aNum * bNum;
                break;
            case '/':
                result.value = aNum / bNum;
                break;
        
            default:
                break;
        }

        result.stringifyCalculation(aNum, operator, bNum);
        return result;
    }

    $('.input').click(e => {
        const roles = e.currentTarget.dataset.roles.split(' ');
        const value = e.currentTarget.value;
        const textContent = e.currentTarget.textContent;

        let currentBtnIs = {
            parsable: roles.includes('parsable'),
            operator: roles.includes('operator'),
            number: roles.includes('number'),
            decimalSeparator: roles.includes('decimal-separator'),
            posneg: roles.includes('posneg'),
            sum: roles.includes('sum'),
            clear: roles.includes('clear')
        }

        const isFirstValue = !operator && value2.value === null ? true : false;
        const isOperator = currentBtnIs.operator && parseFloat(value1.value) && !operator && value2.value === null ? true : false;
        const isSecondValue = parseFloat(value1.value) && operator ? true : false;
        const isCombinedOperatorAndSum = currentBtnIs.operator && parseFloat(value1.value) && operator && parseFloat(value2.value) ? true : false;

        if (isFirstValue && currentBtnIs.parsable) {
            inputConditions: {
                if (value === '.' && value1.value.includes('.')) {
                    return;
                }
                if (value === 'flip-pos-neg') {
                    value1.isPositive = !value1.isPositive;
                    break inputConditions;
                }
                if (value1.value === '0' && value !== 'flip-pos-neg' || 
                    value1.value === '-0' && value !== 'flip-pos-neg') {
                    if (value === '.') {
                        value1.value += value;
                    } else {
                        value1.value = value;
                    }
                    break inputConditions;
                }
                if (value !== 'flip-pos-neg') {
                    value1.value += value;
                }
            }

            console.log(value1.getValue);
            out(f.format(value1.getValue));
        }

        if (isOperator) {
            console.log(value);
            operator = value;
            out(textContent); // or out(operator) to display * and / chars
        }

        if (isSecondValue && currentBtnIs.parsable) {
            if (value2.value === null) value2.value = '0';
            inputConditions: {
                if (value === '.' && value2.value.includes('.')) {
                    return;
                }
                if (value === 'flip-pos-neg') {
                    value2.isPositive = !value2.isPositive;
                    break inputConditions;
                }
                if (value2.value === '0' && value !== 'flip-pos-neg' || 
                    value2.value === '-0' && value !== 'flip-pos-neg') {
                    if (value === '.') {
                        value2.value += value;
                    } else {
                        value2.value = value;
                    }
                    break inputConditions;
                }
                if (value !== 'flip-pos-neg') {
                    value2.value += value;
                }
            }

            console.log(value2.getValue);
            out(f.format(value2.getValue));
        }

        if (isCombinedOperatorAndSum) {
            console.log(value1.getValue, operator, value2.getValue);
            let result = calc(value1.getValue, operator, value2.getValue);
            console.log('result: ' + result.value);
            custom.log(result.calculation, 'log-p-wrapper');
            out(f.format(result.value));
            if (result.value.toString().slice(0,1) === '-') {
                value1.value = Math.abs(result.value).toString();
                value1.isPositive = false;
            } else {
                value1.value = result.value.toString();
                value1.isPositive = true;
            }
            operator = value;
            value2.value = null;
            value2.isPositive = true;
        }

        if (currentBtnIs.sum && value2.value !== null) {
            console.log(value1.getValue, operator, value2.getValue);
            let result = calc(value1.getValue, operator, value2.getValue);
            console.log('result: ' + result.value);
            custom.log(result.calculation, 'log-p-wrapper');
            out(f.format(result.value));
            if (result.value.toString().slice(0,1) === '-') {
                value1.value = Math.abs(result.value).toString();
                value1.isPositive = false;
            } else {
                value1.value = result.value.toString();
                value1.isPositive = true;
            }
            operator = '';
            value2.value = null;
            value2.isPositive = true;
        }

        if (currentBtnIs.clear) {
            value1.value = '0';
            value1.isPositive = true;
            operator = '';
            value2.value = null;
            value2.isPositive = true;
            out(f.format(value1.getValue));
        }
    });

    //send out value1.value to the output on init
    out(f.format(value1.getValue));

    // Show/hide slide out log
    $('#log-elipsis-wrapper').click(() => {
        $('#log').toggleClass('calc-log-open');
    })
});