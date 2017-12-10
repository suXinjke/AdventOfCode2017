// would be better to keep tower names in dictionary instead of array

import * as fs from 'fs'

interface Tower {
    name: string,
    weight: number,
    children: string[],
    parent: string,
    childrenWeight: number
}

const filePath = process.argv[2]

const towers =
    fs.readFileSync( filePath ).toString()
    .split( '\n' )
    .map<Tower>( tower => {
        const elems = tower.match( /(\w+)/g )
        
        return {
            name: elems[0],
            weight: Number( elems[1].toString() ),
            children: elems.slice( 2, elems.length ),
            parent: '',
            childrenWeight: 0
        }
    } )
    .map( ( tower, index, towers ) => {
        const potentialParent = towers.find( potentialParent => potentialParent.children.includes( tower.name ) )

        const getChildrenWeight = ( tower: Tower ) => {

            return tower.children.reduce( ( sum, child ) => {
                const childTower = towers.find( tower => tower.name === child )
                const childrenWeight = childTower ? getChildrenWeight( childTower ) : 0
                return sum = sum + childrenWeight
            }, tower.weight )
        }

        return {
            ...tower,
            parent: potentialParent ? potentialParent.name : '',
            childrenWeight: getChildrenWeight( tower )
        }
    } )

const rootTower = towers.find( tower => !tower.parent )

function lookForOddWeight( tower: Tower, level = 1 ) {

    if ( tower.children.length === 0 ) {
        return null
    }

    let weightOccurences = {}
    tower.children.forEach( childName => {
        const child = towers.find( tower => tower.name == childName )
        const weightOccurence = weightOccurences[child.childrenWeight] || 0
        weightOccurences[child.childrenWeight] = weightOccurence + 1
    } )

    if ( Object.keys( weightOccurences ).length === 1 ) {
        return null
    }

    const oddWeight = Object.keys( weightOccurences ).find( key => weightOccurences[key] === 1 )
    const oddChildName = tower.children.find( childName => {
        const child = towers.find( tower => tower.name == childName )
        return child.childrenWeight.toString() === oddWeight
    } )
    const oddChild = towers.find( tower => tower.name === oddChildName )

    const oddChildHasOddWeights = lookForOddWeight( oddChild, level + 1 )
    if ( !oddChildHasOddWeights ) {
        console.log( { level, name: tower.name, weightOccurences, oddChild } )
    }
}

console.log( { root: rootTower } )
lookForOddWeight( rootTower )