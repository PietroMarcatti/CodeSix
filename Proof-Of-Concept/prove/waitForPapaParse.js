const waitForPapaParse = async (file) => {
    Papa.parsePromise = function (file) {
        return new Promise(function (complete, error) {
            Papa.parse(file, {
                complete,
                error,
                header: true
            });
        });
    }

    let results;
    await Papa.parsePromise(file)
        .then(function (parsedData) {
            results = parsedData;
        });

    return results;
}