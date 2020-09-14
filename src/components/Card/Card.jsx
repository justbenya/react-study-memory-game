import React from 'react';
import './Card.css';

export default function Card(props) {
    const { onCardOpen, isFlipped, index } = props;
    const { id, name } = props.pokemon;

    return (
        <div
            onClick={ () => onCardOpen(index) }
            className={ `card ${ isFlipped ? 'card--flipped' : '' }` }
        >
            <div className="card__side card__side--front">?</div>
            <div className="card__side card__side--back">
                <img
                    src={ `https://pokeres.bastionbot.org/images/pokemon/${ id }.png` }
                    alt={ name }
                    width="100"
                />
            </div>
        </div>
    );
}
