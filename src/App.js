import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages =[
  {"src": "mrmoryicons/photo-1611162616475-46b635cb6868.jpg",matched:false},
  {"src": "mrmoryicons/photo-1611162617474-5b21e879e113.jpg",matched:false},
  {"src": "mrmoryicons/photo-1611262588024-d12430b98920.jpg",matched:false},
  {"src": "mrmoryicons/photo-1611605698323-b1e99cfd37ea.jpg",matched:false},
  {"src": "mrmoryicons/photo-1611605698335-8b1569810432.jpg",matched:false},
  {"src": "mrmoryicons/photo-1611944212129-29977ae1398c.jpg",matched:false},
  {"src": "mrmoryicons/photo-1612810806695-30f7a8258391.jpg",matched:false},
  {"src": "mrmoryicons/photo-1614680376408-81e91ffe3db7.jpg",matched:false},
  {"src": "mrmoryicons/photo-1614680376573-df3480f0c6ff.jpg",matched:false},
  {"src": "mrmoryicons/photo-1614680376593-902f74cf0d41.jpg",matched:false},
]

function App() {
  //shuffle cards
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //handle a choice
  const handleChoice = (card) =>{
    //console.log(card)
    choiceOne ? setChoiceTwo(card):setChoiceOne(card);
  }

  //compare two cards
  useEffect(()=>{
    if(choiceOne && choiceTwo) {
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
      //console.log('cards match') 
      setCards(prevCard => {
        return prevCard.map(card => {
          if(card.src === choiceOne.src)
          return {...card, matched:true};
          else return card;
        })
      })
      resetTurn();
    }    
    else {
      console.log('cards dont match')
      setTimeout(()=> resetTurn(),1200);
    }
  }
   
  },[choiceOne,choiceTwo])
 
  //console.log(cards);
  const shuffleCards = () =>{
    const shuffledCards = [...cardImages,...cardImages] //spread syntax
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id:Math.random()}));
      
      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(shuffledCards);
      setTurns(0);
      
  }

  const resetTurn = () =>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns=>prevTurns+1);
    setDisabled(false);
  }
  //console.log(cards, turns);

  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1> Magic Match</h1>
      <button onClick={shuffleCards}> New Game</button>

      <div className='card-grid'>
        {cards.map(card=> (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled = {disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
