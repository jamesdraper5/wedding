var version = 'v=0.1';
if(typeof window != "undefined") {
    //if(window.twDeskConfig.isDeveloperMode) {
        version += new Date().getTime();
    //}
}

var require = {
    baseUrl: '.',
    urlArgs: version,
    paths: {
        'requireLib': 'libs/bower/requirejs/require',
        // Please keep A-Z (F9 in Sublime)
        'app':                       'src/app/js/app',
        'bindings-ladda':            'src/app/bindings/ladda',
        'bootstrap':                 'src/libs/bower/bootstrap/dist/js/bootstrap.min',
        'jquery':                    'src/libs/bower/jquery/dist/jquery.min',
        'knockout':                  'src/libs/bower/knockout/dist/knockout',
        'ladda':                     'src/libs/bower/ladda/dist/ladda.min',
        'moment':                    'src/libs/bower/moment/min/moment.min',
        'spin':                      'src/libs/bower/ladda/dist/spin.min', // needed by Ladda
        'text':                      'src/libs/bower/text/text'
        //'config-components':         'app/config/components'


    }
};
