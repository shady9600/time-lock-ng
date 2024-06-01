import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '_@core/messagesFirebase.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  message: Message = {
    title: 'my note',
    content: 'my content',
    delayInMinutes: .2
  };

  timerFinished: boolean = false;
  countdownMilliseconds: number = 0;
  timerDisplay: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const messageId = params['id'];
      console.log('messageId: ', messageId)
    });

    this.countdownMilliseconds = this.message.delayInMinutes * 60 * 1000;
    this.startCountdown();
  }

  startCountdown(): void {
    // Update timer display every second
    const timerInterval = setInterval(() => {
      // Calculate minutes and seconds
      const minutes = Math.floor(this.countdownMilliseconds / 60000);
      const seconds = ((this.countdownMilliseconds % 60000) / 1000).toFixed(0);

      // Display the timer
      this.timerDisplay = `${minutes}:${(Number(seconds) < 10 ? '0' : '')}${seconds}`;

      // Decrease remaining time
      this.countdownMilliseconds -= 1000;

      // Check if countdown is finished
      if (this.countdownMilliseconds < 0) {
        clearInterval(timerInterval); // Stop the timer
        this.timerDisplay = '0:00'; // Display 0:00
        this.timerFinished = true;
      }
    }, 1000);
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}