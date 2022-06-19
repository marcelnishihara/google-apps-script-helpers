# Google Apps Script

It is a compilation of classes, functions, and tips to help developers' routines easier when they working with Google Apps Script from Google Workspace (formerly G Suite).


## Classes

- `SpreadsheetReader`:
  - Description: An easy-to-use class to help developers read Google Sheets file data from a given spreadsheet ID and sheet name in Google Apps Script context (Google Workspace);
  - Properties:
    - `sheetByName`: Sheet name to be read;
    - `spreadsheetId`: Google Sheet File ID or the active spreadsheet.
  - Methods:
    - `spreadsheet`: The `spreadsheet` method returns the spreadsheet file opened by `spreadsheetId`;
    - `sheet`: The `sheet` method returns the Class Sheet from a sheet opened by name;
    - `sheetDataAsJson`: The `sheetDataAsJson` method transforms a table from a given sheet into a beautiful JSON valid object. It's normal to get emotional after running it.
  - How to Use It:
    ```js
    > let sheet = new SpreadsheetReader('myAmazingSheet')
    > let dataAsJson = sheet.sheetDataAsJson()
    > console.info(dataAsJson)
    [
      { keyOne: 'valueFromCellA2', keyTwo: 'valueFromCellB2', keyThree: 'valueFromCellC2' },
      { keyOne: 'valueFromCellA3', keyTwo: 'valueFromCellB3', keyThree: 'valueFromCellC3' },
      { keyOne: 'valueFromCellA4', keyTwo: 'valueFromCellB4', keyThree: 'valueFromCellC4' }
    ]
    ```


## Author
- Marcel Nishihara, <marcelnishihara@gmail.com>