import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { MenuToggle } from 'ionic-angular/components/menu/menu-toggle';

@Component({
  selector: 'page-menumap',
  templateUrl: 'menumap.html'
})
export class menumapPage {
  BMX : boolean;
  Skate  : boolean;
  Roller : boolean;
  Freerun : boolean;
  Autre : boolean;

  constructor(public navParams: NavParams, public navCtrl: NavController){

    this.BMX = this.navParams.get('BMX');
    this.Skate = this.navParams.get('Skate');
    this.Roller = this.navParams.get('Roller');
    this.Freerun = this.navParams.get('Freerun');
    this.Autre = this.navParams.get('Autre');

  }

  panEvent(e) {
    
    this.navCtrl.push(HomePage);
  }
 
    //var data = { BMX : this.BMX , Skate : this.Skate , Roller : this.Roller , Freerun : this.Freerun , Autre : this.Autre }
   

  datachanged(e:any, name: any){
   // if(name == 'BMX'){
      // this.BMX=e;
    //}
    console.log(name);
    console.log(e);
    console.log(e.checked);
}
 
}