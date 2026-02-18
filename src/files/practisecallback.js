// Callback-style example (node-style callbacks: callback(error, result))
function doTaskCallback(shouldFail, callback) {
    setTimeout(() => {
        if (shouldFail) callback(new Error('task failed'));
        else callback(null, 'done (callback)');
    }, 1000);
}

doTaskCallback(false, (err, result) => {
    if (err) return console.error('Callback error:', err.message);
    console.log('Callback result:', result);
});

// Promise-based version
function doTaskPromise(shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) reject(new Error('task failed'));
            else resolve('done (promise)');
        }, 1000);
    });
}

doTaskPromise(false)
    .then(result => console.log('Promise result:', result))
    .catch(err => console.error('Promise error:', err.message));

// async/await usage (syntactic sugar over Promises)
async function runAsync() {
    try {
        const result = await doTaskPromise(false);
        console.log('Async/await result:', result);
    } catch (err) {
        console.error('Async/await error:', err.message);
    }
}
runAsync();

// Converting an existing callback API to a Promise using util.promisify
const util = require('util');
const doTaskPromisified = util.promisify(doTaskCallback);

doTaskPromisified(false)
    .then(result => console.log('Promisified callback result:', result))
    .catch(err => console.error('Promisified callback error:', err.message));

// Notes:
// - Run with: `node src/files/practisecallback.js`
// - In VS Code you can set a launch config to debug this file (F5)



//--- Additional Example: Simple Callback Function ---

function greet(name){
    return `Hello, ${name}!`;
}

function processUserInput(callback) {
    const name = "Alice";
    console.log(callback(name));
}

processUserInput(greet);

//--- Additional Example: Simple Promise Function ---
console.log('start the execution');

setTimeout(()=>{
    console.log('inside the timeout');
}, 5000);

console.log('end the execution');

//--- Additional Example: Promise with Resolve and Reject ---

function doOperation(a, b, callback){
    callback(a,b);
}

doOperation(5, 10, (x,y)=>{console.log('result:', x+y)}); // 15