import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alert {

  type: string;

  message: string;

}

@Injectable({
  providedIn: 'root'
})
export class Alertservice {

  private subject = new Subject<Alert>();

  alert$ = this.subject.asObservable();

  success(message: string) {

    this.subject.next({

      type: 'success',

      message

    });

  }

  error(message: string) {

    this.subject.next({

      type: 'error',

      message

    });

  }

  warning(message: string) {

    this.subject.next({

      type: 'warning',

      message

    });

  }

  clear() {

    this.subject.next({

      type: '',

      message: ''

    });

  }

}