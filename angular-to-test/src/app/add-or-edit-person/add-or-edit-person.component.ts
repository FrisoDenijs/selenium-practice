import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonForm } from './person-form';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../person.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-or-edit-person',
  templateUrl: './add-or-edit-person.component.html',
  styleUrls: ['./add-or-edit-person.component.scss']
})
export class AddOrEditPersonComponent implements OnInit, OnDestroy {

  personForm: PersonForm;
  id: number;

  private param$: Subscription;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private personService: PersonService) { }

  ngOnInit() {
    this.param$ = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      const person = this.personService.getPerson(this.id) || undefined;
      this.personForm = new PersonForm(person);
    });
  }

  ngOnDestroy() {
    this.param$.unsubscribe();
  }

  savePerson() {
    if (this.id >= 0) {
      this.personService.putPerson(this.id, this.personForm.getModel());
    } else {
      this.personService.pushPerson(this.personForm.getModel());
    }
    this.router.navigateByUrl('/persons');
  }

}
