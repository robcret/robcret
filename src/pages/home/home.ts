import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 import { ToastController } from 'ionic-angular';
import { Toast } from 'ionic-angular/components/toast/toast';
import { ModalController } from 'ionic-angular';
import { menumapPage } from '../menumap/menumap';
import { NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { MenuToggle } from 'ionic-angular/components/menu/menu-toggle';
import { Storage } from '@ionic/storage';

declare var google;
var BMX = true;
var Skate = true;
var Roller = true;
var Freerun = true;
var Autre = true;
var op = 100;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
 
export class HomePage {
  

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  roadmap = true;

  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  json: any;
  db : any;
  nbspots = 0;
  op = 100;

  BMX = true;
  Skate = true;
  Roller = false;
  Freerun = true;
  Autre = false;

  messagespotfound = ' Spots on été trouvés'

  constructor(private storage: Storage, public navCtrl: NavController,
    public menuCtrl: MenuController,public navParams: NavParams,
     public modalCtrl: ModalController, public toastCtrl: ToastController, public http: Http) {
    storage.set('opac', '100');

    
    this.createTimeout(2000)
    .then(() => {
       this.presentToast();
    })

   
     ;
     

  }

  ionViewDidLoad(){
    this.initMap();
    
    var marker = this.recupmarkers();

    /*this.map.addListener('bounds_changed', function() {
      
      // Or to get a key/value pair
         var val = HomePage.getData('opac');
         let elm = <HTMLElement>document.querySelector(".layer");
         var arr = (val/100).toString()
         elm.style.opacity = arr;
         this.save('opac',val-10);
       
     });
    */
    
  }

  getData(): Promise<any> {
    return this.storage.get('checklists');
  }

  save(data): void {
    let saveData = [];
    //Remove observables
    data.forEach((checklist) => {
      saveData.push({
        title: checklist.title,
        items: checklist.items
      });
    });
    let newData = JSON.stringify(saveData);
    this.storage.set('checklists', newData);
  }

  createTimeout(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(null),timeout)
    })


  } 

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 4,
      mapTypeId: 'satellite',
      center: {lat: 48.856614, lng: 2.352222},
      disableDefaultUI: true
    });
  
    this.directionsDisplay.setMap(this.map);
  }

 

  presentToast() {
    var nb;
    nb = this.nbspots  
    let toast = this.toastCtrl.create({
      message: nb+this.messagespotfound,
      duration: 3000
    });
    
    toast.present();
    
  }


  menu1Active() {
 
  //  this.menuCtrl.enable(true, 'menu1');

  }
  presentModal() {
    var data = { BMX : this.BMX, Skate : this.Skate, Roller : this.Roller, Freerun : this.Freerun, Autre : this.Autre }
    let modal = this.modalCtrl.create(menumapPage,data);
    modal.onDidDismiss(res => {
      this.BMX = this.navParams.get('BMX');
      this.Skate = this.navParams.get('Skate');
      this.Roller = this.navParams.get('Roller');
      this.Freerun = this.navParams.get('Freerun');
      this.Autre = this.navParams.get('Autre');
    });
    modal.present();
    
  }

  doLogin() {
    this.navCtrl.push(menumapPage);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  private switchlayer(){
     if(this.roadmap){
      this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      this.roadmap = false;
     } else {
      this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
      this.roadmap = true;
     }
  }
  private recupmarkers(){
    this.http.get('http://gospot.fr/all.php?roller=true').subscribe(data => {
      this.db = data.json();
     this.nbspots = Number(this.db[1]["nbspots"]);
      for (var i = 1; this.nbspots >= i ; i++) {
        var l = Number(this.db[i]["lat"]);
        var ln = Number(this.db[i]["lng"]);
        var marker = new google.maps.Marker({
          position: {lat: l, lng: ln},
          map: this.map,
          title: 'Hello World!',
          animation: google.maps.Animation.DROP
        });
          marker.setMap(this.map);
          marker.addListener('click', function() {
            
          });
        
      ;}
      
  });
  }
  

  private  displaymenu(){

  }

  private nomarker(){
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: this.map.getZoom(),
      mapTypeId: 'satellite',
      center: this.map.getCenter(),
      disableDefaultUI: true
    });

    this.directionsDisplay.setMap(this.map);
  }

  

}

