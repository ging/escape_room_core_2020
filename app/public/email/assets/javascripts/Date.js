var referenceDate = moment(moment().format('DD') + moment().format('MM') + moment().format('YYYY') + "12:27", "DDMMYYYYh:mm").subtract(1, 'days');

export function printDate(daysFromReference, format) {
  var date = referenceDate.clone();
  var dateFormat = 'DD-MM-YYYY';

  if (typeof daysFromReference === "number") {
    if (daysFromReference < 0) {
      date.subtract(-daysFromReference, 'days');
    } else if (daysFromReference > 0) {
      date.add(daysFromReference, 'days');
    }
  }

  if (typeof format === "string") {
    dateFormat = format;
  }

  return date.locale("es").format(dateFormat);
};