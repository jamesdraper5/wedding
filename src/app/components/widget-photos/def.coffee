define [
    "knockout"
    "text!./template.html"
    "moment"
], (ko, templateMarkup, moment) ->

    VM = (params) ->

        @weddingDate = app.weddingDate
        @timeToWedding = app.timeToWedding # This returns a relevant string depending on the length of time, e.g. "2 days" or "4 months"
        @photos = ko.observableArray([])

        @initializePhotos()

        return

    VM::initializePhotos = () ->

        self = @

        $.getJSON('api/public/photos', (response) ->
            self.photos(response.data)
            return

        )

        return


    return {
        viewModel: VM
        template: templateMarkup
    }