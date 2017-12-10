export {}
const input = Number( process.argv[2] );
const DOING_PART_1 = process.argv[3] === undefined

enum Direction {
    Right,
    Up,
    Left,
    Down
}

class Field {
    points: {
        [index: string]: number
    } = {}

    x: number = 0
    y: number = 0

    steps: number = 1

    move( direction: Direction ): number {
        this.x += 
            direction === Direction.Right ? 1 :
            direction === Direction.Left ? -1 :
            0

        this.y += 
            direction === Direction.Up ? 1 :
            direction === Direction.Down ? -1 :
            0

        this.steps++
        return this.steps
    }

    makeCoords( x: number, y: number ) {
        return `${x},${y}`
    }

    getPoint( x: number, y: number ) {
        return this.points[ this.makeCoords( x, y ) ] || 0
    }

    setPoint( value: number ) {
        this.points[ this.makeCoords( this.x, this.y ) ] = value
    }

    getMaxNumberForLevel( level: number ) {
        return Math.pow( 1 + ( 2 * level ), 2 )
    }

    getSumOfAdjastentSquares(): number {
        const { x, y } = this
        return (
            this.getPoint( x - 1, y + 1 ) + this.getPoint( x, y + 1 ) + this.getPoint( x + 1, y + 1 ) +
            this.getPoint( x - 1, y     ) + this.getPoint( x, y     ) + this.getPoint( x + 1, y     ) +
            this.getPoint( x - 1, y - 1 ) + this.getPoint( x, y - 1 ) + this.getPoint( x + 1, y - 1 )
        )
    }
}


function main() {
    const field = new Field()
    field.setPoint( 1 )
    
    let level = 0
    let maxLevelNumber = field.getMaxNumberForLevel( level )

    // Walk around field drawing a spiral and write the required number each step
    while ( maxLevelNumber < input ) {
        
        level++
        maxLevelNumber = field.getMaxNumberForLevel( level )

        const movementSeries: { didntHitTheWall: () => boolean, direction: Direction }[] = [
            { direction: Direction.Right,   didntHitTheWall: () => field.x < level },
            { direction: Direction.Up,      didntHitTheWall: () => field.y < level },
            { direction: Direction.Left,    didntHitTheWall: () => field.x > -level },
            { direction: Direction.Down,    didntHitTheWall: () => field.y > -level },
            { direction: Direction.Right,   didntHitTheWall: () => field.x < level }
        ]

        for ( let i = 0 ; i < movementSeries.length ; i++ ) {
            const movement = movementSeries[i]
            while ( movement.didntHitTheWall() ) {
                
                const steps = field.move( movement.direction )

                if ( DOING_PART_1 ) {
                    field.setPoint( steps )

                    if ( steps === input ) {
                        const manhattanDistance = Math.abs( -field.x ) + Math.abs( -field.y )
                        console.log( `Manhattan Distance for step ${steps} at ${field.x} ${field.y} is ${manhattanDistance}` )
                        return
                    }
                } else {
                    const sum = field.getSumOfAdjastentSquares()

                    field.setPoint( sum )
                    const result = field.getPoint( field.x, field.y )
                    if ( result > input ) {
                        console.log( `Answer is ${result} on step ${steps} at ${field.x} ${field.y}` )
                        return
                    }
                }
            }
        }
    }
}

main()