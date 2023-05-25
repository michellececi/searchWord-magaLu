const fs = require('fs');
const path = require('path');
const  WordSearch = require('./WordSearch'); 

describe('searchWordInFiles', () => {
   
  const testDir = './test-directory'; 
  const testWord = 'test';   

  beforeAll(() => {    
    fs.mkdirSync(testDir);
    fs.writeFileSync(path.join(testDir, 'file1.txt'), 'This is a test file.', 'utf-8');
    fs.writeFileSync(path.join(testDir, 'file2.txt'), 'Another test in this file.', 'utf-8');
    fs.writeFileSync(path.join(testDir, 'file3.txt'), 'No match in this file.', 'utf-8');
  });

  afterAll(() => {    
    fs.unlinkSync(path.join(testDir, 'file1.txt'));
    fs.unlinkSync(path.join(testDir, 'file2.txt'));
    fs.unlinkSync(path.join(testDir, 'file3.txt'));
    fs.rmdirSync(testDir);
  });

  test('should return correct results for search', () => {
    const expectedResult = [
      { file: 'file1.txt', matches: 1 },
      { file: 'file2.txt', matches: 1 }
    ];
    const Data = new WordSearch(testDir);
    const result = Data.searchWordInFiles(testWord);
    console.log("result", result);
    expect(result).toEqual(expectedResult);
  });

  test('should return empty array if no match', () => {
    const Data = new WordSearch(testDir);  
    const expectedResult = [];
    const result = Data.searchWordInFiles('nonexistent');
    expect(result).toEqual(expectedResult);
  });
});
