import { useEffect, useState } from 'react';
import React from 'react';
import Character from './Character';

export default (props) => {

    return (
        <section id="charactersList">
            {props.characters && props.characters.map(character => (
                <Character character={character} />
            ))}
        </section>
    );
}