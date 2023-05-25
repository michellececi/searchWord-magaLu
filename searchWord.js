#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const WordSearch = require("./WordSearch");

const directoryPath = process.argv[3];
const searchWord = process.argv[2];

if (fs.existsSync(directoryPath)){
    if (!searchWord) {
        console.log('Por favor, forneça a palavra a ser buscada como argumento.');
        process.exit(1);
    } else {    
        (async () => {
            try {                  
              const Data = new WordSearch(directoryPath, searchWord);         
              const result = await Data.searchWordInFiles();          

              let totalOccurrences = 0;
              result.forEach((file) => {
                totalOccurrences += file.matches;
              });
          
              console.log(`Total de ocorrências da palavra "${searchWord}": ${totalOccurrences}`);
              console.log(`A palavra "${searchWord}" foi encontrada em ${result.length} arquivo(s):`);
          
              result.forEach((file) => {
                console.log(`- ${file.file}: ${file.matches} ocorrência(s)`);
              });         
            
              
            } catch (error) {
              console.error('Ocorreu um erro:', error);
            }
          })();
          
    }

} else {
    console.log(`O diretório ${directoryPath} não existe. Por favor, forneça um diretório válido.`);
    process.exit(1);
} 
