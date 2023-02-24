// Q1
class People {
  constructor(name) {
    this.name = name;
    this.events = {};
  }

  sayHi() {
    console.log(`Hi, I am ${this.name}`)
  }

  on(eventType, callback) {
    if (typeof eventType !== "string") { // 异常处理
      throw new Error('event must be a string');
    } else if (this.events[eventType]) { // 订阅
      this.events[eventType].push(callback);
    } else {
      this.events[eventType] = [];
      this.events[eventType].push(callback);
    }
  }

  off(eventType, callback) {
    if (!this.events[eventType].includes(callback)) {
      return;
    } else {
      let idx = this.events[eventType].indexOf(callback);
      this.events[eventType].splice(idx, 1); // 删除事件响应函数
    }
  }

  emit(eventType, data) {
    if (this.events[eventType]) {
      this.events[eventType].forEach(cb => {
        cb(data); // 消费
      })
    }
  }
}

// Q2
const sleep = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration));
}

// Q3
// 判断是否含有数组下标, 有则取出, 无则返回undefined
const getArrIndex = (str) => {
  let result = undefined;
  let reverseStr = [...str].reverse();
  if (reverseStr[0] === ']'
    && Number(reverseStr[1]) !== NaN
    && reverseStr[2] === '[') {
    result = parseInt(reverseStr[1]);
  }
  return result;
}

// 答案
const deepGet = (obj, props) => {
  const propsArr = props.split('.');
  let currentObj = obj;

  for (let i = 0; i < propsArr.length; i++) {
    let prop = propsArr[i];
    const arrIndex = getArrIndex(prop);
    if (arrIndex) {
      prop = prop.slice(0, prop.length - 3);
      currentObj = currentObj[prop];
      currentObj && (currentObj = currentObj[arrIndex]);
    } else {
      currentObj = currentObj[prop];
    }
    if (currentObj === undefined) {
      break;
    }
  }

  return currentObj;
}

// Q4
const isValidArgs = (args) => {
  for (let i = 0; i < args.length; i++) {
    if (!isFunction(args[i])) {
      return false;
    }
  }
  return true;
}
const isFunction = (target) => {
  return typeof target === 'function';
}
const combo = (...args) => {
  if (!isValidArgs(args)) {
    throw new Error('One of the argument is not valid');
    return;
  }
  return (value) => {
    return args.reverse().reduce((prev, cur) => {
      return cur(prev);
    }, value);
  }
}

// Q5
/**
 * 先手：先手可以先拿走7个小球的盘子中的2两个小球，之后枚举都保持两个盘子数量相当，
 * 比如：先手者拿完后，两盘的球数都为2：2时，则后手者必输。
 * 
 * 
 */