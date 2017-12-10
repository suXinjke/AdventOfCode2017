import * as fs from 'fs'

const filePath = process.argv[2]
const DOING_PART_2 = process.argv[3] !== undefined

let pos = 0
let steps = -1

const offsets =
    fs.readFileSync( filePath ).toString()
    .split( '\n' )
    .map( numberString => Number( numberString ) )

while ( pos >= 0 || pos < offsets.length ) {
    const previousPos = pos
    const offset = offsets[pos]
    pos += offset;
    offsets[previousPos] += ( DOING_PART_2 && offset >= 3 ) ? -1 : 1

    steps++
}

console.log( steps )