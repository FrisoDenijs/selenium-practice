import { Injectable } from '@angular/core';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private persons: Person[];

  constructor() { }

  getPersons() {
    return this.persons;
  }

  getPerson(index: number) {
    return this.persons[index];
  }

  pushPerson(person: Person) {
    this.persons.push(person);
  }

  putPerson(index: number, person: Person) {
    this.persons[index] = person;
  }

  deletePerson(index: number) {
    this.persons = this.persons.filter((v, i, a) => {
      return i != index;
    });
  }
}
