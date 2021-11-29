import React from 'react';
import ListItem from './ListItem';

const ItemList = (props) => {
  const {deleteReview, beers, reviews} = props;
  console.log(beers);
  console.log(reviews);
  const listContent = reviews.map(review =>
      <ListItem key={review.id}
                beer={beers.find(item => item.id === review.beerId).beerName}
                deleteReview={deleteReview}
                review={review}
      />,
  );

  return (
      <div>
        {listContent}
      </div>
  );
};

export default ItemList;
