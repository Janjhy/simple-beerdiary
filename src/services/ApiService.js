import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const apiGet = (token, str) => {
  let headers =  {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };
  return axios.get(process.env.REACT_APP_API_URL + str, {headers});
};

const apiPost = (token, str, data) => {
  console.log(data)
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios.post(process.env.REACT_APP_API_URL + str, data,{headers});
}

const apiDelete = (token, str) => {
  let headers =  {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios.delete(process.env.REACT_APP_API_URL + str, {headers});
}

class ApiService {
  authenticationService: AuthenticationService;

  constructor() {
    this.authenticationService = new AuthenticationService();
  }

  getCall(str) {
    return this.authenticationService.getThisUser()
        .then(user => {
          if (user && user.access_token) {
            return apiGet(user.access_token, str).catch(err => {
              if (err.response.status === 401) {
                return this.authenticationService.tokenRenew().then(rUser => {
                  return apiGet(rUser.access_token, str);
                });
              }
              throw err;
            });
          } else if (user) {
            return this.authenticationService.tokenRenew().then(rUser => {
              return apiGet(rUser.access_token, str);
            });
          } else {
            throw new Error('Not signed in.');
          }
        });
  }

  delCall(str, data) {
    return this.authenticationService.getThisUser()
        .then(user => {
          if (user && user.access_token) {
            return apiDelete(user.access_token, str, data).catch(err => {
              if (err.response.status === 401) {
                return this.authenticationService.tokenRenew().then(rUser => {
                  return apiDelete(rUser.access_token, str, data);
                });
              }
              throw err;
            });
          } else if (user) {
            return this.authenticationService.tokenRenew().then(rUser => {
              return apiDelete(rUser.access_token, str, data);
            });
          } else {
            throw new Error('Not signed in.');
          }
        });
  }

  postCall(str, data) {
    return this.authenticationService.getThisUser()
        .then(user => {
          if (user && user.access_token) {
            return apiPost(user.access_token, str, data).catch(err => {
              if (err.response.status === 401) {
                return this.authenticationService.tokenRenew().then(rUser => {
                  return apiPost(rUser.access_token, str);
                });
              }
              throw err;
            });
          } else if (user) {
            return this.authenticationService.tokenRenew().then(rUser => {
              return apiPost(rUser.access_token, str);
            });
          } else {
            throw new Error('Not signed in.');
          }
        });
  }

  getBeers() {
    let str = 'beers';
    return this.getCall(str);
  }

  getBeerById(id) {
    let str = 'beers/' + id;
    return this.getCall(str);
  }

  postBeer(beer) {
    let str = 'beers';
    return this.postCall(str, beer);
  }

  getReviewById(id) {
    let str = 'reviews/' + id;
    return this.getCall(str);
  }

  getReviews() {
    let str = 'reviews';
    return this.getCall(str);
  }

  getUserBeers() {
    let str = 'reviews/beers';
    return this.getCall(str);
  }

  postReview(review) {
    let str = 'reviews';
    return this.postCall(str, review);
  }

  deleteReview(id) {
    let str = 'reviews/' + id;
    return this.delCall(str);
  }

}

export default ApiService;
