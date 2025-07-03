import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { SuccessComponent } from './components/success/success.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'step1',
    component: Step1Component
  },
  {
    path: 'step2',
    component: Step2Component
  },
  {
    path:'chat/:chat',
    loadComponent: () => {
      return import('./components/chat-room/chat-room.component').then((m) => m.ChatRoomComponent)
    } 
  },

  {
    path: 'step3',
    component: Step3Component
  },
  {
    path: 'success',
    component: SuccessComponent
  },
    {
        path:'admin-chats',
        loadComponent: () => {
            return import('./components/admin-chats/admin-chats.component').then((m) => m.AdminChatsComponent)
        }
    },
    {
        path:'chatbot',
        loadComponent: () => {
            return import('./components/chatbot/chatbot.component').then((m) => m.ChatbotComponent)
        }
    },
];

