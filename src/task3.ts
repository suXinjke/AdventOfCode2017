const input = Number( process.argv[2] );

let level = 0;
let multiplier = 1;
let maxLevelNumber = 1;

while ( maxLevelNumber < input ) {
    multiplier += 2
    maxLevelNumber = multiplier * multiplier
    level++
}

let mark = ( multiplier - 2 ) * ( multiplier - 2 ) + 1 + ( level - 1 )

let x = level;
let y = 0;

// move up
for ( let j = 0 ; j < level && mark !== input ; j++ ) {
    y++;
    mark++;
}

// move left
for ( let j = 0 ; j < multiplier - 1 && mark !== input ; j++ ) {
    x--;
    mark++;
}

// move down
for ( let j = 0 ; j < multiplier - 1 && mark !== input ; j++ ) {
    y--;
    mark++;
}

// move right
for ( let j = 0 ; j < multiplier - 1 && mark !== input ; j++ ) {
    x++;
    mark++;
}

console.log( Math.abs( -x ) + Math.abs( -y ) )