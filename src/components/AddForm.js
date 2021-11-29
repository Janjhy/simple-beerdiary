import React, {useState} from 'react';
import './AddForm.css';

const AddForm = (props) => {
  const [beerName, setBeerName] = useState('');
  const [comment, setComment] = useState('');
  const [score, setScore] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.validateForm(beerName, comment, score)) {
      setBeerName('');
      setComment('');
      setScore(0);
    }
  };

  return (
      <div>
        <form className="Add-Form">
          <label className="Add-Label">
            Beer name:
            <br/>
            <textarea
                className="Beer-Text"
                value={beerName}
                onChange={event => setBeerName(event.target.value)}
            />
          </label>
        </form>
        <form className="Add-Form">
          <label>
            Select a score:
            <br/>
            <select name="score" value={score}
                    onChange={event => setScore(event.target.value)}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </label>
        </form>
        <form className="Add-Form">
          <label>
            Comment:
            <br/>
            <textarea
                value={comment}
                onChange={event => setComment(event.target.value)}
            />
          </label>
        </form>
        <form onSubmit={handleSubmit} className="Submit-Btn">
          <input type="submit" value="Submit"/>
        </form>
      </div>
  );
};
export default AddForm;
