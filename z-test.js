const formater = (format = 'normal', date = null) => {
  // console.log("format: ", format)
  // console.log("date: ", date)
  let d = date == null ? new Date() : date;
  let DD = day(d.getDay());
  let dd = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  let m = d.getMonth() + 1;
  let mm = d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  let MMMM = month(d.getMonth());
  let yy = d.getDay();
  let yyyy = d.getFullYear();
  let hh = d.getHours();
  let ii = d.getMinutes();
  let ss = d.getSeconds();

  if (format === 'normal') return `${dd}-${mm}-${yyyy}`;
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

const today = (format = 'normal') => {
  return formater(format);
};

const normal = (date = null) => {
  return formater('normal', date);
};

const normalv1 = (date = null) => {
  return formater('normalv1', date);
};

const reversev1 = (date = null) => {
  return formater('reversev1', date);
};

const nextWeek = () => {
  const date = new Date();
  return formater('reversev1', new Date(date.setDate(date.getDate() + 7)));
};

const lastWeek = () => {
  const date = new Date();
  return formater('reversev1', new Date(date.setDate(date.getDate() - 7)));
};

console.log(formater('normal', new Date('2018-10-10')));
