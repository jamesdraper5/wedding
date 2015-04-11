define [
    "knockout"
    "text!./template.html"
    "moment"
], (ko, templateMarkup, moment) ->

    VM = (params) ->

        @weddingDate = moment("2015-08-27")
        @timeToWedding = @weddingDate.from(moment(), true) # This returns a relevant string depending on the length of time, e.g. "2 days" or "4 months"
        @name = ko.observable "James Draper"
        @emailAddress = ko.observable "james@test.com"
        @phoneNumber = ko.observable "123123"
        @attendees = ko.observable "Jim"
        @extraInfo = ko.observable ""
        return

    VM::submitForm = () ->
        rsvpData = {
            name: @name()
            emailAddress: @emailAddress()
            phoneNumber: @phoneNumber()
            attendees: @attendees()
            extraInfo: @extraInfo()
        }


        console.log 'rsvpData', rsvpData


        $.ajax
            url: app.apiUrl + "/rsvp"
            method: "POST"
            data: JSON.stringify rsvpData
            contentType: "application/json"
            dataType: "json"
            success: (data) =>
                console.log 'data', data
                @name ""
                @emailAddress ""
                @phoneNumber ""
                @attendees ""
                @extraInfo ""
                alert 'Thanks for your RSVP!'
                $("#rsvp").slideUp(400)
            error: (xhr) =>
                console.log 'xhr', xhr

        return








    return {
        viewModel: VM
        template: templateMarkup
    }