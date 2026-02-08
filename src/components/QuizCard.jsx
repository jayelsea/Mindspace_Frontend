import React, { useState } from 'react';

// Card de ficha de estudio tipo quiz
const QuizCard = ({ ficha, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (onAnswer) onAnswer(idx === ficha.correcta);
  };

  return (
    <div style={{border:'1px solid #ddd',borderRadius:'10px',padding:'1.2rem',background:'#f8faff',boxShadow:'0 2px 8px #0001',minWidth:'260px',maxWidth:'340px',margin:'1rem auto',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div style={{fontWeight:'bold',fontSize:'1.1rem',marginBottom:'0.7rem',color:'#222',textAlign:'center'}}>{ficha.pregunta}</div>
      <div style={{width:'100%',marginTop:'0.5rem'}}>
        {ficha.opciones.map((op, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={answered}
            style={{
              width:'100%',
              margin:'0.3rem 0',
              padding:'0.6rem',
              borderRadius:'6px',
              border: selected === idx ? (idx === ficha.correcta ? '2px solid #4caf50' : '2px solid #f44336') : '1px solid #bbb',
              background: selected === idx ? (idx === ficha.correcta ? '#e8f5e9' : '#ffebee') : '#fff',
              color: selected === idx ? (idx === ficha.correcta ? '#388e3c' : '#c62828') : '#222',
              fontWeight: selected === idx ? 'bold' : 'normal',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {op}
          </button>
        ))}
      </div>
      {answered && (
        <div style={{marginTop:'0.8rem',fontWeight:'bold',color: selected === ficha.correcta ? '#388e3c' : '#c62828'}}>
          {selected === ficha.correcta ? '¡Correcto!' : 'Incorrecto'}
        </div>
      )}
    </div>
  );
};

export default QuizCard;
