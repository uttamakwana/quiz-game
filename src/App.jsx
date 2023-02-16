import { useState, useEffect, useRef } from "react";
import "./App.css";
import CardList from "./components/CardList";
import axios from "axios";

function App() {
  //useState
  // Here making state for showing the multiple objects of SAMPLE_DATA into CardList component
  // We are changing every card with axios
  const [cards, setCards] = useState([]);
  // We are setting multiple category with api
  const [category, setCategory] = useState([]);
  // We are changing background color of card-grid
  const [mode, setMode] = useState('#FFFFFF');

  // useRef
  // For generating question according to that category, we are using ref of select means which category is selected and according to that 
  // category we are changing the category with the setCategory();
  const categoryEl = useRef();
  // For generating question according to amount of number, we are using ref of input type number, means what number is selected and according to that number we setting the number of question that will be visible in param of axios.get();
  const amountEl = useRef();

  //useEffect
  // With this useEffect we are fetching all the categories
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategory(res.data.trivia_categories);
    });
  }, []);

  // with the click on generate button this function will be called and all the question will be visible
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setCards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            // for making options here we are incorrect_answer and correct_answer
            // to make sure that every time the answer is not at fixed number we are randomly sorting the options
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: `${index} - ${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  }

  // here we are decoding the question, answer and options that have some html value so we are converting then into normal string
  function decodeString(str){
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  }

  return (
    <div className="App"
    style={{
      backgroundColor : mode
    }}>
      {/* Category component - Return category and number of questions */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category : </label>
          <select name="category" id="category" ref={categoryEl}>
            {category.map((c) => {
              return <option value={c.id} key={c.id}>{c.name}</option>;
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Question : </label>
          <input
           type="number"
           id="amount"
           min="1"
           step="1"
           defaultValue={10}
           ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
        <div className="form-group">
          <label htmlFor="color">Mode</label>
          <input type="color" id="color" value={mode} onChange={e => setMode(e.target.value)} />
        </div>
      </form>

      {/* CardList component - Return all the cards */}
      <CardList cards={cards} mode={mode}/>

      {/* Footer Section */}
      {/* <footer className="footer">
        <p>Copyright@ 2023 - Uttam Makwana</p>
      </footer> */}
    </div>
  );
}

export default App;

