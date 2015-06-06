define [
    "knockout"
    "text!./template.html"
    "moment"
], (ko, templateMarkup, moment) ->

    VM = (params) ->

        @weddingDate = app.weddingDate
        @timeToWedding = app.timeToWedding # This returns a relevant string depending on the length of time, e.g. "2 days" or "4 months"
        @photos = ko.observableArray([])
        @photosLoaded =ko.observable false

        @initializePhotos()

        return

    VM::initializePhotos = () ->

        self = @

        $.getJSON('api/public/photos',
            weddingdate: @weddingDate.format("YYYY-MM-DD"),
            (response) ->
                console.log 'response.data', response
                self.photos(response.data)
                if self.photos().length
                    console.log 'here'
                    self.photosLoaded true
                return

        )

        return


    return {
        viewModel: VM
        template: templateMarkup
    }