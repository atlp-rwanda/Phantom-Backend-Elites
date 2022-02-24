import path from 'path';
import i18next from 'i18next';
import middleware from "i18next-express-middleware";
import backend from 'i18next-node-fs-backend';
import languageDetector from 'i18next-browser-languagedetector';

i18next.use(backend)
       .use(middleware.LanguageDetector)
       .init({
            fallbackLng: 'en',
            preload:['en','fr'],
            backend:{
                loadPath: path.join( __dirname,'../public/locales/{{lng}}.json')
            },
            detection:{
                order: ["header","htmlTag","querystring", "cookie","path",],
                caches: ["cookie"],
            }    
        },(err, t) => {
            if (err) return console.log('something went wrong loading', err);
        })  

export {i18next as default};





