function fetchData(boolean) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(boolean) {
                resolve(
                    { id: 1, name: "Sample Data"
                });
            } else {
                reject("Error fetching data");
            }
        }, 5000);
})
};

//console.log('Start fetching data', fetchData(true).then((value) => console.log("Promise resolved with value:", value)).catch((err) => console.log("Promise rejected with error:", err)) );
//console.log('Start fetching data', fetchData(false).then((value) => console.log("Promise resolved with value:", value)).catch((err) => console.log("Promise rejected with error:", err)) );

async function fetchDataAsync(boolean) {
    try {
        let p =  await fetchData(boolean);
        console.log('Async/Await fetched data:', p.id, p.name);
    } catch (error) {
        console.log("Async/Await rejected with error:", error);
    }
}
fetchDataAsync(true);
fetchDataAsync(false);
