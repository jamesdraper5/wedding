define [
    'knockout'
    'fabric'
    'seat'
], (ko, fabric, seat) ->

    class Table
        constructor: (options) ->
            console.log 'options', options

            @name = options.id ? 'Test table'

            @horizontalSeatCount = 2
            @horizontalSpacesCount = @horizontalSeatCount + 1 # if there is 1 seat, there is a space either side of it, 2 seats = 3 spaces, etc

            @verticalSeatCount = 2
            @verticalSpacesCount = @verticalSeatCount + 1

            @chairSize = 25 # width and height

            @seatSpaceMultiplier = 0.5 # gives a space on either side of a chair the width of half a chair

            @tableWidth = @horizontalSeatCount * @chairSize + ((@seatSpaceMultiplier * @chairSize * 2) * @horizontalSeatCount) # 2 * 25 + ((0.5 * 25 * 2) * 2) = (50 + (25 * 2)) = 100
            @tableHeight = @verticalSeatCount * @chairSize + ((@seatSpaceMultiplier * @chairSize * 2) * @verticalSeatCount)

            @spacesWidth = @chairSize/2

            @chairOffsetLeft = (@tableWidth - @chairSize) - @chairSize/2
            @chairOffsetTop = (@tableHeight - @chairSize) - @chairSize/2

            @placeWidth = @chairSize + (@spacesWidth * 2) # a chair with a space either side of it

            @sides = [
                {
                    name: 'top',
                    leftMultiplier: -1,
                    topMultiplier: -1,
                    seatCount: @horizontalSeatCount
                },
                {
                    name: 'right',
                    leftMultiplier: 1,
                    topMultiplier: -1,
                    seatCount: @verticalSeatCount
                },
                {
                    name: 'bottom',
                    leftMultiplier: 1,
                    topMultiplier: 1,
                    seatCount: @horizontalSeatCount
                },
                {
                    name: 'left',
                    leftMultiplier: -1,
                    topMultiplier: 1,
                    seatCount: @verticalSeatCount
                }
            ]

            @seats = ko.observableArray([])
            @guests = ko.observableArray(options.guests)
            @guests.id = @name
            return

        createCanvasItem: () ->
            console.log 'bla'

            # Table
            table = new fabric.Rect(
                originX: 'center'
                originY: 'center'
                width: @tableWidth
                height: @tableHeight
                fill: '#fff'
                strokeWidth: 1
                stroke: '#ccc'
            )

            text = new fabric.Text(@name, {
                fontSize: 14,
                originX: 'center',
                originY: 'center'
            })

            # Canvas Group
            @canvasNode = new fabric.Group([ table, text ],
                left: 60,
                top: 60,
                lockScalingX: true,
                lockScalingY: true
            )


            for side in @sides

                if ['top','bottom'].indexOf(side.name) > -1

                    chairOffsetTop = @tableHeight/2 + @spacesWidth
                    topPos = (chairOffsetTop * side.topMultiplier) + (2 * side.topMultiplier) # 2px margin between seat and table
                    chairColor = 'red'

                else

                    chairOffsetLeft = @tableWidth/2 + @spacesWidth
                    leftPos = (chairOffsetLeft * side.leftMultiplier) - (2 * side.topMultiplier) # 2px margin between seat and table
                    chairColor = 'blue'


                for count in [0...side.seatCount] by 1

                    if ['top','bottom'].indexOf(side.name) > -1
                        leftPos = (@tableWidth/2 - ((@chairSize/2 + @spacesWidth) + @placeWidth * count))
                    else
                        topPos = (@tableHeight/2 - ((@chairSize/2 + @spacesWidth) + @placeWidth * count))


                    seat1 = new seat(
                        chairSize: 25
                        topPos: topPos
                        leftPos: leftPos
                        chairColor: chairColor
                    )

                    @seats.push(seat1)
                    @canvasNode.add(seat1.createCanvasItem())

            return @canvasNode
