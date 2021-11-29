import React from 'react';
import './ListItem.css';

const BeerList = (props) => {

  const sortedBeers = props.beers.sort((first, second) => {
      return first.beerName.localeCompare(second.beerName);
  });
  console.log(sortedBeers);

  const listContent = sortedBeers.map(beer =>
    <div className="Review-Item" key={beer.id}>
      <h3>{beer.beerName}</h3>
    </div>
  );

  return (
      <div>
        {listContent}
      </div>
  )
}

export default BeerList;
