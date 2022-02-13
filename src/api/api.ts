const BASE_URL = 'https://venbest-test.herokuapp.com/';

export const getPeople = (): Promise<Person[]> => {
  return fetch(`${BASE_URL}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error());
      }

      return response.json();
    });
};
