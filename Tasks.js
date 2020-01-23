// Объекты и наследование
// 4. Напишите функцию-конструктор Person, которая создает объекты со свойствами name, lastName и методом fullName = () => name + lastName
function Person(name, lastName) {
    this.name = name;
    this.lastname = lastName;
}

Person.prototype.fullName = function () {
    return `${this.name} ${this.lastname}`;
}

var person = new Person('Alex', 'Petrov');
console.log(person.fullName());

// 5. Напишите функцию-конструктор Employee, создающую объекты с такими же свойствами и методами, как у Person, и дополнительным свойством position, которое добавляется к fullName
// (с использованием кода задачи 4)

function Employee(name, lastName, position) {
    Person.call(this, name, lastName);
    this.position = position;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;
Employee.prototype.fullName = function() {
    return `${Person.prototype.fullName.call(this)} (${this.position})`;
}

var employee = new Employee('Alex', 'Petrov', 'developer');
console.log(employee.fullName());

// 8. Что появится в консоли после выполнения кода?

var a = { b: 1 };
c = Object.create(a);

console.log(c.b); // 1
delete c.b;
console.log(c.b); // 1
delete a.b;
console.log(c.b); // undefined || error

a.z = 2;
console.log(c.z); // 2
c.z = 3;
console.log(a.z); // 2

// 11. Напишите простейшую реализацию метода Object.create

function myCreate(proto) {
    function F() {};
    F.prototype = proto;
    F.prototype.constructor = F;
    return new F();
}

// Функции
// 3. Что появится в консоли,
// 4. Как модифицировать код задачи 3.

for (var i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
} // 10, ..., 10

for (let i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
} // 0, 1, ..., 8, 9

for (var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(this);
    }.bind(i), 1000);
} // 0, 1, ..., 8, 9

// 5. Что появится в консоли и почему?

var a = 1;

function foo() {
    console.log(a);
}

function foo2() {
    var a = 2;
    foo();
}

foo2(); // 1, так как тут работает механизм замыкания, а функция объявлена вне foo2

// 6. Исправьте баг в методе getFilteredUsers

var userService = {
    currentFilter: 'active',
    users: [
        { name: 'Alex', status: 'active' },
        { name: 'Nick', status: 'deleted' }
    ],
    getFilteredUsers: function () {
        return this.users.filter((user) => user.status === this.currentFilter);
    }
};

console.log(userService.getFilteredUsers());

// 7. Напишите простейшую реализацию метода bind

const myBind = (fn, ctx, ...args) => () => fn.apply(ctx, args);

function a(c1, c2, c3) {
    return this.x + this.y + c1 + c2 + c3;
};

const obj = {
    x: 5,
    y: 10
};

console.log(myBind(a, obj, 8, 10, 15)());

// 8. Что появится в консоли? Изменится ли результат, если мы заменим функцию на стрелочную? каким будет поведение в строгом режиме?

var obj = {
    a: function () {
        console.log(this.prop)
    },
    prop: 1
};

obj.a.prop = 2;
obj.a(); // 1, если зменить на () => {} - window.prop || error
var fn = obj.a;
fn(); // window.prop || error

// 9. Как можно реализовать функцию isStrictMode, которая возвращает true, если мы находимся в строгом режиме?

function isStrictMode() {
    return !Boolean(this)
}

// 10. Напишите функцию sum, вызываемую следующим образом sum(1)(2)(3)...(n)()

function sum(a) {
    var res = a;

    function sumChain(b) {
        if (isNaN(b)) return res;
        res += b;
        return sumChain;
    };

    return summChain;
};

console.log(sum(5)(5)(10)());

// const sum = i => j => j ? sum(i + j) : i

// 11. Как модифицировать функцию так, что бы она отработала без заключительного вызова с опущенным аргументом?

function sum(a) {
  var res = a;

  function sumChain(b) {
    res += b;
    return sumChain;
  };
  sumChain.toString = function() {
    return res;
  };

  return sumChain;
};

console.log(sum(5)(6)(10) + 1);

// Асинхонность
// 6. Что появится в консоли и почему?

