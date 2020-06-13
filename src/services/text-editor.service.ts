import { Injectable } from '@angular/core';
import { FirebaseTextModel } from './text.model';
import { UserService } from './user.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TextEditorService {
  private textObj: FirebaseTextModel;

  constructor(public db: AngularFireDatabase, private user: UserService) {
    this.textObj = new FirebaseTextModel();
  }

  textList = this.db.list('text');
  initializeTextObj() {
    this.user.getCurrentUser()
    .then(res => {
      console.log("user: ", res);
      this.textObj.uid = res.providerData[0].uid;
      this.textObj.name = res.displayName;
      this.textObj.provider = res.providerData[0].providerId;
      this.textObj.text = "";
      });
  }

  updateText(text: any) {
    this.textObj.text = text;
    console.log(text);
    try {
      this.textList.update(this.textObj.uid, this.textObj);
    } catch (err) {
      console.log(err);
    }
  }

  getText(uid: string){
    //console.log("Obj: ", this.db.object('text/' + this.textObj.uid));
    return this.db.object('text/' + this.textObj.uid).valueChanges();
  }
}
