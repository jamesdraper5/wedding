define [
    "knockout"
    "text!./template.html"
    "fabric"
    "knockout-sortable"
    "table"
    "seat"
    "guest"
], (ko, templateMarkup, fabric, koSortable, table, seat, guest) ->

    VM = (params) ->

        @canvas = new fabric.Canvas('test')

        @canvas.on(
            'object:moving': (e) ->
                e.target.opacity = 0.5
            ,
            'object:modified': (e) ->
                e.target.opacity = 1

        )

        # Not sure about these two vars yet, might need to refactor once its working...
        @availableGuests = ko.observableArray([]) # the guests without tables
        @tables = ko.observableArray([])
        @guests = ko.observableArray([])
        self = @




        #console.log '@tables', @tables





        @getData()



        #ko.bindingHandlers.sortable.beforeMove = @verifyAssignments
        ko.bindingHandlers.sortable.afterMove = @updateLastAction.bind(@)




        #@addGuest()

        #console.log '@guests', @guests()

        ko.bindingHandlers.flash =
            init: (element) ->
                $(element).hide()
            ,
            update: (element, valueAccessor) ->
                value = ko.utils.unwrapObservable(valueAccessor())
                if value
                    $(element).stop().hide().text(value).fadeIn(() ->
                        clearTimeout($(element).data("timeout"))
                        $(element).data("timeout", setTimeout(() ->
                            $(element).fadeOut()
                            valueAccessor()(null)
                        , 3000))
                    )

            ,
            timeout: null


        return

    VM::getData = () ->
        # TO DO: replace dummy data with an AJAX call

        extraGuests = [
            new guest(
                firstName: 'Bob'
                lastName: 'Draper'
                rsvpStatus: 'yes'
                gender: 'male'
            ),
            new guest(
                firstName: 'Ann'
                lastName: 'Draper'
                rsvpStatus: 'yes'
                gender: 'male'
            )
        ]

        initialTables = [
            new table(
                id: "Table One"
                guests: [
                    new guest(
                        firstName: 'Jim'
                        lastName: 'Draper'
                        rsvpStatus: 'yes'
                        gender: 'male'
                    ),
                    new guest(
                        firstName: 'John'
                        lastName: 'Draper'
                        rsvpStatus: 'yes'
                        gender: 'male'
                    )
                ]
            ),
            new table(
                id: "Table Two"
                guests: [
                    new guest(
                        firstName: 'Jim'
                        lastName: 'Bell'
                        rsvpStatus: 'yes'
                        gender: 'male'
                    ),
                    new guest(
                        firstName: 'Mary'
                        lastName: 'Draper'
                        rsvpStatus: 'yes'
                        gender: 'female'
                    )
                ]
            )
        ]

        @availableGuests(extraGuests)
        @tables(initialTables)

        @initializeSeatingPlan()

        return


    VM::initializeSeatingPlan = () ->
        #console.log 'init plan'
        #console.log 'fabric', fabric
        ###
        table1 = new table(
            name: 'Table 1'
        )
        console.log 'table1', table1

        @tables.push(table1)
        ###
        ###
        ###
        ko.utils.arrayForEach(@tables(), (table) =>
            console.log '@ ->', @
            @canvas.add(table.createCanvasItem())
        )

        console.log '@', @
        @availableGuests.id = "Available Guests"
        @lastAction = ko.observable()
        @lastError = ko.observable()
        @maximumGuests = 4




        return


    VM::isTableFull = (parent) ->
        return parent().length < @maximumGuests


    VM::updateLastAction = (arg) ->
        @lastAction("Moved " + arg.item.name() + " from " + arg.sourceParent.id + " (seat " + (arg.sourceIndex + 1) + ") to " + arg.targetParent.id + " (seat " + (arg.targetIndex + 1) + ")")
        return

    # Verify that if a fourth member is added, there is at least one member of each gender
    VM::verifyAssignments = (arg) ->
        console.log 'arg', arg
        parent = arg.targetParent

        if (parent.id != "Available Guests" && parent().length == 3 && parent.indexOf(arg.item) < 0)
            gender = arg.item.gender
            if (!ko.utils.arrayFirst(parent(), (guest) -> return guest.gender != gender))
                self.lastError("Cannot move " + arg.item.name() + " to " + arg.targetParent.id + " because there would be too many " + gender + " guests")
                arg.cancelDrop = true
                return

        return


    VM::addGuest = () ->
        @guests.push(
            new guest(
                firstName: 'Jim'
                lastName: 'Draper'
                rsvpStatus: 'yes'
                gender: 'male'
            )
        )

    return {
        viewModel: VM
        template: templateMarkup
    }







