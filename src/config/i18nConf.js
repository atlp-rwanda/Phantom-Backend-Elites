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

<<<<<<< HEAD
export {i18next as default};
=======
export default i18next
>>>>>>> 6dcb172 (Changes added to support multiple language setup)





