import React, { useState, useRef, useEffect} from "react";
import './style.css'

function Card({ card }) {
  // Here I am making a state for fliping the card to show the answer by default flip is false means card is not fliped
  const [flip, setFlip] = useState(false);
  const [height ,setHeight] = useState('initial');

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight(){
    const frontMaxHeight = frontEl.current.getBoundingClientRect().height;
    const backMaxHeight = backEl.current.getBoundingClientRect().height;

    setHeight(Math.max(frontMaxHeight, backMaxHeight, 100))
  }

  useEffect(setMaxHeight, [card.question, card.answer]);

  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  })
  return (
      <>
        <div className= {`card ${flip ? "flip" : ""}`} onClick={() => {setFlip(!flip)}}
        style = {{height : height}}
        >
            <div className="front" ref={frontEl}>
                <div className="question">
                    {card.question}
                </div>
                {card.options.map(option => {
                    return <div className = "option" key={option}>{option}</div>
                })}
            </div>
            <div className="back" ref={backEl}>
                {card.answer}
            </div>
        </div>
      </>
  );
}

export default Card;
