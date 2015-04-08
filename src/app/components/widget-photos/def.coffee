define [
    "knockout"
    "text!./template.html"
    "moment"
], (ko, templateMarkup, moment) ->

    VM = (params) ->

        @weddingDate = app.weddingDate
        @timeToWedding = app.timeToWedding # This returns a relevant string depending on the length of time, e.g. "2 days" or "4 months"
        return

    VM::initializePhotos = () ->


        return






    return {
        viewModel: VM
        template: templateMarkup
    }