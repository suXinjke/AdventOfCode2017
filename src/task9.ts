import * as fs from 'fs'

const filePath = process.argv[2]

let input = fs.readFileSync( filePath ).toString()

let level = 0
let score = 0
let eatingGarbage = false
let garbageChars = 0;

for ( let i = 0 ; i < input.length ; i++ ) {
    const char = input[i]

    if ( char === '!' ) {
        i++;
        continue;
    }

    if ( eatingGarbage ) {
        if ( char === '>' ) {
            eatingGarbage = false
        } else {
            garbageChars++
        }
    } else {
        if ( char === '<' ) {
            eatingGarbage = true
        }
        if ( char === '{' ) {
            level++
        }
        if ( char === '}' ) {
            score += level
            level--
        }
    }
}

console.log( { score, garbageChars } )