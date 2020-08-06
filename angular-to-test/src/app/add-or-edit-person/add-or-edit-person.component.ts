import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonForm } from './person-form';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private personService: PersonService) { }

  ngOnInit() {
    this.param$ = this.route.params.subscribe(params => {
      this.id = +params['id'] || undefined; // (+) converts string 'id' to a number

      this.personForm = this.id ? new PersonForm(this.personService.getPerson(this.id))
                                : this.personForm = new PersonForm(undefined);
    });
  }

  ngOnDestroy() {
    this.param$.unsubscribe();
  }

}
