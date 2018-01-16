import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { test2 } from '../test2/test2';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  private showtest2(){
    this.navCtrl.push(test2);
  }

}
