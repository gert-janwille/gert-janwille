const fs = require('fs');
var path = require('path');

module.exports = (file, folder) => {
  const uploadPath = path.join(__dirname, `/../uploads/${folder}`);

  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
  file.pipe(fs.createWriteStream(uploadPath + file.hapi.filename));

  return file.hapi.filename;

};
