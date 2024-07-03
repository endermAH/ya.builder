
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";

// import {events, load_events} from "./timeline.js"
import * as timeline from "./timeline.js"


runOnStartup(async runtime =>
{
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
	runtime.addEventListener("save", OnSave);
	runtime.addEventListener("load", OnLoad);
});

async function OnBeforeProjectStart(runtime)
{
	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime)
{
	// Code to run every tick
// 	console.log(timeline.events)
}

function OnSave(e)
{
	e.saveData = {
		"s_events": timeline.events
	};
}

function OnLoad(e)
{
	var new_events = e.saveData.s_events;
	timeline.load_events(new_events);
	console.log(`Loadded additionally ${timeline.events}`);
	console.log(timeline.events)
}

