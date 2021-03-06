import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api/api.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slides: any = [];
  slideOptions: any = { autoplay: true };
  products: any = [];

  constructor(
    public alertController: AlertController,
    public api: ApiService,
    public cart: CartService
  ) {}

  ngOnInit() {}

  async showAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Description',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['Close'],
    });

    await alert.present();
  }

  slidesDidLoad(slider) {
    console.log('slidesDidLoad ');
    slider.startAutoplay();
  }

  loadData() {
    this.api.progress = true;
    this.api.post('home-data', {}).subscribe((result) => {
      this.api.progress = false;

      if (result.status == 'ok') {
        this.slides = result.data.slides;
        this.products = result.data.products;
      }
    });
  }

  ionViewWillEnter() {
    // this.slideOptions.autoplay = true;
    console.log('ionViewWillEnter');
    this.loadData();
    this.api.refreshUser();
  }

  updateCart(count, product) {
    this.cart.updateCart(product, count);
  }
}
