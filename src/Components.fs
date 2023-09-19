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
        let styleSheet = FifteenPuzzle.styleSheet
        Html.div [
            prop.style [
                style.textAlign.center
            ]
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
                                styleSheet["slots-container"]
                            ]

                            prop.children [
                                for (position, tag) in appState.Slots do
                                    Html.div [
                                        prop.className [
                                            if position = appState.FreePos 
                                            then styleSheet["slot-free"] 
                                            else styleSheet["slot"] 
                                            
                                            if FifteenPuzzle.inRightPosition appState position tag
                                            then styleSheet["correct-position-slot"]
                                            ]
                                        prop.style [
                                        ]
                                        prop.text (if position = appState.FreePos then "" else tag)
                                        prop.onClick (fun _ -> 
                                        setAppState(fun prevState -> 
                                            if FifteenPuzzle.canMove prevState position
                                            then  FifteenPuzzle.slotSelected prevState position tag 
                                            else prevState))
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