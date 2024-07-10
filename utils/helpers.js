// utils/helpers.js
module.exports = {
  format_date: (date) => {
    if (!date) return ''; // Return an empty string if date is undefined
    return date.toLocaleDateString();
  }
};
