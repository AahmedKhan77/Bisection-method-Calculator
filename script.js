function findRoot() {
    const fInput = document.getElementById('function').value;
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const tolerance = 0.1;
    const maxIterations = parseInt(document.getElementById('maxIterations').value);
    const resultDiv = document.getElementById('result');

    // Function to evaluate the expression
    function f(x) {
        return eval(fInput.replace(/x/g, x));
    }

    let fa = f(a);
    let fb = f(b);

    if (fa * fb >= 0) {
        resultDiv.innerHTML = "Invalid interval. f(a) and f(b) must have opposite signs.";
        return;
    }

    let iter = 0;
    let c;
    let fc;

    while (true) {
        c = (a + b) / 2;
        fc = f(c);

        if (Math.abs(fc) < tolerance || iter >= maxIterations) {
            break;
        }

        if (fa * fc < 0) {
            b = c;
            fb = fc;
        } else {
            a = c;
            fa = fc;
        }

        iter++;
    }

    if (Math.abs(fc) < tolerance) {
        resultDiv.innerHTML = `Root found: x = ${c} after ${iter} iterations`;
    } else {
        resultDiv.innerHTML = `No root found within tolerance after ${iter} iterations`;
    }
}

function findIntervals() {
    const fInput = document.getElementById('intervalFunction').value;
    const intervalStart = parseFloat(document.getElementById('intervalStart').value);
    const intervalEnd = parseFloat(document.getElementById('intervalEnd').value);
    const stepSize = 0.1;
    const intervalResultDiv = document.getElementById('intervalResult');

    // Function to evaluate the expression
    function f(x) {
        return eval(fInput.replace(/x/g, x));
    }

    let intervals = [];
    let previousSign = Math.sign(f(intervalStart));
    let previousValue = f(intervalStart);

    for (let x = intervalStart + stepSize; x <= intervalEnd; x += stepSize) {
        let currentValue = f(x);
        let currentSign = Math.sign(currentValue);

        if (currentSign !== previousSign) {
            intervals.push(`[${(x - stepSize).toFixed(2)}, ${x.toFixed(2)}]`);
            previousSign = currentSign;
        }
        previousValue = currentValue;
    }

    if (intervals.length > 0) {
        intervalResultDiv.innerHTML = `Sign change intervals: ${intervals.join(', ')}`;
    } else {
        intervalResultDiv.innerHTML = "No sign change intervals found in the given range.";
    }
}

// Example function and interval 
document.getElementById('intervalFunction').value = 'x*x + 2*x - 6';
document.getElementById('intervalStart').value = -10;
document.getElementById('intervalEnd').value = 10;
