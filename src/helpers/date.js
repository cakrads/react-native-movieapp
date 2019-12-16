const formater = (format = 'normal', date = null) => {
  // console.log("format: ", format)
  // console.log("date: ", date)
  let d = date == null ? new Date() : date;
  let DD = day(d.getDay());
  let dd = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  let m = d.getMonth() + 1;
  let mm = d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  let MMMM = month(d.getMonth());
  let MM = miniMonth(d.getMonth());
  let yy = d.getDay();
  let yyyy = d.getFullYear();
  let hh = d.getHours();
  let ii = d.getMinutes();
  let ss = d.getSeconds();

  if (format === 'normal') return `${dd}-${mm}-${yyyy}`;
  else if (format === 'simple') return `${MM}, ${dd}`;
  else if (format === 'date') return `${MMMM}, ${dd}`;
  else if (format === 'reverse') return `${yyyy}-${mm}-${dd}`;
  else if (format === 'normalv1') return `${dd}:${mm}:${yyyy}`;
  else if (format === 'reversev1') return `${yyyy}-${mm}-${dd}`;
  else if (format === 'reversev2') return [yyyy, mm, dd];
};

const day = index => {
  let x = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednsday',
    'Thursday',
    'Fryday',
    'Saturday',
  ];
  return x[index];
};

const month = index => {
  let x = [
    'January',
    'Februray',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Augustus',
    'Sebtember',
    'October',
    'November',
    'December',
  ];
  return x[index];
};

const miniMonth = index => {
  let x = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Seb',
    'Oct',
    'Nov',
    'Dec',
  ];
  return x[index];
};

export const today = (format = 'normal') => {
  return formater(format);
};

export const normal = (date = null) => {
  return formater('normal', date);
};

export const normalv1 = (date = null) => {
  return formater('normalv1', date);
};

export const reversev1 = (date = null) => {
  return formater('reversev1', date);
};

export const nextWeek = () => {
  const date = new Date();
  return formater('reversev1', new Date(date.setDate(date.getDate() + 7)));
};

export const lastWeek = () => {
  const date = new Date();
  return formater('reversev1', new Date(date.setDate(date.getDate() - 7)));
};

export const dateFormater = (a, b) => {
  return formater(a, b);
};
