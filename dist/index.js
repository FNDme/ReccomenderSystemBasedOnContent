var _a, _b, _c, _d, _e, _f;
const enableBTN = [false, false, false];
let corpus = [];
let stopWords = [];
let docs = [];
(_a = document.getElementById('document-input')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (event) {
    if (event.target instanceof HTMLInputElement) {
        const response = document.getElementById('response-block');
        const resultDiv = document.getElementById('solution');
        readDoc(document.getElementById('document-input')).then((inputDoc) => {
            var _a, _b, _c;
            console.log('inputDoc Done');
            docs = inputDoc;
            enableBTN[0] = true;
            if (enableBTN[0] && enableBTN[1] && enableBTN[2]) {
                (_a = document.getElementById('submit-btn')) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
            }
            else {
                if (!((_b = document.getElementById('submit')) === null || _b === void 0 ? void 0 : _b.hasAttribute('disabled'))) {
                    (_c = document.getElementById('submit')) === null || _c === void 0 ? void 0 : _c.setAttribute('disabled', '');
                }
            }
        }).catch((error) => {
            if (response instanceof HTMLDivElement) {
                const githubLink = document.createElement('a');
                githubLink.setAttribute('href', 'https://github.com/FNDme/recommender-system');
                githubLink.innerHTML = 'GitHub';
                response.innerHTML = error + ': check ' + githubLink.outerHTML +
                    ' for more info';
                response.classList.add('error');
                resultDiv.classList.remove('shown');
                resultDiv.innerHTML = '';
            }
        });
    }
});
function readDoc(input) {
    return new Promise((resolve, reject) => {
        var _a;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a.item(0);
        file === null || file === void 0 ? void 0 : file.text().then((text) => {
            const data = text;
            if (data === '') {
                reject(new Error('File is empty'));
            }
            const docsReceived = data.split('\n')
                .map((line) => line.trim());
            resolve(docsReceived);
        }).catch((error) => {
            reject(error);
        });
    });
}
(_b = document.getElementById('stopWords-input')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function (event) {
    if (event.target instanceof HTMLInputElement) {
        const response = document.getElementById('response-block');
        const resultDiv = document.getElementById('solution');
        readStopWords(document.getElementById('stopWords-input')).then((inputStopWords) => {
            var _a, _b, _c;
            console.log('inputStopWords Done');
            stopWords = inputStopWords;
            enableBTN[1] = true;
            if (enableBTN[0] && enableBTN[1] && enableBTN[2]) {
                (_a = document.getElementById('submit-btn')) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
            }
            else {
                if (!((_b = document.getElementById('submit')) === null || _b === void 0 ? void 0 : _b.hasAttribute('disabled'))) {
                    (_c = document.getElementById('submit')) === null || _c === void 0 ? void 0 : _c.setAttribute('disabled', '');
                }
            }
        }).catch((error) => {
            if (response instanceof HTMLDivElement) {
                const githubLink = document.createElement('a');
                githubLink.setAttribute('href', 'https://github.com/FNDme/recommender-system');
                githubLink.innerHTML = 'GitHub';
                response.innerHTML = error + ': check ' + githubLink.outerHTML +
                    ' for more info';
                response.classList.add('error');
                resultDiv.classList.remove('shown');
                resultDiv.innerHTML = '';
            }
        });
    }
});
function readStopWords(input) {
    return new Promise((resolve, reject) => {
        var _a;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a.item(0);
        file === null || file === void 0 ? void 0 : file.text().then((text) => {
            const stopWordsReceived = text.split('\n')
                .map((word) => word.trim())
                .filter((word) => word.length > 0);
            resolve(stopWordsReceived);
        }).catch((error) => {
            reject(error);
        });
    });
}
(_c = document.getElementById('corpus-input')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', function (event) {
    if (event.target instanceof HTMLInputElement) {
        const response = document.getElementById('response-block');
        const resultDiv = document.getElementById('solution');
        readCorpus(document.getElementById('corpus-input')).then((inputCorpus) => {
            var _a, _b, _c;
            console.log('inputCorpus Done');
            corpus = inputCorpus;
            enableBTN[2] = true;
            if (enableBTN[0] && enableBTN[1] && enableBTN[2]) {
                (_a = document.getElementById('submit-btn')) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
            }
            else {
                if (!((_b = document.getElementById('submit')) === null || _b === void 0 ? void 0 : _b.hasAttribute('disabled'))) {
                    (_c = document.getElementById('submit')) === null || _c === void 0 ? void 0 : _c.setAttribute('disabled', '');
                }
            }
        }).catch((error) => {
            if (response instanceof HTMLDivElement) {
                const githubLink = document.createElement('a');
                githubLink.setAttribute('href', 'https://github.com/FNDme/recommender-system');
                githubLink.innerHTML = 'GitHub';
                response.innerHTML = error + ': check ' + githubLink.outerHTML +
                    ' for more info';
                response.classList.add('error');
                resultDiv.classList.remove('shown');
                resultDiv.innerHTML = '';
            }
        });
    }
});
function readCorpus(input) {
    return new Promise((resolve, reject) => {
        var _a;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a.item(0);
        file === null || file === void 0 ? void 0 : file.text().then((text) => {
            const fileReceived = text;
            const json = fileReceived.replace(/[\{\}]/g, '');
            const lex = json.split(',')
                .map((item) => {
                const [key, value] = item.split(':');
                return [key.replace(/"/g, ''), value.replace(/"/g, '')];
            });
            resolve(lex);
        }).catch((error) => {
            reject(error);
        });
    });
}
(_d = document.getElementById('submit-btn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function (event) {
    if (event.target instanceof HTMLButtonElement) {
        const response = document.getElementById('response-block');
        const resultDiv = document.getElementById('solution');
        if (response instanceof HTMLDivElement) {
            response.innerHTML = '';
            response.classList.remove('error');
        }
        if (resultDiv instanceof HTMLDivElement) {
            resultDiv.innerHTML = '';
            resultDiv.classList.remove('shown');
        }
        if (docs.length === 0) {
            if (response instanceof HTMLDivElement) {
                response.innerHTML = 'Please upload a document';
                response.classList.add('error');
            }
        }
        else if (stopWords.length === 0) {
            if (response instanceof HTMLDivElement) {
                response.innerHTML = 'Please upload a stop words file';
                response.classList.add('error');
            }
        }
        else if (corpus.length === 0) {
            if (response instanceof HTMLDivElement) {
                response.innerHTML = 'Please upload a corpus file';
                response.classList.add('error');
            }
        }
        else {
            const downloadFile = solve(docs, stopWords, corpus);
            if (downloadFile) {
                const link = resultDiv.appendChild(document.createElement('a'));
                const btn = link.appendChild(document.createElement('button'));
                btn.setAttribute('class', 'button is-dark');
                btn.setAttribute('id', 'download-btn');
                btn.innerHTML = 'Download as .txt';
                link.setAttribute('href', 'data:text/plain;charset=utf-8,' +
                    encodeURIComponent('Result\n' + downloadFile));
                link.setAttribute('download', 'result.txt');
            }
        }
    }
});
(_e = document.getElementById('info-btn')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function (event) {
    document.getElementsByClassName('popup')[0].classList.remove('hidden');
    document.getElementsByClassName('popup')[0].classList.add('shown');
});
(_f = document.getElementById('close-btn')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function (event) {
    document.getElementsByClassName('popup')[0].classList.remove('shown');
    document.getElementsByClassName('popup')[0].classList.add('hidden');
});
export function buildMatrix(docs, stopWords, corpus) {
    const matrix = [];
    const allWords = [];
    const df = [];
    docs.forEach((doc) => {
        matrix.push([]);
        const words = doc.split(' ')
            .map((word) => word.toLowerCase().trim());
        words.forEach((word) => {
            if (!allWords.includes(word) && !stopWords.includes(word)) {
                df.push(1);
                allWords.push(word);
            }
            else if (!stopWords.includes(word)) {
                df[allWords.indexOf(word)] += 1;
            }
        });
    });
    allWords.forEach((word) => {
        matrix.forEach((row) => row.push(0));
    });
    docs.forEach((doc) => {
        const words = doc.split(' ')
            .map((word) => word.toLowerCase().trim());
        words.forEach((word) => {
            if (!stopWords.includes(word)) {
                const index = allWords.indexOf(word);
                const row = docs.indexOf(doc);
                matrix[row][index] += 1;
            }
        });
    });
    return [matrix, df];
}
export function solve(docs, stopWords, corpus) {
    const [matrix, df] = buildMatrix(docs, stopWords, corpus);
    const tf = [];
    const idf = [];
    const tfidf = [];
    matrix.forEach((row) => {
        tf.push([]);
        tfidf.push([]);
    });
    matrix.forEach((row, i) => {
        row.forEach((item, j) => {
            tf[i].push(item / row.reduce((a, b) => a + b));
        });
    });
    df.forEach((item) => idf.push(Math.log(docs.length / item)));
    matrix.forEach((row, i) => {
        row.forEach((item, j) => {
            tfidf[i].push(tf[i][j] * idf[j]);
        });
    });
    const vectorLengths = [];
    tfidf.forEach((row) => {
        vectorLengths.push(0);
        row.forEach((value) => {
            vectorLengths[tfidf.indexOf(row)] += Math.pow(value, 2);
        });
        vectorLengths[tfidf.indexOf(row)] = Math.sqrt(vectorLengths[tfidf.indexOf(row)]);
    });
    const normalizedTfidf = [];
    tfidf.forEach((row) => {
        normalizedTfidf.push([]);
        row.forEach((value) => {
            normalizedTfidf[tfidf.indexOf(row)].push(value / vectorLengths[tfidf.indexOf(row)]);
        });
    });
    const cosineSimilarity = [];
    for (let i = 0; i < normalizedTfidf.length; i++) {
        cosineSimilarity.push([]);
        for (let j = 0; j < normalizedTfidf.length; j++) {
            cosineSimilarity[i].push(0);
            for (let k = 0; k < normalizedTfidf[i].length; k++) {
                cosineSimilarity[i][j] += normalizedTfidf[i][k] * normalizedTfidf[j][k];
            }
        }
    }
    return [matrix, df, tf, idf, tfidf, vectorLengths, normalizedTfidf, cosineSimilarity];
}
