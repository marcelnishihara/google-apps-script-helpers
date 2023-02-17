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
     * > .datetimeFormatted(new Date(2023, 2, 1, 7, 30), '-')
     * > console.log(dT)
     * '2023-02-01-07h30min00s'
     * ```
     * @function datetimeFormatted
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
  }
