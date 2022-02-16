var i18n = require('i18n');

i18n.configure({
    defaultLocale: 'en',
    // setup some locales - other locales default to en silently
    locales:['en', 'cy'],

    // where to store json files - defaults to './locales' relative to modules directory
    directory: __dirname + '/locales',

    
    register: global
  
});

module.exports = async function(req, res, next) {

    const headres = req.headers;
    i18n.init(req, res);
    // i18n.setLocale(req.headers.accept-language);
            

    return next();
};