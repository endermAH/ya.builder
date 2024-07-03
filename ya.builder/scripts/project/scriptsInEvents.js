import * as timeline from "./timeline.js"

function AddEvent(time, function_name, parameters) {
	timeline.add_event(time, function_name, parameters)
}

function RunAllEvents(runtime) {
	timeline.run_all_events(runtime)
}

function CheckEvents(current_time, runtime) {
	timeline.check_events(current_time, runtime)
}

function ClearEvents() {
	timeline.clear_events()
}


const scriptsInEvents = {

	async Es_maingame_Event14_Act7(runtime, localVars)
	{
		ClearEvents()
	},

	async Es_time_Event1_Act1(runtime, localVars)
	{
var seasons = [
	"весны",
	"лета",
	"осени",
	"зимы"
] 

var current_time = Math.floor(localVars.current_time / 24);
var current_year_time = current_time % 364;
var days_per_season = 364 / 4;
var current_season_number = Math.floor(current_year_time / days_per_season);

var current_year_number = Math.floor(current_time / 364) + runtime.globalVars.InitialYear;
var current_season = seasons[current_season_number];
var current_season_day = current_year_time % days_per_season;

var date_string = `${current_season_day + 1} день \n${current_year_number}`

runtime.objects.S_UI_Season.getFirstInstance().animationFrame = current_season_number
runtime.setReturnValue(date_string.toString())

	},

	async Es_time_Event3_Act4(runtime, localVars)
	{
		CheckEvents(runtime.globalVars.CurrentTime, runtime)
	},

	async Es_time_Event8_Act1(runtime, localVars)
	{
		AddEvent(parseInt(localVars.event_time), localVars.function_name, localVars.params)
	},

	async Es_time_Event9_Act1(runtime, localVars)
	{
var current_time_ = runtime.globalVars.CurrentTime;
var current_time_f = runtime.callFunction("time_to_date", runtime.globalVars.CurrentTime);
var log_string = `[${current_time_f} (${current_time_})] ${localVars.text}\n`;
console.log(log_string);
//runtime.getInstanceByUid(17).text += log_string;
	},

	async Es_economics_Event10_Act1(runtime, localVars)
	{
		let strNumber = Math.floor(localVars.money_).toString();  
		let chars = strNumber.split('');
		let formattedNumber = '';
		let count = 0;
		
		for (let i = chars.length - 1; i >= 0; i--) {
			formattedNumber = chars[i] + formattedNumber;
			count++;
			if (count % 3 === 0 && i !== 0) {
				formattedNumber = '.' + formattedNumber;
			}
		}
		
		localVars.return = formattedNumber;
	},

	async Es_debug_Event3_Act1(runtime, localVars)
	{
		CheckEvents(runtime.globalVars.CurrentTime, runtime)
	},

	async Es_ingameui_Event30_Act3(runtime, localVars)
	{
var buildings = runtime.objects.J_Buildings.getFirstInstance().getJsonDataCopy();

var tile_size = 128
var offset = 50
var max_in_width = Math.floor((localVars.width-offset) / (tile_size+offset))
var base_offset_x = (localVars.width - max_in_width*tile_size - (max_in_width-1) * offset)/2 + tile_size/2
var base_offset_y = 16

console.log("Tiles in with: " + max_in_width)
console.log(`${localVars.width} ${max_in_width*tile_size} ${(max_in_width-1) * offset} ${base_offset_x}`)

var cur_x = 0
var cur_y = 0

Object.entries(buildings).forEach((entry) => {
  const [key, value] = entry;
  if (value["category"] == localVars.сategory) {
  	var text_offset = 80 + 16  	
	var create_x = localVars.init_x + cur_x * (tile_size + offset) + base_offset_x
	var create_y = localVars.init_y + cur_y * (tile_size + text_offset) + tile_size / 2 + base_offset_y
  	runtime.callFunction("add_building_tile", key, create_x, create_y)
	console.log(`Create x: ${create_x}, create y ${create_y}`)
	cur_x = cur_x + 1
	if (cur_x >= max_in_width) {
		cur_x = 0;
		cur_y = cur_y + 1;
	}
  }
});

var selector = runtime.objects.NP_Shop_Selector.getFirstInstance()
var first_tile = runtime.objects.S_Shop_Building.getFirstInstance()
var target_x = first_tile.getPosition()[0] - first_tile.getSize()[0] / 2
var target_y = first_tile.getPosition()[1] - first_tile.getSize()[1] / 2
selector.setPosition(target_x, target_y)
	},

	async Es_ingameui_Event109_Act2(runtime, localVars)
	{
		runtime.callFunction(localVars.function_to_call)
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

