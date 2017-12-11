import { arrayReverseAt } from './shared/shared'

let hash = ( new Array( 256 ) ).fill( undefined ).map( ( empty, index ) => index )
let pos = 0
let skip = 0

const DOING_PART_1 = process.argv[3] === undefined

const input = DOING_PART_1 ?
    process.argv[2].split( ',' ).map( numberString => Number( numberString ) )
    :
    ( process.argv[2] || '' ).split( '' ).map( char => char.charCodeAt( 0 ) ).concat( [ 17, 31, 73, 47, 23 ] )

const ROUNDS = DOING_PART_1 ? 1 : 64

for ( let i = 0 ; i < ROUNDS ; i++ ) { 
    input.forEach( ( length, index ) => {

        if ( length > 0 ) {
            
            let to = pos + length - 1
            while ( to >= hash.length ) {
                to %= hash.length
            }
        
            hash = arrayReverseAt( hash, pos, to )
        }

        pos += length + skip
        
        while ( pos >= hash.length ) {
            pos %= hash.length
        }

        skip++
    } )
}

if ( DOING_PART_1 ) {
    console.log( 'answer', hash[0] * hash[1] )
} else {

    let denseHash = ''
    for ( let i = 0 ; i < hash.length ; i += 16 ) {
        const block = 
        denseHash += hash
            .slice( i, i + 16 )
            .reduce( ( prev, number, index, array ) => index === 0 ? array[0] : prev ^= number )
            .toString( 16 )
            .padStart( 2, '0' )
    }

    console.log( denseHash )
}