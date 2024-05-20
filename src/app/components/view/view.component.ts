import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent {
  snapshot: any;
  constructor(
    private db: DbService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  navigateToDashboard() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    this.db.getSnippetById(param!).then((data: any) => {
      this.snapshot = data;
    });
  }
}
