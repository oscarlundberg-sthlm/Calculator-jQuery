// 99, then =, then . is buggy

$(() => {
    let rawStr = '';
    let matchAllResult = [];
    let mathProblemArr = [];

    const out = (x) => {
        $('#output span').text(x);
    }

    const calc = (a, operator, b) => {
        switch (operator) {
            case '+':
                return a + b;
                break;
            case '-':
                return a - b;
                break;
            case '*':
                return a * b;
                break;
            case '/':
                return a / b;
                break;
        
            default:
                break;
        }
    }

    const calcLoopReducer = (arr) => {

        if (arr.length < 3) return;

        let res = calc(arr[0], arr[1], arr[2]);

        console.log('calcresult: ');
        console.log(res);

        if (isNaN(res)) {
            return `🥲 ${res} doesn't compute`;
        }
        return res;
    }

    const operatorCalcTrigger = (operatorValue) => {
        let result = calcLoopReducer(mathProblemArr);
        out(result);
        rawStr = result.toString().concat(operatorValue);
        matchAllResult = [];
        mathProblemArr = [];
    }

    $('.input').click(e => {
        const btn = e.currentTarget;
        const sumBtn = btn.dataset.sum;
        const clearBtn = btn.dataset.clear;
        const value = btn.value;

        rawStr += value;

        matchAllResult = [...rawStr.matchAll(/(-?\d+\.?\d*)?([-+*/])?(-?\d+\.?\d*)?/g)];

        console.log('regex matchAllResult:');
        console.log(matchAllResult);

        // calculate every x [operator] y
        if (matchAllResult[0][3] && matchAllResult[1][2]) {
            operatorCalcTrigger(matchAllResult[1][2]);
            return;
        }

        mathProblemArr = matchAllResult.flatMap(v => {
            let a = v[1];
            let op = v[2];
            let b = v[3];
            if (parseFloat(a)) a = parseFloat(a);
            if (parseFloat(b)) b = parseFloat(b);
            return [a, op, b];
        }).filter(v => {
            if (v) return v;
        });

        if (clearBtn) {
            rawStr = '';
            matchAllResult = [];
            mathProblemArr = [];
            out(rawStr);
            return;
        }

        if (sumBtn) {
            let result = calcLoopReducer(mathProblemArr);
            if (result !== undefined) {
                out(result);
                rawStr = result.toString();
                matchAllResult = [];
                mathProblemArr = [];
            }
            return;
        }

        console.log('mathProblemArr:');
        console.log(mathProblemArr);

        out(mathProblemArr.join(' '));
    });
});