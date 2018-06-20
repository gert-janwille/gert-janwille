const createValidString = str => str.split(' ').join('-').toLowerCase().replace(/[.,_`~()]/g,"");

module.exports = {
  createValidString
}
