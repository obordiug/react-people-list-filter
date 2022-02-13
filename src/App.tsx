import React from 'react';
import './App.scss';

import { getPeople } from './api/api';
import { PeopleList } from './components/PeopleList';

interface State {
  people: Person[],
  name: string,
  lastname: string,
  age: string,
  sex_m: boolean,
  sex_f: boolean,
  hasLoadingError: boolean,
  error: string,
}

export class App extends React.Component<{}, State> {
  state: State = {
    people: [],
    name: '',
    lastname: '',
    age: '',
    sex_m: false,
    sex_f: false,
    hasLoadingError: false,
    error: '',
  };

  componentDidMount() {
    getPeople()
      .then(people => {
        this.setState({ people, hasLoadingError: false, error: '' });
      })
      .catch(() => {
        this.setState({ hasLoadingError: true, error: 'an error occurred while loading data' });
      });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, type, checked,
    } = event.target;

    this.setState(
      {
        [name]: type === 'checkbox'
          ? checked
          : value,
      } as unknown as Pick<State, keyof State>,
    );
  };

  render() {
    const {
      people, name, lastname, age, sex_m, sex_f, hasLoadingError, error,
    } = this.state;

    let visiblePeople: Person[] = people;

    if (name) {
      visiblePeople = visiblePeople.filter(
        person => person.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (lastname) {
      visiblePeople = visiblePeople.filter(
        person => person.lastname.toLowerCase().includes(lastname.toLowerCase()),
      );
    }

    if (age) {
      visiblePeople = visiblePeople.filter(
        person => person.age === +age,
      );
    }

    if (sex_m) {
      visiblePeople = visiblePeople.filter(
        person => person.sex === 'm',
      );
    }

    if (sex_f) {
      visiblePeople = visiblePeople.filter(
        person => person.sex === 'f',
      );
    }

    return (
      <div className="App">
        <div className="filter">
          <label htmlFor="lastname">
            Имя
            {' '}
            <input
              type="text"
              name="name"
              id="name"
              className="filter__item"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="lastname">
            Фамилия
            {' '}
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="filter__item"
              value={lastname}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="age">
            Возраст
            {' '}
            <input
              type="text"
              name="age"
              id="age"
              className="filter__item"
              value={age}
              onChange={this.handleChange}
            />
          </label>
          <div className="filter__item">
            <label htmlFor="sex_m">
              Пол:
              {' '}
              <input
                type="checkbox"
                id="sex_m"
                name="sex_m"
                checked={sex_m}
                onChange={this.handleChange}
              />
              м
            </label>
            <label htmlFor="sex_f">
              <input
                type="checkbox"
                id="sex_f"
                name="sex_f"
                checked={sex_f}
                onChange={this.handleChange}
              />
              ж
            </label>
          </div>
        </div>

        { hasLoadingError
          ? (
            <div className="error">{error}</div>
          )

          : (
            <PeopleList people={visiblePeople} />
          )}

      </div>
    );
  }
}

export default App;
