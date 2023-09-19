namespace App

open Feliz
open Feliz.Router

type Components =
    /// <summary>
    /// The simplest possible React component.
    /// Shows a header with the text Hello World
    /// </summary>
    [<ReactComponent>]
    static member HelloWorld() = Html.h1 "Hello World"

    /// <summary>
    /// A stateful React component that maintains a counter
    /// </summary>
    [<ReactComponent>]
    static member Counter() =
        let (count, setCount) = React.useState(0)
        Html.div [
            Html.h1 count
            Html.button [
                prop.onClick (fun _ -> setCount(count + 1))
                prop.text "Increment"
            ]
        ]
    [<ReactComponent>]
    static member FifteenPuzzles() =
        let (gameStarted, setGameStarted) = React.useState(false)
        let (appState, setAppState) = React.useStateWithUpdater(FifteenPuzzle.InitialState())
        Html.div [
            prop.children [
                Html.h1 "Fifteen puzzle"
                if not gameStarted then
                    Html.button [
                        prop.text "Start the game"
                        prop.onClick (fun _ -> setGameStarted(true))
                    ]
                    else
                        Html.div [
                            prop.className[
                                FifteenPuzzle.styleSheet["slots-container"]
                            ]

                            prop.children [
                                for (position, tag) in appState.Slots do
                                    Html.div [
                                        prop.style [
                                            style.width 50
                                            style.height 50
                                            style.backgroundColor.lightGreen
                                            if position = appState.FreePos then style.backgroundColor.lightGray
                                            style.borderRadius 5
                                            style.display.flex
                                            style.justifyContent.center
                                            style.alignItems.center
                                            style.cursor.pointer
                                        ]
                                        prop.text (if position = appState.FreePos then "" else tag)
                                        prop.onClick (fun _ -> setAppState(fun prevState -> FifteenPuzzle.slotSelected prevState position tag))
                                    ]
                            ]
                        ]
            ]
        ]

    /// <summary>
    /// A React component that uses Feliz.Router
    /// to determine what to show based on the current URL
    /// </summary>
    [<ReactComponent>]
    static member Router() =
        let (currentUrl, updateUrl) = React.useState(Router.currentUrl())
        React.router [
            router.onUrlChanged updateUrl
            router.children [
                match currentUrl with
                | [ ] -> Html.h1 "Index"
                | [ "hello" ] -> Components.HelloWorld()
                | [ "counter" ] -> Components.Counter()
                | otherwise -> Html.h1 "Not found"
            ]
        ]