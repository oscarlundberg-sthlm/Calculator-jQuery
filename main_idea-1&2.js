$(() => {

    const calc = (a, b, operator) => {
        let aNum = parseFloat(a);
        let bNum = parseFloat(b);
        switch (operator) {
            case '+':
                return aNum + bNum;
                break;
            case '-':
                return aNum - bNum;
                break;
            case '×':
                return aNum * bNum;
                break;
            case '÷':
                return aNum / bNum;
                break;
        
            default:
                break;
        }
    }

    const out = (num) => {
        $('#output').text(num);
    }

    let mainStr = '0';
    out(mainStr);
    let value1 = '';
    let value2 = '';
    let operator = '';
    let sum;
    
    //regex: before operator
    const regexBfOp = /-*[0-9]+\.*[0-9]+/;
    //regex: find operator
    const regexOperator = /[+\-×÷]/;
    //regex: find operator, but false if at end of string
    const regexOperatorInTheMiddle = /[+\-×÷](?!$)/;
    //regex: after operator (only if operator is present)
    const regexAftrOp = /(?<![0-9])-*[0-9]*\.*(?!$)[0-9]*$/;

    // const regexFloat = /[-]?([0-9]*[.])?[0-9]+/;
    // const regexFloat = /[^\.]\d*(\.(?!$))*\d*/; utan -

    // CLICK EVENT
    $('.input').click(e => {
        const val = e.currentTarget.innerText;

        if (value1.length !== 0 && operator.length === 0 && regexOperator.test(val)) {
            operator = val;
        } else
        if (value1.length === 0 && operator.length === 0 && val === '-') {
            value1 = val;
        } else
        if (value1.length !== 0 && operator.length !== 0 && value2.length === 0 && val === '-') {
            value2 = val;
        } else
        if (value2.length === 0 && operator.length === 0 && /\d|\./.test(val)) {
            if (val === '.' && value1.includes('.')) {
                return;
            } else
            if (val === '.' && value1.length === 0) {
                value1 = '0.';
            } else {
                value1 += val;
            }
        } else
        if (value1.length !== 0 && operator.length !== 0 && /\d|\./.test(val)) {
            if (val === '.' && value2.includes('.')) {
                return;
            } else
            if (val === '.' && value2.length === 0) {
                value2 = '0.';
            } else {
                value2 += val;
            }
        }

        if (val === '=') {
            mainStr = sum = calc(value1, value2, operator);
            value1 = value2 = operator = '';
            out(mainStr);
            console.log(sum);
        }

        console.log('\n\n');
        console.log(value1);
        console.log(operator);
        console.log(value2);
    });



    // $('.input').click(e => {
    //     const val = e.currentTarget.innerText;

    //     if (mainStr === '0' && val === '-') {
    //         mainStr = '-0';
    //         out(mainStr);
    //         return;
    //     }
    //     // don't let the user type just a lot of zeros
    //     if (mainStr === '0' && val === '0' || 
    //         mainStr === '-0' && val === '0' ||
    //         mainStr.match(regexAftrOp)?.[0] === '0' && val === '0' ||
    //         mainStr.match(regexAftrOp)?.[0] === '-0' && val === '0') {
    //             return;
    //     }

    //     // if numberinput, register it to mainStr
    //     if (parseInt(val) >= 0 || val === '.') {
    //         // make 04 into just 4, for example
    //         if (mainStr === '0' && /[1-9]/.test(parseInt(val)) ||
    //             mainStr === '-0' && /[1-9]/.test(parseInt(val))) {
    //                 mainStr = mainStr.replace('0', '');
    //         }
    //         if (mainStr.match(regexAftrOp)?.[0] === '0' && /[1-9]/.test(parseInt(val)) ||
    //             mainStr.match(regexAftrOp)?.[0] === '-0' && /[1-9]/.test(parseInt(val))) {
    //                 let foundIndex = mainStr.match(regexAftrOp).index;
    //                 let foundValue = mainStr.match(regexAftrOp)[0];
    //                 if (foundValue.startsWith('-')) foundIndex += 1;
    //                 mainStr = mainStr.split('').filter((v, i, a) => (i != foundIndex)).join('');
    //         }
    //         mainStr += val;
    //     }



    //     // OPERATORS
    //     // if no number in string, return
    //     // if operator, check if one already exists in string
    //     // if the last letter is the operator, append to string (regex check)
    //     // if operator exists further back in string, calculate it, make mainStr the result and then the operator
    //     if (regexOperator.test(val)) {
    //         if (mainStr === '0' || mainStr === '-0') return;
    //         operator = val;
    //         mainStr += val;
    //     }
    // });
  
});