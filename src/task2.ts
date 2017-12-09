import { maxNumber, minNumber } from './shared/shared'
import * as fs from 'fs'

const filePath = process.argv[2]
const DOING_PART_1 = process.argv[3] === undefined

const part1 = ( numbers: number[] ) => {
    const max = maxNumber( numbers )
    const min = minNumber( numbers )

    return max - min
}

// assuming there's only one solution?
const part2 = ( numbers: number[] ) => {
    console.log( numbers )
    for ( let i = 0 ; i < numbers.length; i++ ) {
        for ( let j = 0 ; j < numbers.length; j++ ) {
            if ( i === j ) {
                continue;
            }

            const division = numbers[i] / numbers[j]
            const isEven = division.toString() === Math.floor( division ).toString() // dumb

            if ( isEven ) {
                return division
            }
        }
    }

    return 0
}

const answer =
    fs.readFileSync( filePath ).toString()
    .split( '\n' )
    .map( line => line.split( /[ \t]/ ).map( number => Number( number ) ) )
    .map( DOING_PART_1 ? part1 : part2 )
    .reduce( ( sum, number ) => sum = sum + number, 0 )

console.log( answer )