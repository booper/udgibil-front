import { DateTime } from "luxon";
import { format, register } from "timeago.js";

const localeEn = (number, index, totalSec) => {
  // number: the timeago / timein number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ["just now", "right now"],
    ["%s seconds ago", "in %s seconds"],
    ["1 minute ago", "in 1 minute"],
    ["%s minutes ago", "in %s minutes"],
    ["1 hour ago", "in 1 hour"],
    ["%s hours ago", "in %s hours"],
    ["1 day ago", "in 1 day"],
    ["%s days ago", "in %s days"],
    ["1 week ago", "in 1 week"],
    ["%s weeks ago", "in %s weeks"],
    ["1 month ago", "in 1 month"],
    ["%s months ago", "in %s months"],
    ["1 year ago", "in 1 year"],
    ["%s years ago", "in %s years"],
  ][index];
};

const localeRu = (number, index, totalSec) => {
  // number: the timeago / timein number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ["только что", "сейчас"],
    ["%s секунд назад", "через %s секунд"],
    ["1 минуту назад", "через  1 минуту"],
    ["%s минут назад", "через %s минут"],
    ["1 час назад", "через 1 час"],
    ["%s часов назад", "через %s часов"],
    ["1 день назад", "через 1 день"],
    ["%s дней назад", "через %s дней"],
    ["1 неделю назад", "через 1 неделю"],
    ["%s недели назад", "через %s недель"],
    ["1 месяц назад", "через 1 месяц"],
    ["%s месяцев назад", "через %s месяцев"],
    ["1 год назад", "через 1 год"],
    ["%s лет назад", "через %s лет"],
  ][index];
};

export function useTimeAgo() {
  register("en", localeEn);
  register("ru", localeRu);
  const formatedDateTimeAgo = (dateISO, locale) => {
    const dt = DateTime.fromISO(dateISO).toLocal().toISO();
    return format(dt, locale);
  };

  return {
    formatedDateTimeAgo,
  };
}
