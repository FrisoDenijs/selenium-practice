import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../person.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Person } from '../person';
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

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

  private transformer = (node: Person, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
