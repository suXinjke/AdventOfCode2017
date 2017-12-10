import * as fs from 'fs'
import { maxNumber } from './shared/shared'

const filePath = process.argv[2]

interface Tower {
    name: string,
    weight: number,
    children: string[],
    parent: string,
    childrenWeight: number
}

type RegisterOperation = 'inc' | 'dec'
type ComparisonOperator = '>' | '<' | '>=' | '<=' | '!=' | '=='

interface Condition {
    register: string,
    operation: ComparisonOperator,
    amount: number
}

function conditionIsTrue( condition: Condition ) {
    const { register, amount } = condition
    const value = registers[register]

    return (
        condition.operation === '>' ? value > amount :
        condition.operation === '<' ? value < amount :
        condition.operation === '>=' ? value >= amount :
        condition.operation === '<=' ? value <= amount :
        condition.operation === '!=' ? value !== amount :
        condition.operation === '==' ? value === amount :
        false
    )
}

interface Operation {
    register_name: string,
    register_operation: RegisterOperation,
    amount: number,
    condition: Condition
}

const registers: { [index: string]: number } = {}
let registerMax = 0

const operations =
    fs.readFileSync( filePath ).toString()
    .split( '\n' )
    .map<Operation>( operation => {
        const words = operation.split( ' ' )

        const register_name = words[0]
        const condition_register = words[4]

        if ( !registers[register_name] ) {
            registers[register_name] = 0
        }
    
        if ( !registers[condition_register] ) {
            registers[condition_register] = 0
        }

        return {
            register_name,
            register_operation: words[1] as RegisterOperation,
            amount: Number( words[2] ),
            condition: {
                register: condition_register,
                operation: words[5] as ComparisonOperator,
                amount: Number( words[6] )
            }
        }
    } )

operations.forEach( operation => {

    const { register_name, register_operation, amount, condition } = operation

    if ( !conditionIsTrue( operation.condition ) ) {
        return
    }

    registers[register_name] += register_operation === 'inc' ? amount : -amount

    if ( registers[register_name] > registerMax ) {
        registerMax = registers[register_name]
    }
} )

console.log( {
    current_max_number: maxNumber( Object.values( registers ) ),
    highest_register_value_ever: registerMax
} )