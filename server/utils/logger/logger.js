const colourLib = require('colour');

const NOT_A_FUNCTION_ERROR_MESSAGE = (method) =>
  `Logger: printer.${method} is not a function!`;

const colourThemes = {
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: ['yellow', 'underline'],
  debug: 'blue',
  error: 'red bold'
};

const colourThemeKeys = Object.keys(colourThemes);

colourLib.setTheme(colourThemes);

const logger = (config) => (message) => {
  const { printer, method, colour } = config;
  if (typeof printer[method] !== 'function') {
    throw NOT_A_FUNCTION_ERROR_MESSAGE(method);
  }

  if (colour && typeof colour === 'string') {
    const colourToLowerCase = colour.toLowerCase();
    if (colourThemeKeys.indexOf(colourToLowerCase) !== -1) {
      printer[method](message[colourToLowerCase]);
      return;
    }
  }

  printer[method](message);
};


module.exports = { logger };
