import { Component, signal, OnInit, inject, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Client } from '@stomp/stompjs';
import { Location } from '@angular/common';
import { Text, ChatId, Message } from '../../models/response.type';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SenderComponent } from '../sender/sender.component';
import { ReceiverComponent } from '../receiver/receiver.component';
@Component({
  selector: 'app-chat-room',
  imports: [MatInputModule, FormsModule, SenderComponent, ReceiverComponent, MatCardModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent implements OnInit, AfterViewChecked{

  ngOnInit(): void {
    
    this.client.activate();
    this.route.paramMap.subscribe(params => {
      this.chatId.set({chatId: params.get('chat')});
      this.getMessages();
    });
    
  }
  location = inject(Location);
  route = inject(ActivatedRoute)
  service = inject(ChatService);
  messages = signal<Array<Message>>([]);
  query = signal<Text>({text: ""});
  

  chatId = signal<ChatId>({
    chatId: ""
  })
  
  @ViewChild('chatBox') private chatBox!: ElementRef;

  ngAfterViewChecked(): void {
      this.scrollToBottom();
  }

   scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  client = new Client({
    brokerURL: `ws://localhost:8084/ws/connect`,
    connectHeaders: {},
    onConnect: () => {
      this.client.subscribe(`/messages/${this.chatId().chatId}`, (res) => {
        this.newMessage(JSON.parse(res.body))
        console.log(res.body);
      });
      console.log("Ze blututs dzivais iz redzi tzu peya.")
    },
    onStompError: (error) => {
      console.log(error);
    },
    onDisconnect: () => {
      console.log("Wamefunga");
    }
  });

  message = signal<Message>({
    id: 0,
    message: "",
    chatId: localStorage.getItem("chatId"),
    admin: false,
    dateTime: ""
  });

  togglePreviousPage(){
    this.location.back();
  }

  newMessage(message: Message){
    console.log(message);
    this.messages.update((current) => [...current, message]);
  }


  getMessages (){
  this.service.getMessages(this.chatId().chatId).pipe(
    )
    .subscribe((res) => {
      console.log(res);
      this.messages.set(res);
    })
  }



  onSubmit(){
    this.client.publish({
      destination: `/ws/send`,
      body: JSON.stringify({
        message: this.query().text,
        chatId: localStorage.getItem("chatId"),
        admin: false
      })
    });
    this.query.set({text:""});
  }
}
