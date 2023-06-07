var spaces = []

var arena_width  = 64;
var arena_height = 64;


function loadArena(){
    var arena_contents = "";

    for (let x = 0; x < arena_width; x++) {
        spaces[x] = [];
        for (let y = 0; y < arena_height; y++) {
            var div_id = ("00000000" + Math.round((Math.random() * 10000000)).toString(36)).toUpperCase().substr(-5);
            var wall_type = Math.floor((Math.random() * 0xF));
            var wall_css  = `cellType${wall_type.toString(16).toUpperCase()}`
            spaces[x][y]  = {
                div_id,
                wall_type
            };
            arena_contents += `<span id="${div_id}" class="cellCommon ${wall_css}">&nbsp;</span>`;
        }
        arena_contents += `<br />`;
    }
    
    self.arena.innerHTML = arena_contents;
    self.arena.style.width = arena_width * 16;
}


loadArena();