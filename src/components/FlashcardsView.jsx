// Vista de fichas de estudio (flashcards)
import React, { useState } from 'react';

const FlashcardsView = ({ cards }) => {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!cards.length) return <div>No hay fichas generadas.</div>;

  const next = () => {
    setIndex((i) => (i + 1) % cards.length);
    setShowAnswer(false);
  };
  const prev = () => {
    setIndex((i) => (i - 1 + cards.length) % cards.length);
    setShowAnswer(false);
  };

  return (
    <div className="flashcards-view">
      <div className="flashcard">
        <div className="question">{cards[index].question}</div>
        {showAnswer && <div className="answer">{cards[index].answer}</div>}
        <button onClick={() => setShowAnswer((v) => !v)}>
          {showAnswer ? 'Ocultar respuesta' : 'Mostrar respuesta'}
        </button>
      </div>
      <div className="flashcard-controls">
        <button onClick={prev}>Anterior</button>
        <span>{index + 1} / {cards.length}</span>
        <button onClick={next}>Siguiente</button>
      </div>
    </div>
  );
};

export default FlashcardsView;
