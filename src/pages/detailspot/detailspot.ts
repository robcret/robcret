import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { MenuToggle } from 'ionic-angular/components/menu/menu-toggle';

@Component({
  selector: 'page-detailspot',
  templateUrl: 'detailspot.html'
})
export class detailspotPage {


  constructor(public navParams: NavParams, public navCtrl: NavController){

  }

  
}