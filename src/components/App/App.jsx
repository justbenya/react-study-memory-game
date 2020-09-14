import React, { useEffect, useState } from 'react';
import './App.css';
import Timer from '../Timer';
import Card from '../Card';
import { shuffle } from '../../utils';

const pokemons = [
    { id: 4, name: 'charizard' },
    { id: 10, name: 'caterpie' },
    { id: 77, name: 'ponyta' },
    { id: 25, name: 'pikachu' },
    { id: 132, name: 'ditto' },
    { id: 133, name: 'eevee' }
];
const getData = () => shuffle([...pokemons, ...pokemons]);

// Правила:
// v+ Можно выбрать из двух ячеек, больше ячеек за ход нельзя открыть
// v+ Правильно угаданные ячейки сохраняются их нельзя закрыть
// v+ Открытие двух ячеек считается за один ход
// v+ Есть таймер за сколько быстрее игрок откроет все поле

const App = () => {
    const [data, setData] = useState(getData());
    const [opened, setOpened] = useState([]);
    const [paired, setPaired] = useState([]);
    const [moves, setMoves] = useState(0);
    const [start, setStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);

    const TIMER_DELAY = 800;

    useEffect(() => {
        let timeoutID = null;

        if (paired.length) {
            setOpened((opened) => {
                const [lastElement] = paired.slice(-1);
                if (opened.includes(lastElement)) return opened;
                return [...opened, lastElement];
            });
        }

        if (paired.length && paired.length % 2 === 0) {
            const [firstPokemon, secondPokemon] = paired;

            if (data[firstPokemon].id === data[secondPokemon].id) {
                setPaired([]);
                setMoves(moves => moves + 1);
            }

            timeoutID = setTimeout(() => {
                setPaired([]);
                setOpened((opened) => {
                    return opened.filter(indexItem => indexItem !== firstPokemon && indexItem !== secondPokemon);
                });
                setMoves(moves => moves + 1);
            }, TIMER_DELAY);
        }

        return () => clearTimeout(timeoutID);
    }, [paired, data]);

    useEffect(() => {
        const isGameOver = opened.length === data.length;
        if (isGameOver) {
            setStart(false);
            setGameOver(true);
            setResetTimer(false);
        }
    }, [opened, data]);

    const handleCardOpen = (index) => {
        if (!gameOver) {
            setStart(true);
        }

        setPaired((paired) => {
            if (paired.length >= 2) {
                return paired;
            }

            if (opened.includes(index) ||
                paired.includes(index)) {
                return paired;
            }

            return [...paired, index];
        });
    };

    const handleStartGame = () => {
        setOpened([]);
        setPaired([]);
        setMoves(0);
        setStart(false);
        setGameOver(false);
        setResetTimer(true);
        setData(getData());
    };

    const gameEndBlock = (
        <button className="game-end" onClick={ handleStartGame }>
            <p>You won!</p>
            <p>Play again?</p>
        </button>
    );

    return (
        <div className="container">
            <div className="container__top">
                <p>Moves: <span>{ moves }</span></p>
                {
                    gameOver ? gameEndBlock : null
                }
                <p>Timer: <Timer start={ start } reset={ resetTimer } /></p>
            </div>
            <div className="cards">
                { data.map((pokemon, index) => {
                    let isFlipped = false;
                    if (opened.includes(index)) isFlipped = true;

                    return (
                        <Card
                            onCardOpen={ handleCardOpen }
                            pokemon={ pokemon }
                            isFlipped={ isFlipped }
                            key={ index }
                            index={ index }
                        />);
                }) }
            </div>
        </div>
    );
};

export default App;
