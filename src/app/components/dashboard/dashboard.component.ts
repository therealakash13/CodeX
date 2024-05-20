import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  response: any;
  constructor(
    public db: DbService,
    private router: Router,
    public auth: AuthService,
    private toastr: ToastrService
  ) {
    db.getSnippets().then((snippets) => {
      this.response = snippets;
      // console.log(this.response, '<<<<<');
    });
  }

  openCode(id: string) {
    this.router.navigate(['/view/', id]);
  }

  navigateToCreate() {
    this.router.navigate(['/create']);
  }

  deleteSnippet(snippetId: string) {
    this.db.deleteSnippet(snippetId).then(() => {
      this.db.getSnippets().then((snippets) => {
        this.response = snippets;
      });
    });
  }
}
