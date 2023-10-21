import { App } from '@capacitor/app';

export default function (context) {
    App.addListener('appUrlOpen', data => {
        const slug = data.url.slice(data.url.indexOf('#') + 1)
        // We only push to the route if there is a slug present
        if (slug) {
            context.redirect(slug)
        }
    });

    App.addListener('backButton', ({canGoBack}) => {
        if(canGoBack){
            context.app.router.go(-1)
        }else {
            App.exitApp()
        }
    })
}