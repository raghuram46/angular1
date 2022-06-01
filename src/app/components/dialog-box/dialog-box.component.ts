import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  comments: any;
  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.comments = this.route.snapshot.params['comments']
  }

}
