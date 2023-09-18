import { Record } from "./fable_modules/fable-library.4.0.1/Types.js";
import { list_type, tuple_type, string_type, record_type, int32_type } from "./fable_modules/fable-library.4.0.1/Reflection.js";
import { nonSeeded } from "./fable_modules/fable-library.4.0.1/Random.js";
import { item, mapIndexed, sortBy } from "./fable_modules/fable-library.4.0.1/List.js";
import { find, map, collect, delay, toList } from "./fable_modules/fable-library.4.0.1/Seq.js";
import { rangeDouble } from "./fable_modules/fable-library.4.0.1/Range.js";
import { int32ToString, comparePrimitives } from "./fable_modules/fable-library.4.0.1/Util.js";

export class Position extends Record {
    "constructor"(X, Y) {
        super();
        this.X = (X | 0);
        this.Y = (Y | 0);
    }
}

export function Position$reflection() {
    return record_type("FifteenPuzzle.Position", [], Position, () => [["X", int32_type], ["Y", int32_type]]);
}

export class AppState extends Record {
    "constructor"(Slots, FreePos) {
        super();
        this.Slots = Slots;
        this.FreePos = FreePos;
    }
}

export function AppState$reflection() {
    return record_type("FifteenPuzzle.AppState", [], AppState, () => [["Slots", list_type(tuple_type(Position$reflection(), string_type))], ["FreePos", Position$reflection()]]);
}

export const random = nonSeeded();

export function initialState() {
    const randomTags = sortBy((_arg) => random.Next0(), toList(rangeDouble(1, 1, 16)), {
        Compare: comparePrimitives,
    });
    const slots = mapIndexed((i, pos) => [pos, int32ToString(item(i, randomTags))], toList(delay(() => collect((x_1) => map((y_1) => (new Position(x_1, y_1)), rangeDouble(0, 1, 3)), rangeDouble(0, 1, 3)))));
    const pos_1 = find((tupledArg) => {
        const p = tupledArg[0];
        const tag = tupledArg[1];
        return tag === "16";
    }, slots)[0];
    return new AppState(slots, pos_1);
}

export function slotSelected(state, position) {
    return new AppState(state.Slots, position);
}

