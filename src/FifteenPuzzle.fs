module FifteenPuzzle
open System

type Position = {X: int; Y: int}
type Slot = Position * string

type AppState  = {Slots: Slot list; FreePos: Position}

let random = Random()
let InitialState() : AppState =
    let randomTags =   List.sortBy(fun _ -> random.Next()) [1..16]
    [
        for x in 0..3 do
        for y in 0..3 do
        yield {X=x; Y=y}
    ]
    |> List.mapi (fun index pos -> pos, string(List.item index randomTags))
    |> fun slots ->
        let pos,_ = Seq.find (fun (p, tag) -> tag = "16") slots
        {Slots = slots; FreePos = pos}

let slotSelected (state: AppState) (selectedPosition: Position) (selectedTag: string) =
    if (state.FreePos.X - selectedPosition.X |> Math.Abs) > 1 ||
        (state.FreePos.Y - selectedPosition.Y |> Math.Abs) > 1 
        then
            state 
        else
            let newSlots =
                state.Slots
                |> List.map (fun (pos, tag) -> 
                    if pos = selectedPosition then (pos, "16") else (pos, tag))
                |> List.map (fun (pos, tag) -> 
                    if tag = "16" && pos <> selectedPosition then (pos, selectedTag) else (pos, tag))

            { state with Slots = newSlots; FreePos = selectedPosition}

let styleSheet = Stylesheet.load "./fifteen-puzzle.module.css"