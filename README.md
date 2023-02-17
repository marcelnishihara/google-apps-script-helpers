# Google Apps Script

It is a compilation of classes, functions, and tips to help developers' routines easier when they working with Google Apps Script from Google Workspace (formerly G Suite).


## Classes

- `SpreadsheetReader`:
  - Description: An easy-to-use class to help developers read Google Sheets file data from a given spreadsheet ID and sheet name in Google Apps Script context (Google Workspace);
  - Properties:
    - `spreadsheetId`: Google Sheet File ID or the active spreadsheet. 
    - `spreadsheetById`: Return of the method `SpreadsheetApp.openById({spreadsheetId})`.
    - `sheetByName`: Sheet name to be read;
    - `dataAsJson`: Property that will recieve data in the method `SpreadsheetReader({sheetName}).sheetDataAsJson()`

  - Methods:
    - `sheetDataAsJson`: The `sheetDataAsJson` method transforms a table from a given sheet into a beautiful JSON valid object. It's normal to get emotional after running it.
  - How to Use It:
    ```js
    > const sheet = new SpreadsheetReader('myAmazingSheet')
    > sheet.sheetDataAsJson()
    > console.log(sheet.dataAsJson)
    [
      { '1_cellA1': 'cellA2Value', '2_cellA2': 'cellB2Value' },
      { '1_cellA1': 'cellA3Value', '2_cellA2': 'cellB3Value' },
      { '1_cellA1': 'cellA4Value', '2_cellA2': 'cellB4Value' }
    ]
    ```


## Author
- Marcel Nishihara, <marcelnishihara+github@gmail.com>
