import { useState } from "react";
import Card from "./Card";
import { CARDS } from "./info";

function App() {
  const [className, setClassName] = useState('');

  function toggleActive(name){
    setClassName(name);
  }

  return (
    <div className="container">
      {CARDS.map(card => <Card url={card.source} toggleActive={toggleActive} name={card.name} className={className}/>)}
    </div>
  );
}

export default App;
