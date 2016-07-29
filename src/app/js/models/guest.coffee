###
    Guest model
###
define [
    'knockout'
    'fabric'
], ( ko, fabric ) ->

    class Guest
        constructor: (options) ->
            #console.log 'options', options

            @firstName = options.firstName
            @lastName = options.lastName
            @rsvpStatus = options.rsvpStatus
            @gender = options.gender
            @ageGroup   = options.ageGroup ? '30s'


        fullName: ->
            @firstName + ' ' + @lastName


        createCanvasItem: () ->
            console.log 'bla'

            @canvasNode = new fabric.Rect({
                originX: 'center',
                originY: 'center',
                left: @leftPos,
                top: @topPos,
                fill: @chairColor,
                width: @chairSize,
                height: @chairSize,
            })

            return @canvasNode