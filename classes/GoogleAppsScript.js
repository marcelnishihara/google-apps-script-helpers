/**
 * @class GoogleAppsScript
 * @author Marcel Nishihara <marcelnishihara+github@gmail.com>
 * @see {@link https://github.com/marcelnishihara/google_apps_script GitHub}
 * @see {@link https://developers.google.com/apps-script Google Apps Script}
 */
class GoogleAppsScript {
    /**
     * An easy-to-use class to help developers to avoid excessive coding
     * while using the Google Apps Script.
     * 
     * @class GoogleAppsScript
     */
    constructor() {

    }


    /**
     * Very simple method that return a string of a date and time to be
     * used to name log files, register the moment when a script ran, et
     * cetera.
     * 
     * Here's an example:
     * ```
     * > const dT = GoogleAppsScript
     * > .datetimeFormatted(new Date(2023, 2, 1, 9, 0), '-')
     * > console.log(dT)
     * '2023-02-01-09h00min00s'
     * ```
     * @function datetimeFormatted
     * 
     * @param {Date} [date] Date to be formatted. If omitted, the date 
     * and time to be considered is the moment when the script ran.
     * 
     * @param {string} [separator] A string used to separate the
     * following elements: year, month, day, and hour. If ommited,
     * Those elements will be separated by underscore. e.g.:
     * ```
     * '2023_02_01_09h00min00s'
     * ```
     * 
     * @returns {string}
     */
    static datetimeFormatted(date = new Date(), separator = '_') {

      let datetime = {
        'year': date.getFullYear(),
        'month': date.getMonth() + 1,
        'day': date.getDate(),
        'h': date.getHours(),
        'min': date.getMinutes(),
        's': date.getSeconds()
      }

      Object.keys(datetime).forEach(function (key) {
        let value = datetime[key]
        if (value < 10) { datetime[key] = `0${value}` }
      })

      return [
        datetime.year,
        separator,
        datetime.month,
        separator,
        datetime.day,
        separator,
        datetime.h,
        'h',
        datetime.min,
        'min',
        datetime.s,
        's'
      ].join('')

    }


    /**
     * An amazing method to create a Google Drive file from given 
     * content, file name, folder ID where you want it to be saved, 
     * and MIME type.
     * 
     * Here's an example:
     * ```
     * > const todayIs = GoogleAppsScript.datetimeFormatted()
     * > const createLogFile = GoogleAppsScript.logIntoFile(
     * >  'Hello, World!', 
     * >  DriveApp.createFolder('myAmazingFolder').getId(), 
     * >  `my_log_file_${todayIs}`,
     * >  MimeType.RTF)
     * > console.log(createLogFile.success)
     * true
     * ```
     * @function logIntoFile
     * 
     * @param {*} [contentToLog] Anything you want to be logged because
     * of reasons.
     * 
     * @param {string} [folderId] Folder ID where the file will be saved.
     * If ommited, the file will be saved into your Google Drive root
     * folder.
     * 
     * @param {string} [logFileName] The file name that you want to 
     * create without its extension. If ommited, your file will be
     * named as `logFile`.
     * 
     * @param {string} [mimeType] Log file MIME type. If ommited, the
     * default value is `application/json`.
     * 
     * @returns {object}
     */
    static logIntoFile(
      contentToLog,
      folderId = DriveApp.getRootFolder().getId(),
      logFileName = 'logFile',
      mimeType = 'application/json') {
        try {
          const extension = /.+?\/(.{3,})/.exec(mimeType)[1]
          logFileName = `${logFileName}.${extension}`
          const destination = DriveApp.getFolderById(folderId)
          const logFile = DriveApp.createFile(
            logFileName,
            JSON.stringify(contentToLog, null, 4),
            mimeType)

          logFile.moveTo(destination)

          const successMsg = [
            `The file "${logFileName}" was created into the folder `,
            `"${destination.getName()}" (ID: "${folderId}") under `,
            `the URL ${logFile.getUrl()}`
          ].join('')

          console.log(successMsg)

          return {
            'success': true,
            'message': successMsg,
            'fileName': logFileName,
            'fileId': logFile.getId(),
            'fileUrl': logFile.getUrl(),
            'fileMimeType': mimeType,
            'destinationFolderName': destination.getName(),
            'destinationFolderId': folderId
          }

        } catch(err) {
          const msgErr = [
            'Class GoogleAppsScript, logIntoFile() method ',
            `tried to create a log file called "${logFileName}", `,
            `MIME type "${mimeType}", into the folder "${folderId}" `,
            `and failed! Here's the error message raised ${err}`
          ].join('')

          console.error(msgErr)

          return {
            'success': false,
            'message': msgErr
          }
        }
    }
  }
