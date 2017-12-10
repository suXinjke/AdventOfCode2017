import * as fs from 'fs'
import { maxNumber } from './shared/shared'

const filePath = process.argv[2]

const initialState =
    fs.readFileSync( filePath ).toString()
    .split( /[ \t]/ )
    .map( numberString => Number( numberString ) )

const memStates = {}

const mem = initialState.slice()
let steps = 0

while ( !memStates[mem.toString()] ) {
    steps++

    memStates[mem.toString()] = steps

    const max = maxNumber( mem )
    const index = mem.indexOf( max )

    for ( let i = 0, pos = index ; i < max ; i++ ) {
        if ( pos === mem.length - 1 ) {
            pos = 0
        } else {
            pos++
        }

        mem[index]--
        mem[pos]++
    }
    
}

console.log( `Redistibutions: ${steps}, loop length is: ${steps - memStates[mem.toString()] + 1}` )