const BASE_URL = "https://api.melkornwah.nomoredomains.icu";

const getOptions = (data) => {
  const options = {
    method: "POST",
    headers: {
      "Authorization": `${localStorage.jwt}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": data.password,
      "email": data.email
    })
  }
  return options;
}

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, getOptions(data))
  .then((response) => {
    try {
      if (response.status === 201){
        return response.json();
      }
    } catch(e){
      return (e);
    }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
}; 

export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, getOptions(data))
  .then((response => response.json()))
  .then((res) => {
    if (res.token){
      localStorage.setItem('jwt', res.token);
      return res;
    }
  })
  .catch(err => console.log(err))
};

export const authenticate = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .then(data => data)
  .catch(err => console.log(err))
};
