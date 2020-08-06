import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../person.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Person } from '../person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy {

  id: number;
  private param$: Subscription;

  person: Person;

  constructor(private route: ActivatedRoute, private personService: PersonService) { }

  ngOnInit() {
    this.param$ = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       this.person = this.personService.getPerson(this.id);
    });
  }

  ngOnDestroy() {
    this.param$.unsubscribe();
  }

}
