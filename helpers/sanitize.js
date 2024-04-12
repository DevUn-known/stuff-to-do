// Package imports
const  createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const sanitizeObject = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = DOMPurify.sanitize(obj[key]).replace(/(<([^>]+)>)/ig, '');
      } else if (typeof obj[key] === 'object' && obj[key]!== null) {
        sanitizeObject(obj[key]);
      }
    }
};

module.exports = sanitizeObject;