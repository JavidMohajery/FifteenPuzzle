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

let slotSelected (state: AppState) (position: Position) (tag: string) =
    { state with 
        FreePos = position
        Slots = if position = state.FreePos 
                then state.Slots
                else 
                    state.Slots
                    |> List.map (fun (slotPosition, slotTag) -> 
                            if slotPosition = state.FreePos 
                            then slotPosition, tag
                            else slotPosition, slotTag)
            }

let styleSheet = Stylesheet.load "./fifteen-puzzle.module.css"