export const maxNumber = ( numbers: number[] ) => numbers.reduce( ( max, number ) => number > max ? number : max, numbers[0] )
export const minNumber = ( numbers: number[] ) => numbers.reduce( ( min, number ) => number < min ? number : min, numbers[0] )