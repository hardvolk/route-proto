import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  apiURL = 'https://maps.googleapis.com/maps/api/directions/json?';
  apiKey = 'AIzaSyBvhWBIl9uvPNBZBiTs_-rr_P43GAfQ8FA';
  loader: any;
  route: any;
  distance = '';
  mts = 0;
  fare = 1.5;

  constructor(public navCtrl: NavController,
              private http: HttpClient,
              public loadingCtrl: LoadingController) {
    // Create Loader
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
  }

  calculateRoute (originId, destinationId) {
    const uri = this.apiURL + 'origin=place_id:' + originId + '&destination=place_id:' + destinationId  + '&key=' + this.apiKey;
    this.loader.present();
    this.http.get(uri)
      .subscribe(
        data => {
          if ( data["status"] === "OK" ) {
            console.log('Directions Response: ', data);
            this.route = data["routes"];
            this.distance = this.route[0].legs[0].distance.text;
            this.mts = this.route[0].legs[0].distance.value;

          } else {
            this.route = [];
            this.distance = '';
          }
          
         },
        error => { console.log(error) },
        () => { this.loader.dismiss() }
      );
  }


}
