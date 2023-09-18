import { class_type } from "./fable_modules/fable-library.4.0.1/Reflection.js";
import { createElement } from "react";
import React from "react";
import * as react from "react";
import { React_useStateWithUpdater_1505, useFeliz_React__React_useState_Static_1505 } from "./fable_modules/Feliz.2.6.0/React.fs.js";
import { tail, head, isEmpty, map, ofArray } from "./fable_modules/fable-library.4.0.1/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.6.0/./Interop.fs.js";
import { slotSelected, initialState } from "./FifteenPuzzle.fs.js";
import { equals, createObj } from "./fable_modules/fable-library.4.0.1/Util.js";
import { empty, collect, singleton, append, delay, toList } from "./fable_modules/fable-library.4.0.1/Seq.js";
import { join } from "./fable_modules/fable-library.4.0.1/String.js";
import { RouterModule_router, RouterModule_urlSegments } from "./fable_modules/Feliz.Router.4.0.0/./Router.fs.js";

export class Components {
    "constructor"() {
    }
}

export function Components$reflection() {
    return class_type("App.Components", void 0, Components);
}

export function Components_HelloWorld() {
    return createElement("h1", {
        children: ["Hello World"],
    });
}

export function Components_Counter() {
    const patternInput = useFeliz_React__React_useState_Static_1505(0);
    const setCount = patternInput[1];
    const count = patternInput[0] | 0;
    const children = ofArray([createElement("h1", {
        children: [count],
    }), createElement("button", {
        onClick: (_arg) => {
            setCount(count + 1);
        },
        children: "Increment",
    })]);
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

export function Components_FifteenPuzzleGame() {
    let elems_1;
    const patternInput = useFeliz_React__React_useState_Static_1505(false);
    const seetGameStarted = patternInput[1];
    const gameStarted = patternInput[0];
    const patternInput_1 = React_useStateWithUpdater_1505(initialState());
    const setAppState = patternInput_1[1];
    const appState = patternInput_1[0];
    return createElement("div", createObj(ofArray([["style", {
        textAlign: "center",
    }], (elems_1 = toList(delay(() => append(singleton(createElement("h1", {
        children: ["Fifteen Puzzle"],
    })), delay(() => {
        let addPixels, addPixels_1, elems;
        return (!gameStarted) ? singleton(createElement("button", {
            children: "Start the Game",
            onClick: (_arg) => {
                seetGameStarted(true);
            },
        })) : singleton(createElement("div", createObj(ofArray([["style", createObj(ofArray([["display", "grid"], (addPixels = ((x) => (x + "px")), ["gridTemplateRows", join(" ", map(addPixels, ofArray([60, 60, 60, 60])))]), (addPixels_1 = ((x_1) => (x_1 + "px")), ["gridTemplateColumns", join(" ", map(addPixels_1, ofArray([60, 60, 60, 60])))]), ["alignContent", "center"], ["alignItems", "center"], ["justifyContent", "center"], ["justifyItems", "center"], ["rowGap", 1 + "px"], ["columnGap", 1 + "px"]]))], (elems = toList(delay(() => collect((matchValue) => {
            const tag = matchValue[1];
            const pos = matchValue[0];
            return singleton(createElement("div", {
                onClick: (_arg_1) => {
                    setAppState((prev) => slotSelected(prev, pos));
                },
                children: equals(pos, appState.FreePos) ? "" : tag,
                style: createObj(toList(delay(() => append(singleton(["width", 50]), delay(() => append(singleton(["height", 50]), delay(() => append(singleton(["backgroundColor", "#90EE90"]), delay(() => append(equals(pos, appState.FreePos) ? singleton(["backgroundColor", "#D3D3D3"]) : empty(), delay(() => append(singleton(["display", "flex"]), delay(() => append(singleton(["justifyContent", "center"]), delay(() => append(singleton(["alignItems", "center"]), delay(() => append(singleton(["cursor", "pointer"]), delay(() => singleton(["borderRadius", 4])))))))))))))))))))),
            }));
        }, appState.Slots))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))));
    })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export function Components_Router() {
    let elements;
    const patternInput = useFeliz_React__React_useState_Static_1505(RouterModule_urlSegments(window.location.hash, 1));
    const updateUrl = patternInput[1];
    const currentUrl = patternInput[0];
    return RouterModule_router(createObj(ofArray([["onUrlChanged", updateUrl], (elements = toList(delay(() => {
        let otherwise;
        return (!isEmpty(currentUrl)) ? ((head(currentUrl) === "hello") ? (isEmpty(tail(currentUrl)) ? singleton(createElement(Components_HelloWorld, null)) : ((otherwise = currentUrl, singleton(createElement("h1", {
            children: ["Not found"],
        }))))) : ((head(currentUrl) === "counter") ? (isEmpty(tail(currentUrl)) ? singleton(createElement(Components_Counter, null)) : ((otherwise = currentUrl, singleton(createElement("h1", {
            children: ["Not found"],
        }))))) : ((otherwise = currentUrl, singleton(createElement("h1", {
            children: ["Not found"],
        })))))) : singleton(createElement("h1", {
            children: ["Index"],
        }));
    })), ["application", react.createElement(react.Fragment, {}, ...elements)])])));
}

