import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';

interface PlaceResult {
  formatted_address?: string,
  id?: string,
  name?: string,
  place_id?: string,
  [propName: string]: any;
}

/**
 * Generated class for the SearchDirectionBarComponent component.
 */
@Component({
  selector: 'search-direction-bar',
  templateUrl: 'search-direction-bar.html'
})
export class SearchDirectionBarComponent {

  @Input() label = 'Label';
  txtValue = '';
  showOptions = false;
  apiURL = 'api/place/textsearch/json?';
  apiKey = 'AIzaSyBvhWBIl9uvPNBZBiTs_-rr_P43GAfQ8FA';
  query = '';
  optionList: PlaceResult[] = [];
  selectedOption: PlaceResult;
  data: any;
  public addressId = '';

  constructor(private http: HttpClient) {
  }

  onKey(val) {
    if (val.length >= 3) {
      this.txtValue = val;
      this.getOptions();
    } else {
      this.showOptions = false;
    }
  }

  getOptions() {
    const uri = this.apiURL + 'query=' + encodeURI(this.txtValue) + '&key=' + this.apiKey;
    this.http.get(uri)
      .subscribe(
        data => { 
          if ( data["status"] === "OK" ) {
            this.optionList = data["results"];
            this.showOptions = true;
          } else {
            this.showOptions = false;
            this.optionList = [];
            this.addressId = '';
          }
          
          this.data = data;
        },
        error => { console.log(error) }
      );
  }

  setSelectedOption(option: PlaceResult) {
    this.selectedOption = option;
    console.log('User selected: ', this.selectedOption);
    this.addressId = this.selectedOption.place_id;
    this.optionList = [];
    this.showOptions = false;
  }

}
