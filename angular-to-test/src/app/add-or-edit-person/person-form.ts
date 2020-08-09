import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Person } from '../person';

export class PersonForm extends FormGroup {
    constructor(person : Person | undefined) {
        super({
            name: new FormControl(person.name ? person.name : undefined),
            email: new FormControl(person.email ? person.email : undefined),
            parents: new FormArray(generateParentsFormArray(person)),
            children: new FormArray(generateChildrenFormArray(person))
        });
    }

    getModel() {
        return {
            name: this.value.name,
            email: this.value.email,
            parents: this.value.parents,
            children: this.value.children
        } as Person
    }
}

const generateParentsFormArray = (person: Person) => {
    const arr = new Array<FormControl>();
    if (person.parents) {
        person.parents.forEach((value, index, array) => {
            arr.push(new FormControl(value));
        });
    } 
    return arr;
}

const generateChildrenFormArray = (person: Person) => {
    const arr = new Array<FormControl>();
    if (person.children) {
        person.children.forEach((value, index, array) => {
            arr.push(new FormControl(value));
        });
    } 
    return arr;
}