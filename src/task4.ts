import * as fs from 'fs'

const filePath = process.argv[2]
const DOING_PART_1 = process.argv[3] === undefined

const answer =
    fs.readFileSync( filePath ).toString()
    .split( '\n' )
    .map( line => line.split( /[ \t]/ ) )
    .filter( words => {
        if ( DOING_PART_1 ) {
            const wordSet = new Set( words )
            return words.length === wordSet.size
        } else {
            for ( let i = 0 ; i < words.length ; i++ ) {
                for ( let j = i ; j < words.length ; j++ ) {
                    if ( j == i ) {
                        continue
                    }

                    const word1 = words[i]
                    const word2 = words[j]
                    
                    if ( word1.length !== word2.length ) {
                        continue
                    }
                    
                    const sortedWord1 = word1.split( '' ).sort().toString()
                    const sortedWord2 = word2.split( '' ).sort().toString()

                    if ( sortedWord1 === sortedWord2 ) {
                        return false
                    }
                }
            }

            return true
        }
    } )
    .length

console.log( answer )