var cells = []

var arena_width  = 64;
var arena_height = 64;


function loadArena(){
  var arena_contents = "";

  for (let y = 0; y < arena_height; y++) {
    for (let x = 0; x < arena_width; x++) {
        var div_id = ("00000000" + Math.round((Math.random() * 10000000)).toString(36)).toUpperCase().substr(-5);
        
        var allowed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0xA, 0xB, 0xC, 0xD, 0xE]
        
        // outer bounds walls
        if (x == 0)                allowed = [2, 3, 5, 6, 9, 0xA, 0xB]
        if (y == 0)                allowed = [1, 3, 4, 6, 7, 0xA, 0xC]
        if (x + 1 == arena_width)  allowed = [2, 3, 4, 5, 7, 8, 0xD]
        if (y + 1 == arena_height) allowed = [1, 4, 5, 6, 8, 9, 0xE]
        
        // corners
        if (x == 0 && y == 0)                               allowed = [3, 6, 0xA]   // top left corner
        if (x == 0 && y + 1 == arena_height)                allowed = [5, 6, 9]     // bottom left corner
        if (y == 0 && x + 1 == arena_width)                 allowed = [3, 4, 7]     // top right corner
        if (y + 1 == arena_height && x + 1 == arena_width)  allowed = [4, 5, 8]     // bottom right corner

        var wall_type = pickOne(allowed)
        var wall_css  = `cellType${wall_type.toString(16).toUpperCase()}`
        cells.push(
          {
            x,
            y,
            div_id,
            wall_type
          }
        );
        arena_contents += `<span id="${div_id}" date-coords="${x}, ${y}" class="cellCommon ${wall_css}">&nbsp;</span>`;
      }
      arena_contents += `<br />`;
  }
  
  self.arena.innerHTML = arena_contents;
  self.arena.style.width = arena_width * 16;
}

function pickOne(array){
  if (Array.isArray(array)){
    var l = array.length;
    var i = Math.floor(Math.random() * l)
    return array[i];
  }
  else return null;
}


loadArena();