Promise.reject('a')
    .catch(p => p + 'b') // промис зарезолвился
    .catch(p => p + 'c') // пропускаем
    .then(p => p + 'd')
    .finally(p => p + 'e') // ничего не возвращает
    .then(console.log) // попадает результат до finally
console.log('f') // выводится синхронно

// f
// abd

// 10. Разработчик решил следовать "Закону Диметры" и получил следующий код. Как его упростить?

function getCompanyInfo() {
    return userService.companyInfo().then((res) => res, (err) => { throw err });
}

// Алгоритмы и структуры данных
// 1. Как посчитать пересечение множеств? Какова вычислительная сложность предложенного решения? Предложите более эффективный алгоритм.

const intersection = (arr1, arr2) => arr1.filter(x => arr2.includes(x)); // до O(n^2)

const intersection = (arr1, arr2) => {
    let map = {};
    arr1.forEach(el => map[el] = true);
    return arr2.reduce((acc, el) => {
        if(map[el]) acc.push(el);
        return acc;
    },[])
}; // Более быстрый вариант.

// 2. Есть два отсортированных массива. Написать функцию, которая вернет третий отсортированный массив, пролученный путем слияния первого и второго.

var arr1 = [1, 2, 5, 6];
var arr2 = [3, 4, 8];

// const sortedConcat = (arr1, arr2) => [...new Set([...arr1, ...arr2])].sort();

const sortedConcat = (arr1, arr2) => {
  let result = [];
  const length = arr1.length + arr2.length;
  for (let i = 0; i < length; i++) {
    if (arr1.length !== 0 && arr1[0] < arr2[0]) {
      result.push(arr1.shift());
    } else if (arr2.length !== 0) {
      result.push(arr2.shift());
    }
  }
  return result;
} // Решение в es5

console.log(sortedConcat(arr1, arr2));

// 3. Сортировка массива, состоящего исключительно из 0 и 1 (наверно, я не очень понял задачу)

var arr = [0, 0, 0, 1, 0, 1, 0, 1, 1, 0];
const sort = (arr) => arr.sort();

console.log(sort(arr));

// 5. Напишите функцию для поиска анаграмм.

const anagramms = [
    'импортер',
    'пирометр',
    'реимпорт',
    'пасечник',
    'песчаник',
    'песчинка',
    'корсет',
    'костер',
    'сектор',
    'стокер'
];

const findAnagramms = (arr) => Object.values(
    arr.reduce((acc, word) => {
        let brokenWord = word.split('').sort();
        if (!acc[brokenWord]) acc[brokenWord] = [];
        acc[brokenWord].push(word);
        return acc;
    }, {})
)

console.log(findAnagramms(anagramms));

// 6. Напишите функцию для поиска палиндромов.

const arr = ['кек', 'Я ем змея', 'Тя, Дуся, судят', 'не палиндром'];

const findPalindroms = (arr) => arr.reduce((acc, word) => {
    const wordOnlyFromLetters = word.toLowerCase().replace(/[^А-Яа-яA-Za-z]/g, '');
    const reversedWord = wordOnlyFromLetters.split('').reverse().join('');
    if (reversedWord === wordOnlyFromLetters) acc.push(word);
    return acc;
}, []);

console.log(findPalindroms(arr));

// 7. Напишите функцию, тестирующую правильность вложенных скобок трех типов.

const map = {
    '(': ')',
    '[': ']',
    '<': '>'
};

const test = (str) => {
    let stack = [];
    for (let i = 0; i < str.length; i++) {
        if (Object.keys(map).some(key => key === str[i])) {
            stack.push(str[i]);
        } else {
            if (map[stack.pop()] !== str[i]) return false;
        }
    }
    return stack.length === 0;
}

console.log(test('[]()<>'));
console.log(test('[]()<)'));
console.log(test('[(<>)]'));
console.log(test('[(<>])'));

// Посложнее
// 1. Реализуйте отменяемый промис

function myFetch(url) {
    const time = Math.floor(Math.random() * 5) + 1;
    console.log(`start make request for url ${url} with time ${time}`);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`end make request for url ${url} with time ${time}`);
            resolve(url.slice(-1));
        }, time * 1000);
    })
}

