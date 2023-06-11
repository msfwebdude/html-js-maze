var cells = []

var arenaWidth  = 64;
var arenaHeight = 64;

var debugMode = /debug=true/gi.test(location.search)

self.debugModeSwitch.checked = debugMode


function loadArena(){
  var arena_contents = "";

  for (let y = 0; y < arenaHeight; y++) {
    for (let x = 0; x < arenaWidth; x++) {
        var divId = ("00000000" + Math.round((Math.random() * 10000000)).toString(36)).toUpperCase().substr(-5);
        
        var allowed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0xA, 0xB, 0xC, 0xD, 0xE]
        
        // outer bounds walls
        if (x == 0)                allowed = [2, 3, 5, 6, 9, 0xA, 0xB]
        if (y == 0)                allowed = [1, 3, 4, 6, 7, 0xA, 0xC]
        if (x + 1 == arenaWidth)   allowed = [2, 3, 4, 5, 7, 8, 0xD]
        if (y + 1 == arenaHeight)  allowed = [1, 4, 5, 6, 8, 9, 0xE]
        
        // corners
        if (x == 0 && y == 0)                             allowed = [3, 6, 0xA]   // top left corner
        if (x == 0 && y + 1 == arenaHeight)               allowed = [5, 6, 9]     // bottom left corner
        if (y == 0 && x + 1 == arenaWidth)                allowed = [3, 4, 7]     // top right corner
        if (y + 1 == arenaHeight && x + 1 == arenaWidth)  allowed = [4, 5, 8]     // bottom right corner

        //if (y == 0) console.log(allowed)

        var leftCellType = null
        if (x > 0) leftCellType = getCellAtLocation(x-1, y).wallType

        var wallType = pickOne(allowed)

        var isLeftCompatible = isCellCompatible(leftCellType, wallType, 3)
        if (y == 0) console.log(leftCellType, wallType)
        while(!isLeftCompatible){
          wallType = pickOne(allowed)
          isLeftCompatible = isCellCompatible(leftCellType, wallType, 3)
        }

        var wallCSS  = `cellType${wallType.toString(16).toUpperCase()}`
        cells.push(
          {
            x,
            y,
            divId,
            wallType
          }
        );
        var cellContent = `&nbsp;`
        if(debugMode) cellContent = `${wallType}`
        arena_contents += `<span id="${divId}" date-coords="${x}, ${y}" class="cellCommon ${wallCSS}">${cellContent}</span>`;
      }
      arena_contents += `<br />`;
  }
  
  self.arena.innerHTML = arena_contents;
  self.arena.style.width = arenaWidth * 16;
}

function pickOne(array){
  if (Array.isArray(array)){
    var l = array.length;
    var i = Math.floor(Math.random() * l)
    return array[i];
  }
  else return null;
}

function getCellAtLocation(x, y){
  return cells.find(n => (n.x == x && n.y == y))
}

function isCellCompatible(refType, testType, directionNESW) {

  //var compatTypes = []
  var compatTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

  switch (directionNESW) {
    case 0: // North
      
      break;
    
    case 1: // East
      
      break;

    case 2: // South
      
      break;

    case 3: // West
      if (refType == 0) compatTypes  = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      if (refType == 1) compatTypes  = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      if (refType == 2) compatTypes  = [0, 1, 7, 8, 12, 13, 14]
      if (refType == 3) compatTypes  = [0, 1, 7, 8, 12, 13, 14]
      if (refType == 4) compatTypes  = [0, 1, 4, 7, 8, 12, 13, 14]
      if (refType == 5) compatTypes  = [0, 1, 7, 8, 12, 13, 14]
      if (refType == 6) compatTypes  = [0, 1, 7, 8, 12, 13, 14]
      if (refType == 7) compatTypes  = [0, 1, 7, 8, 12, 13, 14]
      if (refType == 8) compatTypes  = [0, 1, 7, 8, 12, 13, 14]
      if (refType == 9) compatTypes  = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      if (refType == 10) compatTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      if (refType == 11) compatTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      if (refType == 12) compatTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      if (refType == 13) compatTypes = [0, 1, 7, 8, 12, 13, 14]
      if (refType == 14) compatTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      break;
  
  }

  return (compatTypes.indexOf(testType) > -1)
}

function debugModeChange(radio) {
  location.search = `?debug=${(radio.checked ? 'true' : 'false')}`
}


loadArena();