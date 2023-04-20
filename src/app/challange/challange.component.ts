import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxEditorModel } from '../editor/types';


@Component({
  selector: 'app-challange',
  templateUrl: './challange.component.html',
  styleUrls: ['./challange.component.scss']
})
export class ChallangeComponent implements OnInit {
    challengeId: string | undefined;

    editor: any;
  code: string|undefined;

  options = {
    theme: 'vs-dark'
  };

  jsonCode = [
    '{',
    '    "p1": "v3",',
    '    "p2": false',
    '}'
  ].join('\n');

  model: NgxEditorModel = {
    value: this.jsonCode,
    language: 'json'
  };

  
  onInit(editor: any) {
    this.editor = editor;
    console.log(editor);
    this.model = {
      value: this.jsonCode,
      language: 'json'
    };
    // let line = editor.getPosition();
    // let range = new monaco.Range(line.lineNumber, 1, line.lineNumber, 1);
    // let id = { major: 1, minor: 1 };
    // let text = 'FOO';
    // let op = { identifier: id, range: range, text: text, forceMoveMarkers: true };
    // editor.executeEdits("my-source", [op]);
  }

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.challengeId = this._route.snapshot.params['challengeId']
  }

  ngAfterViewInit(): void {
    //editor.create(this.editorDiv?.nativeElement);
  }
}
