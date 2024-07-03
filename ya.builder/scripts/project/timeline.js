class Event {
	constructor(time, function_name, parameters) {
		this.time = time;
		this.function_name = function_name;
		this.parameters = parameters;
	}
  
  	run_event(runtime) {
		console.log(`Trigered event ${this.time}:${this.function_name} with parameters ${this.parameters}`);
		runtime.callFunction(this.function_name, this.parameters);
	}
}


export var events = []

export function load_events(new_events) {
	events = [];
	new_events.forEach((event) => {events.push(new Event(event.time, event.function_name, event.parameters))});
}

export function add_event(time, function_name, parameters) {
	console.log(`Added event ${time}:${function_name} with parameters ${parameters}`);
	var event = new Event(time, function_name, parameters);
	events.push(event);
	console.log(event);
	console.log(events);
}

export function run_all_events(runtime) {
	console.log(events);
	events.forEach((element) => {console.log(element); element.run_event(runtime)});
}

export function clear_events() {
	events = [];
}

export function check_events(current_time, runtime) {
	var new_events = [];
	console.log(`(${current_time}) Checking events...`)
	console.log(events)
	events.forEach((event) => {
		if(current_time >= event.time){
			runtime.callFunction("log", `Running event "${event.function_name}" with params "${event.parameters}"`);
			runtime.callFunction(event.function_name, event.parameters);
		} 
	})
	events.forEach((event) => {
		if(current_time < event.time) {
			console.log("Not ready events:")
			console.log(event)
			new_events.push(event);
		}
	})
	events = new_events;
}