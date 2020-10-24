import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTotalScore } from '../store/users/userActions';

function DiceContainer(props) {
    const [number, setNumber] = useState(1);
    const [gameNumber, setGameNumber] = useState(0);
    const [disable, setDisabled] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [thankYou, setThankYou] = useState(false);
    const [timer, setTimer] = useState(0);

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            let newTimer = timer;
            newTimer++;
            setTimer(newTimer)
        }, 1000);
        //call return function (works as destroy/unmount function) to clear your values or intervals
        return () => {
            clearInterval(interval);
        }
    }, [timer])

    const onClickRandom = () => {
        let number = Math.floor(Math.random() * 6) + 1;
        setNumber(number);
        setDisabled(true);
        let newTotalScore = totalScore;
        newTotalScore += number;
        setTotalScore(newTotalScore);

        setTimeout(() => {
            let newGameNumber = gameNumber;
            newGameNumber += 1;
            setGameNumber(newGameNumber);
            if (newGameNumber === 3) {
                dispatch(addTotalScore({ score: newTotalScore, timetaken: timer }));
                setThankYou(true);
            }
            setDisabled(false);
        }, 5000);

    }
    return (
        <div>
            {!thankYou ?
                <div className="dice-flex">
                    <div className="pb-20">
                        Game {gameNumber}/3
            </div>
                    <div className="pb-20">
                        {number === 1
                            ?
                            <div className="dice first-face">
                                <span className="dot">
                                </span>
                            </div>
                            : null
                        }

                        {number === 2 ?
                            <div className="dice second-face">
                                <span className="dot">
                                </span>
                                <span className="dot">
                                </span>
                            </div>
                            : null}

                        {number === 3 ?
                            <div className="dice third-face">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div> : null}


                        {number === 4 ?
                            <div className="fourth-face dice">
                                <div className="column">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                                <div className="column">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>
                            : null}

                        {number === 5 ?
                            <div className="fifth-face dice">

                                <div className="column">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>

                                <div className="column">
                                    <span className="dot"></span>
                                </div>

                                <div className="column">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>
                            : null}


                        {number === 6 ?
                            <div className="sixth-face dice">
                                <div className="column">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                                <div className="column">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>
                            : null}
                    </div>
                    <div className="pb-20">
                        <button onClick={onClickRandom} className={disable ? 'disable button' : 'button'}>{disable ? 'Please Wait...' : 'Random'}</button>
                    </div>
                    {disable ?
                        <div>Your Score: {number}</div>
                        : null}
                </div>
                : <div>
                    {
                        user && user.score_error
                            ? <div class="alert">
                                <strong>Error!</strong> {user.score_error}
                            </div>
                            : user && user.score_message
                                ? <div class="success">
                                    <strong>Success!</strong> {user.score_message}
                                </div>
                                : null
                    }
                    <div className="center pb-20">Thank You!</div>
                    <div className="text-center">Your Total Score: {totalScore}</div>
                </div>}
        </div>
    );
}

export default DiceContainer;