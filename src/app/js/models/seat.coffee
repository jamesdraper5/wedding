###
    Seat model
###
define [
    'knockout'
    'fabric'
], ( ko, fabric ) ->

    class Seat
        constructor: (options) ->
            #console.log 'options', options

            @chairSize = options.chairSize
            @topPos = options.topPos
            @leftPos = options.leftPos
            @chairColor = options.chairColor ? 'red'

        createCanvasItem: () ->
            console.log 'seat - createCanvasItem'

            @canvasNode = new fabric.Rect(
                originX: 'center'
                originY: 'center'
                left: @leftPos
                top: @topPos
                width: @chairSize
                height: @chairSize
                rx: 4
                ry: 4
                fill: '#fff'
                strokeWidth: 1
                stroke: '#ccc'
            )

            return @canvasNode