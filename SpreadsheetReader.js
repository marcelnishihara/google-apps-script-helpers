/**
 * @class SpreadsheetReader
 * @author Marcel Nishihara <marcelnishihara@gmail.com>
 * @see {@link https://github.com/marcelnishihara/google_apps_script GitHub}
 * @see {@link https://developers.google.com/apps-script Google Apps Script}
 */
 class SpreadsheetReader {
    /**
     * An easy-to-use class to help developers read Google Sheets
     * file data from a given spreadsheet ID and sheet name in
     * Google Apps Script context (Google Workspace).
     * 
     * Usually, the Google Sheets file ID can be extracted from the
     * file URL, it is a bunch of characters between
     * "https://docs.google.com/spreadsheets/d/" and "/edit#gid=0".
     * When omitted, the `SpreadsheetReader` will try to read the 
     * active spreadsheed.
     * 
     * The sheet name it is pretty self explained and it can be reached
     * in the sheets menu at the bottom of the Google Sheets window.
     * 
     * @class SpreadsheetReader
     * @param {string} sheetName Sheet name to be read.
     * @param {string} [spreadsheetId] Google Sheet File ID or the active spreadsheet.
     */
    constructor(sheetName, spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId()) {
      this.spreadsheetById = SpreadsheetApp.openById(spreadsheetId)
      this.sheetByName = this.spreadsheetById.getSheetByName(sheetName)
    }
  
  
    /**
     * The `spreadsheet` method returns the spreadsheet file opened by `spreadsheetId`.
     * 
     * It is the same thing when you runs:
     * ```
     * SpreadsheetApp.openById(id)
     * ```
     * 
     * @function spreadsheet
     * @returns {SpreadsheetApp.Spreadsheet} Return of the openById(id) method.
     * @see https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#openbyidid
     */
    spreadsheet() {
      return this.spreadsheetById
    }
  
  
    /**
     * The `sheet` method returns the Class Sheet from a sheet opened by name.
     * 
     * It is the same thing when you runs:
     * ```
     * SpreadsheetApp.openById(id).getSheetByName(name)
     * ```
     * 
     * @function sheet
     * @returns {SpreadsheetApp.Sheet} Return of the getSheetByName(name) method.
     * @see https://developers.google.com/apps-script/reference/spreadsheet/sheet
     */
    sheet() {
      return this.sheetByName
    }
  
  
    /**
     * The `sheetDataAsJson` method transforms a table from a given sheet into
     * a beautiful JSON valid object. It's normal to get emotional after running it.
     * 
     * This method contains only one optional parameter and it refers to the index
     * of the row that you want that `sheetDataAsJson` assume as the keys (header) of
     * each object. If omitted, the default value is zero.
     * 
     * Here's an example:
     * ```
     * > let sheet = new SpreadsheetReader('myAmazingSheet')
     * > let dataAsJson = sheet.sheetDataAsJson()
     * > console.info(dataAsJson)
     * [
     *  { keyOne: 'valueFromCellA2', keyTwo: 'valueFromCellB2', keyThree: 'valueFromCellC2' },
     *  { keyOne: 'valueFromCellA3', keyTwo: 'valueFromCellB3', keyThree: 'valueFromCellC3' },
     *  { keyOne: 'valueFromCellA4', keyTwo: 'valueFromCellB4', keyThree: 'valueFromCellC4' }
     * ]
     * ``` 
     *
     * @function sheetDataAsJson
     * @param {number} [indexOfHeader] Index of the header.
     * @returns {Array} Sheet data as a JSON valid object (array of objects).
     */
    sheetDataAsJson(indexOfHeader = 0) {
      let dataAsJson = new Array()
      let sheetData = this.sheetByName.getDataRange().getValues()
      let ignoreHeader = indexOfHeader + 1
  
      sheetData.slice(ignoreHeader).forEach(function (row) {
        let rowAsObject = new Object()
  
        row.forEach(function (cell, cellIndex) {
          let objectKey = sheetData[indexOfHeader][cellIndex].toString().toLowerCase().replace(/\s/g, '_')
          cell instanceof Date ? rowAsObject[`${objectKey}_datetime`] = cell.toISOString() : rowAsObject[objectKey] = cell
        })
  
        dataAsJson.push(rowAsObject)
  
      })
  
      return dataAsJson
  
    }
  }
