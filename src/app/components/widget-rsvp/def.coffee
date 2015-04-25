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
        @isSubmitting = ko.observable false
        return

    VM::submitForm = () ->
        rsvpData = {
            name: @name()
            emailAddress: @emailAddress()
            phoneNumber: @phoneNumber()
            attendees: @attendees()
            extraInfo: @extraInfo()
        }

        @isSubmitting true

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
                @isSubmitting false

                app.showAlert({
                    alertMessage: "<strong>Thanks!</strong> We're looking forward to seeing you!",
                    alertType: 'success'
                })

                $("#rsvp").slideUp(400)



            error: (xhr) =>
                console.log 'xhr', xhr
                @isSubmitting false

                app.showAlert({
                    alertMessage: "<strong>Oh no, There's been a problem sending your RSVP :( </strong> <br> Would you mind <a class='alert-link' href='mailto:rsvp@lucyandjameswedding.com'>emailing us</a> instead while we get this fixed. Thanks.",
                    alertType: 'danger'
                })

        return








    return {
        viewModel: VM
        template: templateMarkup
    }