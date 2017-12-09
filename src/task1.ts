
let input = process.argv[2].split( '' ).map( digit => Number( digit ) )

const step = process.argv[3] !== undefined ? input.length / 2 : 1

input = input.concat( input.slice( 0, step ) )

let sum = 0

for ( let i = 0 ; i < input.length - 1 ; i++ ) {
    const digit1 = input[i]
    const digit2 = input[i+step]

    if ( digit1 === digit2 ) {
        sum += digit1
    }
}

console.log( sum )