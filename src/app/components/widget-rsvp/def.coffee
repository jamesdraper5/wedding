define [
    "knockout"
    "text!./template.html"
    "moment"
], (ko, templateMarkup, moment) ->

    VM = (params) ->

        @weddingDate = moment("2015-08-27")
        @timeToWedding = @weddingDate.from(moment(), true) # This returns a relevant string depending on the length of time, e.g. "2 days" or "4 months"
        return

    VM::submitForm = () ->

        console.log 'submit'
        return








    return {
        viewModel: VM
        template: templateMarkup
    }