import React, {useState} from 'react';
import ItemList from './ItemList';
import BeerList from './BeerList';
import './ListAndSelector.css'
import './Button.css';

const ListAndSelector = (props) => {
  let {reviews, beers, userBeers} = props;
  const [selector, setSelector] = useState('review');

  return (
      <div className="List-And-Selector">
        <div className="Buttons">
          <button className={selector === 'review' ? 'Selected' : 'Not-Selected'} onClick={_ => setSelector('review')}>My reviews</button>
          <button className={selector === 'beers' ? 'Selected' : 'Not-Selected'} onClick={_ => setSelector('beers')}>All beers</button>
          <button className={selector === 'userBeers' ? 'Selected' : 'Not-Selected'} onClick={_ => setSelector('userBeers')}>My reviewed items</button>
        </div>
        <div className="List">
          {selector === 'review' ? (
              (reviews.length > 0 && beers.length > 0)
                  ? <ItemList deleteReview={props.deleteReview} reviews={reviews} beers={beers}/>
                  : <div>No reviews.</div>
          ) : selector === 'beers' ? (
              (beers.length > 0)
                  ? <BeerList beers={beers}/>
                  : <div>No items.</div>
          ) : selector === 'userBeers' ? (
              (userBeers.length > 0)
                  ? <BeerList beers={userBeers}/>
                  : <div>No items.</div>
          ) : <div>No items</div>
          }
        </div>
      </div>
  );
};

export default ListAndSelector;
