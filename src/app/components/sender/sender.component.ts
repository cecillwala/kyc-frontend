import { Component, input } from '@angular/core';
import { Message } from '../../models/response.type';

@Component({
  selector: 'app-sender',
  imports: [],
  templateUrl: './sender.component.html',
  styleUrl: './sender.component.css'
})
export class SenderComponent {
  message = input<Message>({
    id: 0,
    message: "",
    chatId: "",
    admin: false,
    dateTime: ""
  });

  formatTime(date: string): string{
    const datetime = new Date(date);
    console.log(datetime.getTime());
    return JSON.stringify(datetime.toDateString());
  }
}
