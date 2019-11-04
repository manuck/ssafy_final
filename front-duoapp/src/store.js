// import { autorun, observable, decorate } from "mobx"

// class  UserStore {
//     user = Object
// }

// decorate(UserStore, {
//     user = observable,
// })

// let store = window.store = new UserStore

// export default store

// autorun(() => {
//     console.log(store.user)
// })

import { observable, reaction, computed, autorun } from 'mobx';

let mymy = Object
// Observable State 만들기
const store = observable({
  a: Object
});

// // **** 특정 값이 바뀔 때 특정 작업 하기!
// reaction(
//   () => calculator.a,
//   (value, reaction) => {
//     console.log(`a 값이 ${value} 로 바뀌었네요!`);
//   }
// );

// reaction(
//   () => calculator.b,
//   value => {
//     console.log(`b 값이 ${value} 로 바뀌었네요!`);
//   }
// );

// // **** computed 로 특정 값 캐싱
// const sum = computed(() => {
//   console.log('계산중이예요!');
//   return calculator.a + calculator.b;
// });

// sum.observe(() => calculator.a); // a 값을 주시
// sum.observe(() => calculator.b); // b 값을 주시

// calculator.a = 10;
// calculator.b = 20;



export default store