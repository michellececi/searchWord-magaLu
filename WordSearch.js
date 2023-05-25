const fs = require('fs');
const path = require('path');

class WordSearch {
  constructor(directoryPath, word) {
    this.directoryPath = directoryPath;
    this.word = word;
  }

  async searchWordInFile(filePath, word) {
   
    return new Promise((resolve, reject) => {
      let totalMatches = 0;
      const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
  
      readStream.on('data', (chunk) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = (chunk.match(regex) || []).length;
        totalMatches += matches;
      });
  
      readStream.on('end', () => {
        resolve(totalMatches);
      });
  
      readStream.on('error', (error) => {
        reject(error);
      });
    });
  }
  

  
  async searchWordInFiles() {
    const files = fs.readdirSync(this.directoryPath);
    const matchingFiles = [];
  
    const filePromises = files.map(async (file) => {
      const filePath = path.join(this.directoryPath, file);
      return this.searchWordInFile(filePath, this.word).then((matches) => {
        if (matches > 0) {
          matchingFiles.push({ file, matches });
        }
      });
    });
  
    await Promise.all(filePromises);
  
    matchingFiles.sort((a, b) => a.file.localeCompare(b.file));
  
    return matchingFiles;
  }
  
  
}

module.exports = WordSearch;