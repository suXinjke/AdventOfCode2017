export const maxNumber = ( numbers: number[] ) => numbers.reduce( ( max, number ) => number > max ? number : max, numbers[0] )
export const minNumber = ( numbers: number[] ) => numbers.reduce( ( min, number ) => number < min ? number : min, numbers[0] )
export const arrayShift = ( array: any[], offset: number ) => {

    while ( offset > array.length ) {
        offset %= array.length
    }

    if ( offset === 0 || Math.abs( offset ) === array.length ) {
        return array
    }

    if ( offset > 0 ) {
        return [ ...array.slice( array.length - offset ), ...array.slice( 0, array.length - offset ) ]
    } else if ( offset < 0 ) {
        offset = Math.abs( offset )
        return [ ...array.slice( offset ), ...array.slice( 0, offset ) ]
    }
}

export const arrayReverseAt = ( array: any[], from: number, to: number ) => {
    
    if ( from > to ) {
        let offset = from
        array = arrayShift( array, -offset )

        const newFrom = 0
        const newTo = array.length - from + to
        
        array = [ ...array.slice( 0, newFrom ), ...array.slice( newFrom, newTo + 1 ).reverse(), ...array.slice( newTo + 1 ) ]

        return arrayShift( array, offset )
    } else if ( from < to ) {
        return [ ...array.slice( 0, from ), ...array.slice( from, to + 1 ).reverse(), ...array.slice( to + 1 ) ]
    } else {
        return array
    }
}