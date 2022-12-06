const enableBTN = [false, false, false];

let corpus: string[][] = [];
let stopWords: string[] = [];
let docs: string[] = [];

document.getElementById('document-input')?.addEventListener('change',
  function (event) {
    if (event.target instanceof HTMLInputElement) {
      const response = document.getElementById('response-block') as
        HTMLDivElement;
      const resultDiv = document.getElementById('solution') as HTMLDivElement;
        readDoc(document.getElementById('document-input') as
          HTMLInputElement).then(
            (inputDoc) => {
              console.log('inputDoc Done');
              docs = inputDoc;
              enableBTN[0] = true;
              if (enableBTN[0] && enableBTN[1] && enableBTN[2]) {
                document.getElementById('submit-btn')?.
                    removeAttribute('disabled');
              } else {
                if (!document.getElementById('submit')?.
                    hasAttribute('disabled')) {
                  document.getElementById('submit')?.
                      setAttribute('disabled', '');
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

function readDoc(input: HTMLInputElement):
  Promise<string[]> {
  return new Promise((resolve, reject) => {
    const file = input.files?.item(0);
    file?.text().then((text) => {
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

document.getElementById('stopWords-input')?.addEventListener('change',
  function (event) {
    if (event.target instanceof HTMLInputElement) {
      const response = document.getElementById('response-block') as
        HTMLDivElement;
      const resultDiv = document.getElementById('solution') as HTMLDivElement;
      readStopWords(document.getElementById('stopWords-input') as
        HTMLInputElement).then(
          (inputStopWords) => {
            console.log('inputStopWords Done');
            stopWords = inputStopWords;
            enableBTN[1] = true;
            if (enableBTN[0] && enableBTN[1] && enableBTN[2]) {
              document.getElementById('submit-btn')?.
                  removeAttribute('disabled');
            } else {
              if (!document.getElementById('submit')?.
                  hasAttribute('disabled')) {
                document.getElementById('submit')?.
                    setAttribute('disabled', '');
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

function readStopWords(input: HTMLInputElement):
  Promise<string[]> {
  return new Promise((resolve, reject) => {
    const file = input.files?.item(0);
    file?.text().then((text) => {
      const stopWordsReceived = text.split('\n')
        .map((word) => word.trim())
        .filter((word) => word.length > 0);
      resolve(stopWordsReceived);
    }).catch((error) => {
      reject(error);
    });
  });
}

document.getElementById('corpus-input')?.addEventListener('change',
  function (event) {
    if (event.target instanceof HTMLInputElement) {
      const response = document.getElementById('response-block') as
        HTMLDivElement;
      const resultDiv = document.getElementById('solution') as HTMLDivElement;
      readCorpus(document.getElementById('corpus-input') as
        HTMLInputElement).then(
          (inputCorpus) => {
            console.log('inputCorpus Done');
            corpus = inputCorpus;
            enableBTN[2] = true;
            if (enableBTN[0] && enableBTN[1] && enableBTN[2]) {
              document.getElementById('submit-btn')?.
                  removeAttribute('disabled');
            } else {
              if (!document.getElementById('submit')?.
                  hasAttribute('disabled')) {
                document.getElementById('submit')?.
                    setAttribute('disabled', '');
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

function readCorpus(input: HTMLInputElement):
  Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const file = input.files?.item(0);
    file?.text().then((text) => {
      const fileReceived = text;
      const json = fileReceived.replace(/[\{\}]/g, '');
      const lex = json.split(',')
        .map((item) => {
          const [key, value] = item.split(':');
          return [key.replace(/"/g, ''), value.replace(/"/g, '')];
        }
      );
      resolve(lex);
    }).catch((error) => {
      reject(error);
    });
  });
}

document.getElementById('submit-btn')?.addEventListener('click',
  function (event) {
    if (event.target instanceof HTMLButtonElement) {
      const response = document.getElementById('response-block') as
        HTMLDivElement;
      const resultDiv = document.getElementById('solution') as HTMLDivElement;
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
      } else if (stopWords.length === 0) {
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


document.getElementById('info-btn')?.addEventListener('click', function(event) {
  document.getElementsByClassName('popup')[0].classList.remove('hidden');
  document.getElementsByClassName('popup')[0].classList.add('shown');
});

document.getElementById('close-btn')?.addEventListener('click',
    function(event) {
      document.getElementsByClassName('popup')[0].classList.remove('shown');
      document.getElementsByClassName('popup')[0].classList.add('hidden');
    });

export function buildMatrix(docs: string[], stopWords: string[], corpus: string[][]): [number[][], number[]] {
  const matrix: number[][] = [];
  const allWords: string[] = [];
  const df: number[] = [];
  docs.forEach((doc) => {
    matrix.push([]);
    const words = doc.split(' ')
      .map((word) => word.toLowerCase().trim())
    words.forEach((word) => {
      if (!allWords.includes(word) && !stopWords.includes(word)) {
        df.push(1);
        allWords.push(word);
      } else if (!stopWords.includes(word)) {
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

export function solve(docs: string[], stopWords: string[], corpus: string[][]): string {
  const [matrix, df] = buildMatrix(docs, stopWords, corpus);
  const tf: number[][] = [];
  const idf: number[] = [];
  const tfidf: number[][] = [];
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
  const vectorLengths: number[] = [];
  tfidf.forEach((row) => {
    vectorLengths.push(0);
    row.forEach((value) => {
      vectorLengths[tfidf.indexOf(row)] += value ** 2;
    });
    vectorLengths[tfidf.indexOf(row)] = Math.sqrt(vectorLengths[tfidf.indexOf(row)]);
  });
  const normalizedTfidf: number[][] = [];
  tfidf.forEach((row) => {
    normalizedTfidf.push([]);
    row.forEach((value) => {
      normalizedTfidf[tfidf.indexOf(row)].push(value / vectorLengths[tfidf.indexOf(row)]);
    });
  });
  const cosineSimilarity: number[][] = [];
  for (let i = 0; i < normalizedTfidf.length; i++) {
    cosineSimilarity.push([]);
    for (let j = 0; j < normalizedTfidf.length; j++) {
      cosineSimilarity[i].push(0);
      for (let k = 0; k < normalizedTfidf[i].length; k++) {
        cosineSimilarity[i][j] += normalizedTfidf[i][k] * normalizedTfidf[j][k];
      }
    }
  }
  return formatOutput(matrix, df, tf, idf, tfidf, vectorLengths, normalizedTfidf, cosineSimilarity);
}

export function formatOutput(
  matrix: number[][],
  df: number[],
  tf: number[][],
  idf: number[],
  tfidf: number[][],
  vectorLengths: number[],
  normalizedTfidf: number[][],
  cosineSimilarity: number[][],
): string {
  return '';
}