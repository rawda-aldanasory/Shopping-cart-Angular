import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface DialogConfig {
  title: string;
  message: string;
  confirmText?: string;
  isDangerous?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogSubject = new Subject<DialogConfig>();
  dialog$ = this.dialogSubject.asObservable();

  confirm(config: DialogConfig): Promise<boolean> {
    return new Promise((resolve) => {
      this.dialogSubject.next({
        ...config,
        confirmText: config.confirmText || 'Confirm',
        isDangerous: config.isDangerous || false
      });

      const handleConfirm = () => {
        cleanup();
        resolve(true);
      };

      const handleCancel = () => {
        cleanup();
        resolve(false);
      };

      const cleanup = () => {
        // Cleanup logic here
        
      };
    });
  }
}