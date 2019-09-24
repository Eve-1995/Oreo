import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './guess-star.component.html',
  styleUrls: ['guess-star.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class AppGuessStarComponent implements OnInit {
  public start = false;
  public active = false;
  public demoValue = '';
  public questions = [
    {
      value: '🐑🍯',
      answer: '杨幂',
      userAnswer: '',
      right: false
    },
    {
      value: '1️⃣🐑💰🛁',
      answer: '易烊千玺',
      userAnswer: '',
      right: false
    },
    {
      value: '🐷1️⃣🐲',
      answer: '朱一龙',
      userAnswer: '',
      right: false
    },
    {
      value: '♔1️⃣😘',
      answer: '王一博',
      userAnswer: '',
      right: false
    },
    {
      value: '🌼🌅🐟',
      answer: '华晨宇',
      userAnswer: '',
      right: false
    },
    {
      value: '📷🍐🦅',
      answer: '赵丽颖',
      userAnswer: '',
      right: false
    },
    {
      value: '🍐🌧️💋',
      answer: '李宇春',
      userAnswer: '',
      right: false
    },
    {
      value: '🌲🏁',
      answer: '舒淇',
      userAnswer: '',
      right: false
    },
    {
      value: '🐟🍊🎉',
      answer: '庾澄庆',
      userAnswer: '',
      right: false
    },
    {
      value: '🐙💡🦅',
      answer: '张靓颖',
      userAnswer: '',
      right: false
    },
    {
      value: '💡💜🚴',
      answer: '邓紫棋',
      userAnswer: '',
      right: false
    }
  ];

  get result(): string {
    if (this.questions.every(v => v.right)) {
      return '恭喜你闯关成功! 即将前往[我的碎片], 可查看获得的彩蛋情况~';
    } else {
      return `猜对所有艺人即可获得彩蛋, 当前进度: ${this.questions.filter(v => v.right).length}/${this.questions.length}`;
    }
  }

  public validate(index: number): void {
    const currentQuestion = this.questions[index];
    if (currentQuestion.answer === currentQuestion.userAnswer) {
      currentQuestion.right = true;
      this.active = true;
      setTimeout(() => {
        this.active = false;
      }, 2000);
      console.log(this.questions, 'this.questions');
      if (this.questions.every(v => v.right) && localStorage.getItem('oreoToken')) {
        this.httpClient.get(`fragment/guessStar`).subscribe((v: { message: string }) => {
          // 不理解为什么无法订阅成功, 后端已经返回数据了的
          confirm(v.message);
        }, err => console.log(err, 'err'));
        setTimeout(() => {
          this.router.navigate(['/user/fragment']);
        }, 3000);
      }
    } else {
      currentQuestion.userAnswer = '';
    }
  }

  public demoValidate(): void {
    if (this.demoValue === '高圆圆') {
      this.start = true;
    } else {
      this.demoValue = '';
    }
  }

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    const element = document.querySelector('#nb-global-spinner');
    if (element) {
      element.remove();
    }
    console.log('高圆圆');
    if (!localStorage.getItem('oreoToken')) {
      const result = confirm('检测到尚未登录, 如游戏闯关成功将无法获得彩蛋奖励, 请问是否前往登录?');
      if (result) {
        this.router.navigate(['auth/login', { redirectUrl: '/boss/guess-star' }]);
      }
    }
  }
}
