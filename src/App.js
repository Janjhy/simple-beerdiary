import './App.css';
import React, {useEffect, useState} from 'react';
import ApiService from './services/ApiService';
import AuthenticationService from './services/AuthenticationService';
import Buttons from './components/Buttons';
import ListAndSelector from './components/ListAndSelector';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddForm from './components/AddForm';

const App = () => {
  const apiService = new ApiService();
  const authenticationService = new AuthenticationService();
  const [user, setUser] = useState();
  const [formToggle, setFormToggle] = useState(false);
  const [beers, setBeers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userBeers, setUserBeers] = useState([]);
  const [update, setUpdate] = useState(false);

  const getUser = () => {
    authenticationService.getThisUser().then(user => {
          if (user) {
            console.log('User has been loaded from store');
            setUser(user);
            setUpdate(true);
          } else {
            console.log('Not logged in');
          }
        },
    ).catch(err => console.log(err));
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = () => {
    authenticationService.login()
        .then(getUser)
        .catch(err => (console.log(err)));
  };

  const logout = () => {
    authenticationService.logout().then(_ => {
      authenticationService.getThisUser().then(user => setUser(user));
      if (user) {
        toast.error('Logout error');
      } else {
        toast.success('Logout success');
        setReviews([]);
        setBeers([]);
        setUserBeers([]);
      }
    });
  };

  const deleteReview = (id) => {
    apiService.deleteReview(id).then(_ => {
      apiService.getReviewById(id).then(res => {
        if (res.status === 204) {
          toast.success('Deleted review!');
          setUpdate(true);
        } else {
          toast.error('Problem with deletion.');
        }
      });
    });
  };

  const toggleForm = () => {
    setFormToggle(!formToggle);
  };

  const submitForm = (beerName, comment, score) => {
    const beer = {
      'BeerName': beerName,
    };

    apiService.postBeer(beer).then(res => {
      if (res.status === 201) {
        const review = {
          'BeerId': res.data.id,
          'ReviewScore': score,
          'ReviewComment': comment,
        };
        apiService.postReview(review).then(res => {
          if (res.status === 201) {
            toast.success('Added review!');
            toggleForm();
            setUpdate(true);
          }
        }).catch(err => {
          console.log(err);
        });
      } else {
        console.log(res.status);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const validateForm = (beerName, comment, score) => {
    if (beerName !== undefined && beerName !== '' && comment !== undefined &&
        comment !== '' && score !== undefined) {
      if (score <= 5 && score >= 0 && beerName.length < 65 && comment.length <
          500) {
        submitForm(beerName, comment, score);
        return true;
      }
    } else {
      toast.error('Invalid form input');
      return false;
    }
  };

  useEffect(  () => {
    let isMounted = true;
    const doAsync = async () => {
      if (user && update) {
        await apiService.getBeers()
            .then(res => {
              if (isMounted) setBeers(res.data);
            });
        await apiService.getReviews()
            .then(res => {
              if (isMounted) setReviews(res.data);
            });
        await apiService.getUserBeers()
            .then(res => {
              if (isMounted) setUserBeers(res.data);
            });
        setUpdate(false);
      }
    }
    doAsync().then();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, update]);

  return (
      <div className="App">
        <ToastContainer/>
        <header className="App-header">
          <div>BeerDiary demo</div>
          <Buttons
              login={login}
              logout={logout}
              user={user}
          />
        </header>
        {user
            ? <div className="Form">
              <button onClick={toggleForm}>Add new review</button>
              {formToggle
                  ? <AddForm validateForm={validateForm}/>
                  : null
              }
            </div>
            : null
        }
        <div className="App-List">
          {user
              ? <ListAndSelector deleteReview={deleteReview} beers={beers}
                                 reviews={reviews} userBeers={userBeers}/>
              : <div>Not logged in.</div>
          }
        </div>
      </div>
  );
};

export default App;
