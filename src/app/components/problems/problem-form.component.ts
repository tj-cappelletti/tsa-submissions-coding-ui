import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { ProblemsService } from '../../services/problems.service';
import { ThemeService } from '../../services/theme.service';
import { Problem } from '../../models/problem.models';
import { ActivatedRoute } from '@angular/router';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-problem-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule, MonacoEditorModule],
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProblemFormComponent implements OnInit {
  @Input() problem: Problem | null = null; // If null, it's an add form; otherwise, edit

  description = '';
  error: string | null = null;
  success: string | null = null;
  testSetsJson: string = '';
  title = '';

  monacoTheme = 'vs-light';

  constructor(
    private problemsService: ProblemsService,
    private route: ActivatedRoute,
    private themeService: ThemeService) {
    this.themeService.theme$.subscribe(theme => {
      this.monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs-light';
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id === 'new') {
        this.problem = null; // New problem
      } else if (id) {
        this.problemsService.getProblemById(id).subscribe({
          next: (problem) => {
            if (problem) {
              this.problem = problem;
              this.title = problem.title;
              this.description = problem.description;
            }
          },
          error: () => {
            this.error = 'Failed to load problem.';
          }
        });
      }
    });
  }

  onSubmit() {
    this.error = null;
    this.success = null;
    if (!this.title.trim() || !this.description.trim()) {
      this.error = 'Title and description are required.';
      return;
    }

    const problemData: Problem = { ...this.problem, title: this.title, description: this.description };
    if (this.problem) {
      // Edit
      this.problemsService.updateProblem(problemData).subscribe({
        next: () => this.success = 'Problem updated successfully!',
        error: () => this.error = 'Failed to update problem.'
      });
    } else {
      // Add
      this.problemsService.createProblem(problemData).subscribe({
        next: () => {
          this.success = 'Problem created successfully!';
          this.title = '';
          this.description = '';
        },
        error: () => this.error = 'Failed to create problem.'
      });
    }
  }

  setTheme(isDarkMode: boolean) {
    this.monacoTheme = isDarkMode ? 'vs-dark' : 'vs-light';
  }
}
