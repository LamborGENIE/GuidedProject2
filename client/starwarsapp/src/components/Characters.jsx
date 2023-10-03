import {useEffect, useState} from 'react';
import React from 'react';
import Character from './Character';

export default (props) => {
    
    return (
        <>
        {props.characters && props.characters.map(character => 
            (
                <Character character={character}/>
            ))}
        </>
    );
}