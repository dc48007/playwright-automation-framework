// let promisevalue = new Promise(function(resolve, reject) {
//     setTimeout(() =>console.log("Task completed"), 5000);
//     resolve('done');
// });

// //console.log("Promise value:", promisevalue);
// //console.log("Promise value:", promisevalue);
// console.log(promisevalue.then((value) => console.log("Promise resolved with value:", value)));
// setTimeout(() => 
//     console.log("Promise value after 6 seconds:", promisevalue)
// , 6000);


//===================================

//--- Additional Example: Promises and Async/Await ---

// function interprocess(result) {
//     return new Promise((pass, fail) => {
//         if (result) {
//             setTimeout(() => pass('pass ho gya londa'), 5000);
//         }else{
//             fail('failed ho gya buddbak'); 
//         }
//     }
//     );
// }

// console.log('start the execution');
// console.log(interprocess(true).then((value) => console.log("Promise resolved with value:", value)       ).catch((err) => console.log("Promise rejected with error:", err)));
// console.log(interprocess(false).then((value) => console.log("Promise resolved with value:", value)       ).catch((err) => console.log("Promise rejected with error:", err)));


///////////////////////////////==============different pormises

let promiseResolve = Promise.resolve('immediately resolved');;
Promise.reject('immediately rejected').catch((err) => console.log("Promise rejected with error:", err));
console.log(promiseResolve.then((value) => console.log("Promise resolved with value:", value)));



