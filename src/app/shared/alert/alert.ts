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

  timer: any;

  constructor(

      private alertService: Alertservice

  ) {}

  ngOnInit() {

    this.alertService.alert$

      .subscribe(alert => {

        this.alert = alert;

        if (this.timer) {

          clearTimeout(this.timer);

        }

        if (alert.message) {

          this.timer = setTimeout(() => {

            this.alertService.clear();

          }, 3000);

        }

      });

  }

}
