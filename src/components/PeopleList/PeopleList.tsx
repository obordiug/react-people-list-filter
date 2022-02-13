import React from 'react';
import './PeopleList.scss';

type Props = {
  people: Person[],
};

export const PeopleList: React.FC<Props> = ({ people }) => (
  <ul className="peopleList">
    {people.map(person => (
      <li className="peopleList__item" key={person.lastname}>
        <div>
          {person.name}
          {' '}
          {person.lastname}
        </div>
        <div>
          Возраст:
          {' '}
          {person.age}
        </div>
        <div>
          Пол:
          {' '}
          { person.sex === 'm' ? 'мужской' : 'женский' }
        </div>
      </li>
    ))}
  </ul>
);
