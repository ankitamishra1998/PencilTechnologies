import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { TextEditorService } from 'src/services/text-editor.service';
import { UserService } from 'src/services/user.service';
import { FirebaseTextModel } from 'src/services/text.model';

declare var MediumEditor: any;

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  subscription: any;
  latexMode: boolean;
  editor: any;
  @ViewChild('editable', {
    static: true
  }) editable: ElementRef;

  constructor(private textService: TextEditorService, private user: UserService) { }

  ngOnInit() {
    this.textService.initializeTextObj();
    this.user.getCurrentUser()
    .then(res => {
      const uid = res.providerData[0].uid;
      this.subscription = this.textService.getText(uid).subscribe((data: FirebaseTextModel) => {
        this.editor.setContent(data.text);
      });
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.editor = new MediumEditor(this.editable.nativeElement);
  }

  addText() {
    this.subscription.unsubscribe();
    const text = this.editor.getContent();
    this.textService.updateText(text);
  }

}
