import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface Session {
  sessionId: string;
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  browser: string;
  operatingSystem: string;
  location: string;
  ipAddress: string;
  lastActivity: Date;
  isCurrent: boolean;
}

@Component({
  selector: 'lib-session-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './session-list.html',
  styleUrl: './session-list.scss',
})
export class SessionList {
  @Input() sessions: Session[] = [];
  @Input() isLoading = false;
  @Input() terminatingSessionId: string | null = null;

  @Output() terminateSession = new EventEmitter<string>();
  @Output() terminateAllOther = new EventEmitter<void>();

  getDeviceIcon(deviceType: string): string {
    switch (deviceType) {
      case 'desktop':
        return 'computer';
      case 'mobile':
        return 'smartphone';
      case 'tablet':
        return 'tablet';
      default:
        return 'devices';
    }
  }

  formatLastActivity(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return new Date(date).toLocaleDateString();
  }

  onTerminateSession(sessionId: string): void {
    this.terminateSession.emit(sessionId);
  }

  onTerminateAllOther(): void {
    this.terminateAllOther.emit();
  }

  get hasOtherSessions(): boolean {
    return this.sessions.some((s) => !s.isCurrent);
  }
}