const promiseWithCancel = promise => {
    let isCanceled = false;
    const wrappedPromise = new Promise((resolve, reject) => promise.then(res => isCanceled ? reject('canceled') : resolve(res)));

    wrappedPromise.cancel = () => {
        isCanceled = true;
    };

    return wrappedPromise;
};

const cancelablePromise = promiseWithCancel(myFetch("http://api/v1/1"));
// cancelablePromise.cancel();

cancelablePromise.then(console.log, console.log)

// 2. Написать функцию makeRequests, получающую на вход массив ссылок и число, указывающее максимальное количество одновременных запросов.
// Условия:
// одновременно должно выполняться не более указанного числа запросов
// должен возвращаться массив результатов в той же последовательности, что и адреса запросов
// нельзя делать повторные запросы на дублирующие адреса (при этом результат все равно должен присутствовать в результирующем массиве)

const urls = [
    'http://api/v1/1',
    'http://api/v1/1',
    'http://api/v1/2',
    'http://api/v1/4',
    'http://api/v1/3',
    'http://api/v1/4',
    'http://api/v1/3',
    'http://api/v1/4',
    'http://api/v1/3',
    'http://api/v1/5'
];

function myFetch(url) {
    const time = Math.floor(Math.random() * 5) + 1;
    console.log(`start make request for url ${url} with time ${time}`);
    return new Promise(resolve => {
        setTimeout(() => {
        console.log(`end make request for url ${url} with time ${time}`);
        resolve(url.slice(-1));
        }, time * 1000);
    })
}

const makeRequests = (urls, limit) => new Promise(resolve => {
    let map = {};
    let urlsForRequest = [...urls];

    const getUrl = url => {
        if (map[url]) {
            return getUrl(urlsForRequest.shift());
        }

        map[url] = 'pending';

        myFetch(url).then(res => {
            map[url] = res;

            if (urlsForRequest[0]) {
                getUrl(urlsForRequest.shift())
            }

            if (!Object.values(map).some(val => val === 'pending')) {
                resolve(urls.map(url => map[url]));
            }
        })
    }

    urlsForRequest.splice(0, limit).forEach(getUrl);
})

makeRequests(urls, 3).then(console.log);

// Задачи вне рамок скриншота
// Задача 16 (видел на одном из собесов, решил иначе)

function foo(x, cb) {
    setTimeout(() => cb(x + 1), 10);
}

function bar(x, cb) {
    setTimeout(() => cb(x + 20), 10);
}

function fri(x, cb) {
    setTimeout(() => cb(x * 2), 10);
}

const fns = [foo, bar, fri];

const addCallBack = (cb1, cb2) => (x) => cb1(x, cb2);

const series = ([...fns], x, cb) => fns.shift()(x, fns.reduceRight((acc, fn) => addCallBack(fn, acc), cb));

series(fns, 4, console.log);

// Задача 17 (видел на одном из собесов, решил иначе)

const flatten = (deepArray) => deepArray.reduce((acc, item) => typeof item === 'number' ? [...acc, item] : [...acc, ...flatten(item)], []);

console.log(flatten([1, 2, [3, 4, [5, 6], 7], 8]));

// Задача 18 (последовательный вызов)

const urls = [
    'http://api/v1/1',
    'http://api/v1/2',
    'http://api/v1/3',
    'http://api/v1/4',
    'http://api/v1/5'
];

function myFetch(url) {
    const time = Math.floor(Math.random() * 5) + 1;
    console.log(`start make request for url ${url} with time ${time}`);
    return new Promise(resolve => {
        setTimeout(() => {
        console.log(`end make request for url ${url} with time ${time}`);
        resolve(url.slice(-1));
        }, time * 1000);
    })
}

const call = urls => new Promise(resolve => {
    let result = [];

    const addCall = url => myFetch(url).then(res => {
        result.push(res);
        return urls[0] ? addCall(urls.shift()) : resolve(result);
    });

    return addCall(urls.shift());

})

call(urls).then(console.log);
