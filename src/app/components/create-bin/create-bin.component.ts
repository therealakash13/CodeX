import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Snippet } from '../../models/snippet.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-bin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-bin.component.html',
  styleUrl: './create-bin.component.css',
})
export class CreateBinComponent {
  constructor(private db: DbService, private route: Router) {}
  title = new FormControl('', [Validators.required]);

  code = new FormControl('', [Validators.required]);

  xForm = new FormGroup({
    title: this.title,
    code: this.code,
  });

  async addCode() {
    await this.db.addSnippet(this.xForm.value as Snippet);
    this.xForm.reset();
    this.route.navigate(['']);
  }

  reset() {
    this.xForm.reset();
  }
}
