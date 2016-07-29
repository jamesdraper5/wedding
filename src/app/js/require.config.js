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
        'app':                      'src/app/js/app',
        'bindings-ladda':           'src/app/bindings/ladda',
        'bootstrap':                'src/libs/bower/bootstrap/dist/js/bootstrap.min',
        'fabric':                   'src/libs/bower/fabric/dist/fabric.require',
        'jquery':                   'src/libs/bower/jquery/dist/jquery.min',
        'jquery-ui':                'src/libs/bower/jquery-ui/jquery-ui',
        'knockout':                 'src/libs/bower/knockout/dist/knockout',
        'knockout-sortable':        'src/libs/bower/knockout-sortable/build/knockout-sortable.min',
        'ladda':                    'src/libs/bower/ladda/dist/ladda.min',
        'moment':                   'src/libs/bower/moment/min/moment.min',
        'spin':                     'src/libs/bower/ladda/dist/spin.min', // needed by Ladda
        'text':                     'src/libs/bower/text/text',
        //'config-components':         'app/config/components'
        /********* Models *********/
        'guest':                    'src/app/js/models/guest',
        'seat':                     'src/app/js/models/seat',
        'table':                    'src/app/js/models/table'


    },
    map: {
        '*': {
            'jquery-ui/sortable': 'jquery-ui',
            'jquery-ui/draggable': 'jquery-ui'
        }
    }
};
