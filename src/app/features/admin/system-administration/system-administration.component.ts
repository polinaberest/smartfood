import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BackupFile } from '../../client/models/backup-file';
import { SystemAdministrationService } from '../services/system-administration.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-system-administration',
  templateUrl: './system-administration.component.html',
  styleUrls: ['./system-administration.component.css'],
  providers: [MessageService]
})
export class SystemAdministrationComponent {
  backups$?: Observable<BackupFile[]>;

  createBackupSubscription?: Subscription;


  private readonly successMsg = $localize `Backup created!`;

  constructor(
    private readonly sysAsminService: SystemAdministrationService,
    private readonly router: Router,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.backups$ = this.sysAsminService.getAllBackups();
  }

  ngOnDestroy(): void {
    this.createBackupSubscription?.unsubscribe();
  }

  onCreateBackup(): void {
    this.showSuccess(this.successMsg);
    this.createBackupSubscription = this.sysAsminService.createBackup().subscribe({
      next: (response) => {
        setTimeout(() => {
          this.router.navigateByUrl('admin/system-administration');
        }, 3000);

      },
    });
    this.backups$ = this.sysAsminService.getAllBackups();
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: `success`, summary: `Success: `, detail: message });
  }
}
