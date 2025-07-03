import { Component, signal, inject, OnInit, AfterViewChecked} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SenderComponent } from '../sender/sender.component';
import { ReceiverComponent } from '../receiver/receiver.component';
import { Message } from '../../models/response.type';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-chatbot',
  imports: [
    FormsModule, 
    ReceiverComponent, 
    SenderComponent,
    MatCardModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit{

  showChat = signal(false);
  service = inject(ChatService);
  router = inject(Router);

  
  onSubmit(){}

  ngOnInit(): void {
      
  }

  query = signal({
    text: ""
  })

  chatId = signal({
    chatId: ""
  });

  messages = signal<Array<Message>>([]);

  getMessages (){
  this.service.getMessages(this.chatId().chatId).pipe(
    )
    .subscribe((res) => {
      this.messages.set(res);
    })
  }

  getId(){
    this.service.getIdAPI().pipe(
    )
    .subscribe((res) => {
      if (!localStorage.getItem("chatId")){
        localStorage.setItem("chatId", res.chatId ?? '');
      }
    });
  }

  toggleChat(){
    this.router.navigate(['/chat', localStorage.getItem('chatId')]);
  }

}
