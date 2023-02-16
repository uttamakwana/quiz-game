import React, {useRef, useEffect} from 'react'
import Card from './Card.jsx'

function CardList({cards, mode}) {

  // const gridEl = useRef();
  // if(gridEl.current){
  //   useEffect(() => {setHeight(gridEl.current.offsetHeight + 200)}, [gridEl.current.offsetWidth, gridEl.current.offsetHeight])
  // }


  return (
    <>
        <div className="card-grid"
          style={{
            backgroundColor : mode
          }}
        >
            {
                cards.map(card => {
                    return <Card card={card} key={card.id}/>
                })
            }
        </div>
    </>
  )
}

export default CardList