import { Injectable } from '@angular/core';
import { Person } from './person';
import { PersonComponent } from './person/person.component';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private persons: Person[];

  constructor() {
    this.persons = new Array<Person>();
    this.persons.push({
      name: "first person",
      email: "first@example.com"
    } as Person)
    this.persons.push({
      name: "second person",
      children: [this.persons[0]]
    } as Person)
    this.persons.push({
      name: "third person",
      children: [this.persons[1]]
    } as Person)
   }

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
