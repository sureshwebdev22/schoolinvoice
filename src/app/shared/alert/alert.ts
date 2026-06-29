import { Component } from '@angular/core';
import { Alertservice } from '../../services/alertservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {

 alert: any;
  private timer: any;

  type = '';
  message = '';

  constructor(private alertService: Alertservice) {}

  ngOnInit() {
/*
    this.alertService.alert$.subscribe(alert => {

      this.type = alert.type;
      this.message = alert.message;

      setTimeout(() => {
        this.message = '';
      }, 3000);

    }); */



    this.alertService.alert$.subscribe(alert => {

      this.alert = alert;

      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (alert.message) {
        this.timer = setTimeout(() => {
          this.alertService.clear();
        }, 2000);
      }

    });

  }

}
