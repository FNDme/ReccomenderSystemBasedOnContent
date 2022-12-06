import * as fs from 'fs';
import { printTable, Table } from 'console-table-printer';

export function readDoc(path: string): string[] {
  const file = fs.readFileSync(path, 'utf-8');
  return file.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

export function readStopWords(path: string): string[] {
  const file = fs.readFileSync(path, 'utf-8');
  return file.split('\n')
    .map((word) => word.trim())
    .filter((word) => word.length > 0);
}

export function readCorpus(path: string): string[][] {
  const file = fs.readFileSync(path, 'utf-8');
  const json = file.replace(/[\{\}]/g, '');
  const lex = json.split(',')
    .map((item) => {
      const [key, value] = item.split(':');
      return [key.replace(/"/g, ''), value.replace(/"/g, '')];
    }
  );
  return lex;
}

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

export function solve(docs: string[], stopWords: string[], corpus: string[][]): any {
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
  return [matrix, df, tf, idf, tfidf, vectorLengths, normalizedTfidf, cosineSimilarity]
}

export function printSol(
  matrix: number[][],
  df: number[],
  tf: number[][],
  idf: number[],
  tfidf: number[][],
  vectorLengths: number[],
  normalizedTfidf: number[][],
  cosineSimilarity: number[][]
): void {
  //   Para cada documento, tabla con las siguientes columnas:
  // Índice del término.
  // Término.
  // TF.
  // IDF.
  // TF-IDF.
  matrix.forEach((row, i) => {
    console.log(`Documento ${i + 1}`);
  });
}

const exampleDocPath = 'example/examples-documents/documents-01.txt';
const exampleStopWordsPath = 'example/stop-words/stop-words-en.txt';
const exampleCorpusPath = 'example/corpus/corpus-en.txt';

const [matrix, df, tf, idf, tfidf, vectorLengths, normalizedTfidf, cosineSimilarity] = solve(readDoc(exampleDocPath), readStopWords(exampleStopWordsPath), readCorpus(exampleCorpusPath));
printSol(matrix, df, tf, idf, tfidf, vectorLengths, normalizedTfidf, cosineSimilarity);