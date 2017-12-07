import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Location, LocationService, Device, DeviceService } from '../shared';
import { Observable } from 'rxjs/Observable';
declare var $: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('imgView') imgView: ElementRef;
  @ViewChild('locateImage') locateImage: ElementRef;
  uploadedImage: File;

  location: Observable<Location[]>;
  error: any;
  url: string;
  index: number;


  height: number;
  width: number;

  public img: string;

  dropData: Observable<Device[]>;
  dragData: Observable<Device[]>;
  droData: Device[];
  draData: Device[];

  cansave: boolean;
  saving: boolean;
  constructor(private locationService: LocationService,
              private ng2ImgMax: Ng2ImgMaxService,
              private deviceService: DeviceService,
              public _DomSanitizer: DomSanitizer) {
    this.error = {
      locate_name: false,
      locate_floor: false,
      locate_image: false
    };

    this.url = localStorage.getItem('isUrl') + 'img/';

    this.width = document.documentElement.clientWidth - 256;
    this.height = document.documentElement.clientHeight;
  }

  ngOnInit() {
    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();
    });
    setTimeout(() => {
      this.location = this.locationService.showObserv();
    }, 200);
    this.img = 'assets/img/placehold.jpg';
  }

  ngOnDestroy() {
    this.location = null;
    this.img = null;
  }

  addToolTip () {
    $('[data-toggle="tooltip"]').tooltip();
  }

  /*
  * Added Location from Modal
  */
  addLocate(e) {
    e.preventDefault();
    const data = {
      locate_name: e.target.locate_name.value,
      locate_floor: e.target.locate_floor.value,
      locate_image: e.target.locate_image.value
    };

    console.log(data);

    if (e.target.locate_image.value !== '') {
      this.locationService.store(data).subscribe(
        res => {
          document.getElementById('reset').click();

          this.error = {
            locate_name: false,
            locate_floor: false,
            locate_image: false
          };

          setTimeout( () => {
            this.location = this.locationService.showObserv();
          }, 200);
        },
        error => console.log(error)
      );
    } else {
      this.error.locate_image = true;
      setTimeout(() => {
        const alertError = document.getElementById('alert');
        alertError.focus();
      }, 1000);
    }
    e.preventDefault();
  }

  /*
  * Delete record in locations
  */
  onDelete(id) {
    if (this.locationService.delete(id)) {
      console.log('Deleted');
    } else {
      console.log('Can\'t delete : ', id);
    }
  }

  /*
  * On Click Image Profile to Select file image
  */
  onClickUpload() {
    this.fileInput.nativeElement.click();
  }

  /*
  * On file selected change
  */
  onChangeImg(event) {
    const target = event.target || event.srcElement;
    if (target.value.length === 0) {
      const imgBrowser = this.imgView.nativeElement;
      imgBrowser.src = 'assets/img/profile.jpg';
    } else {
      const fileBrowser = this.fileInput.nativeElement;
      if (fileBrowser.files && fileBrowser.files[0]) {
        this.ng2ImgMax.resizeImage(fileBrowser.files[0], 1024, 576).subscribe(
          result => {
            this.uploadedImage = new File([result], result.name);
            this.getImagePreview(this.uploadedImage);
          },
          error => {

            console.log('😢 Oh no!', error);
          }
        );
      }
    }
  }

  /*
  * On Click Button Reset
  */
  onClear() {
    const imgBrowser = this.imgView.nativeElement;
    imgBrowser.src = 'assets/img/profile.jpg';
  }

  /*
  * Need to show preview image
  */
  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    const imgView = this.imgView.nativeElement;
    const locateImage = this.locateImage.nativeElement;
    reader.readAsDataURL(file);
    reader.onload = () => {
      imgView.src = reader.result;
      locateImage.value = reader.result;
    };
  }









  onChangeLocation(e) {
    if (e !== '') {
      this.locationService.show().subscribe(res => {
        document.getElementById('map')
          .setAttribute('class', e);
        this.img = localStorage.getItem('isUrl') + 'img/' + e + '.jpg';
        this.deviceService.showAddedWhereObserv(e).subscribe(resp => {this.droData = resp; } );
        this.deviceService.showAvailableObserv().subscribe(resp => {this.draData = resp; } );
        this.dropData = this.deviceService.showAddedWhereObserv(e);
        this.dragData = this.deviceService.showAvailableObserv();
      });
    } else {
      this.img = 'assets/img/placehold.jpg';
      this.droData = [];
      this.draData = [];
      this.dragData = null;
      this.dropData = null;
    }
  }

  /*
    * Get data from dragged
    */
  drag_start(event) {
    const style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData('text/plain', (parseInt(style.getPropertyValue('left'), 10) - event.clientX)
      + ',' + (parseInt(style.getPropertyValue('top'), 10) - event.clientY)
      + ',' + event.target.getAttribute('data-item') + ',' + event.target.getAttribute('id'));
  }

  /*
  * Get data from dragging
  */
  drag_over(event) {
    event.preventDefault();
    return false;
  }

  /*
  * Use data from drag_start
  */
  drop(event) {
    const offset = event.dataTransfer.getData('text/plain').split(',');
    const dm = <HTMLElement>document.getElementsByClassName('dragme')[parseInt(offset[2], 10)];

    // Set style of Item
    dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';

    // Make position to percentage
    const x = Math.round((event.clientX + parseInt(offset[0], 10)) * 100000 / this.width) / 1000;
    const y = Math.round((event.clientY + parseInt(offset[1], 10)) * 100000 / this.height) / 1000;

    if (this.deviceService.onDropDevice(offset[3], x, y)) {
      this.cansave = true;
    }

    event.preventDefault();
    return false;
  }

  /*
   * Confirm drag and drop to dropped
   */
  confirmDrag() {
    this.saving = true;
    this.location = null;
    const data = document.getElementById('map').getAttribute('class');
    if (this.deviceService.onConfirmDrop(data)) {
      this.location = this.locationService.showObserv();
      this.saving = false;
      this.cansave = false;
    }
  }

  /*
    * Reset drag and drop to availiable
    */
    resetDrag() {
      $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
      });
      setTimeout(() => {
        this.location = this.locationService.showObserv();
      }, 200);
      this.img = 'assets/img/placehold.jpg';
      this.dropData = null;
    }
  /*
    * When drag and drop in modal wiil change data item
    */
  changeItem() {
    if (this.deviceService.onChangeDeviceSide(this.droData, this.draData)) {
      this.cansave = true;
    }
  }

}
