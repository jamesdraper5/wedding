define [
    "knockout"
    "text!./template.html"
    "moment"
], (ko, templateMarkup, moment) ->

    VM = (params) ->

        @weddingDate = app.weddingDate
        @timeToWedding = app.timeToWedding # This returns a relevant string depending on the length of time, e.g. "2 days" or "4 months"

        @initializePhotosAdmin()

        return

    VM::initializePhotosAdmin = () ->

        # Subscribe to global "mapLoaded" notification
        app.notifier.subscribe(
            (response) ->
                @statusChangeCallback response
                return response
            this,
            "facebookEvent"
        )

        return

    # This is called with the results from from FB.getLoginStatus().
    VM::statusChangeCallback = (response) ->
        console.log('statusChangeCallback')
        console.log('response', response)

        if response.status is 'connected'
            console.log 'connected'

            # Logged into your app and Facebook.
            @storeFacebookToken()

        else if response.status is 'not_authorized'

            # The person is logged into Facebook, but not your app.
            console.log 'Please log into this app.'

        else

            # The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
            console.log 'Please log into Facebook.'

        return


    # Here we run a very simple test of the Graph API after login is
    # successful.  See statusChangeCallback() for when this call is made.
    VM::storeFacebookToken = () ->
        console.log('storeFacebookToken')
        console.log('Welcome!  Fetching your information.... ')

        FB.api('/me', (response) ->
            console.log('Successful login for: ' + response.name)
        )

        console.log('TO DO: Save Facebook Auth token to server...')

        return

    VM::checkLoginState = () ->
        console.log('checkLoginState')

        return



    return {
        viewModel: VM
        template: templateMarkup
    }
