function formatDate(date) {
  let year = date.getFullYear();
  let mon = date.getMonth() + 1;
  let day = date.getDate();
  let res = "" + year;
  if (mon >= 10) res += mon;
  else res += "0" + mon;
  if (day >= 10) res += day;
  else res += "0" + day;
  return res;
}

export default formatDate;
