let user = {
    name: "Jimin",
    sizes: {
        height: 174,
        weight: 60
    },
}
let clone = structuredClone(user);
alert(user.sizes===clone.sizes); // false, because clone is a deep copy

user.sizes.weight= 62;
alert(clone.sizes.weight); // 60, because clone is a deep copy
// The structuredClone function creates a deep copy of the user object


user1 = {}; 
user1.me = user1; //->  user1 = { me: user1 }
let clone1 = structuredClone(user1); //structuredClone can handle primitive values, arrays, objects, and circular reference. Cant handle functions, DOM nodes, and some other types.
alert(clone1.me === clone1); // true

//OOP start
//Objects are having properties and methods
const car = {
    brand: "Hyundai",
    speed: 200,
    drive() {
        alert(`Driving at ${this.speed} km/h`);
    }
}
car.drive(); // Driving at 200 km/h
//Constructor function
function Animal(name){
    this.name = name;
    //this.speak = function(){
        //console.log(`${this.name} makes a noise`);
    //}
}
Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise`);
}
const dog = new Animal("Dog"); //-> step by step that looks like this:
//let obj = {};
//obj.__proto__ = Animal.prototype; // This sets the prototype of obj to Animal.prototype
//Animal.call(obj, "Dog"); // This calls the Animal constructor with obj as the context
dog.speak();

function Person(name){
    this.name = name;//-> person.name = name
}
const person = new Person('Jungkook');
console.log(person.name); //-> Jungkook

const cat1 = new Animal("Posay");
const cat2 = new Animal("Mimi");
console.log(cat1.speak === cat2.speak); //false, because each instance has its own speak method

//task 1 
function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}
Book.prototype.getSummary = function() {
    return `${this.title} was written by ${this.author} in ${this.year}`;
}
Book.prototype.isValidYear = function() {
    if (this.year > 0 && this.year <= new Date().getFullYear()) {
        console.log("Book year is valid.");
        return true;
    }
    else{
        console.log("Book year is invalid. Please enter a valid year.");
        return false;
    }
}
Book.prototype.getAge = function(){
    const currentYear = new Date().getFullYear;
    return `${this.title} is ${currentYear - this.year} years old`;
}
Book.prototype.changeTitle = function(newTitle) {
    this.title = newTitle;
}

const book1 = new Book("1984", "George Orwell", 1949);

console.log(book1.isValidYear()); // true
console.log(book1.getSummary()); // 1984 was written by George Orwell in 1949
console.log(book1.getAge()); // 1984 is 74 years old (assuming current year is 2023)

book1.changeTitle("Animal Farm");
console.log(book1.getSummary()); // Animal Farm was written by George Orwell in 1949

//classes

class Person
{
    constructor(name, age){
        this.name = name;
        this.age = age;
    } // constructor is a special method for creating and initializing an object created with a class.
    introduce()
    {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    } // introduce is a method that can be called on instances of the Person class.
}
const student = new Person("Jin", 25);
student.introduce(); // Hello, my name is Jin and I am 25 years old.
console.log(student.introduce === Person.prototype.introduce); // true, because introduce is a method of the Person class

//extending classes
class Animal {
    constructor(name){
        this.name = name;
    }
    speak(){
        console.log(`${this.name} makes a noise`);
    }
}
class Dog extends Animal{
    constructor(name, breed){
        super(name); // Calls the constructor of the parent class (Animal)
        this.breed = breed;
    }
    speak(){
        console.log(`${this.name} barks`);
    }
}
const dog1 = new Dog("Max", "Pug");
dog1.speak(); // Max barks

console.log(dog1 instanceof Dog); // true, because dog1 is an instance of Dog
console.log(dog1 instanceof Animal); // true, because Dog extends Animal
console.log(dog1 instanceof Object); // true, because all objects in JavaScript are instances of Object

//task 2
class User{
    constructor(name, email, age){
        this.name = name;
        this.email = email;
        this.age = age;
    }
    getDetails(){
        return `${this.name} (${this.email}) is ${this.age} years old.`;
    }
}
class Admin extends User{
    constructor(name, email, age, permissions){
        super(name, email, age);
        this.permissions = permissions;
    }
    getDetails(){
        return `${super.getDetails()} Admin permissions: ${this.permissions.join(", ")}`;
    }
    deleteUser(user){
        console.log(`${this.name} deleted user ${user.name}`);
    }
    viewUser(user) {
        console.log(`${this.name} viewed user ${user.name}: ${user.getDetails()}`);
    }
}
const user1 = new User("John", "example@gmail.com", 30);
const user2 = new User("Will", "example2@gmail.com", 30);
user1.getDetails();
user2.getDetails();
const admin = new Admin("Mike Jn.", "admin.gmail.com", 35, ["delete", "view"]);
console.log(admin.getDetails());
admin.viewUser(user1);
admin.deleteUser(user1); // Mike Jn. deleted user John

admin.viewUser(user2);

console.log(admin instanceof Admin); 
console.log(admin instanceof User); 
console.log(admin instanceof Object);
console.log(user1 instanceof User);   
console.log(user1 instanceof Admin); 
console.log(user1 instanceof Object); 
console.log(user2 instanceof User);   
console.log(user2 instanceof Admin); 
console.log(user2 instanceof Object); 



////POLYMORPHISM////
class Animal1{
    constructor(name){
        this.name = name;
    }
    speak(){
        console.log(`${this.name} makes a noise`);
    }
}
class Cat1 extends Animal1{
    speak(){
        console.log(`${this.name} meows`);
    }
}
class Dog1 extends Animal1{
    speak(){
        console.log(`${this.name} barks`);
    }
}
function makeSound(animal) {
    animal.speak();
}


////ABSTRACTION////
class Car1 {
    startEngine(){
        console.log(`Engine started`);
    }
    drive(){
        console.log(`Car is driving`);
    }
}
const myCar = new Car1();
myCar.startEngine();
myCar.drive();


////INCAPSULATION//
//easily, incapsulation is the concept of restricting access to certain properties or methods of an object, allowing only controlled access through public methods. This helps in maintaining the integrity of the data and preventing unintended modifications.
class BankAccount{
    #balance = 0; // private field, accessible only within the class
    deposit(amount){
        if(amount > 0){
            this.#balance += amount;
            console.log(`Deposited: $${amount}. New balance: $${this.#balance}`);
        } else {
            console.log("Deposit amount must be positive.");
        }
    }
    getBalance(){
        return this.#balance;
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.#balance) {
            this.#balance -= amount;
            console.log(`Withdrew: $${amount}. New balance: $${this.#balance}`);
        } else if (amount > this.#balance) {
            console.log("Insufficient funds.");
        } else {
            console.log("Withdrawal amount must be positive.");
        }
    }
}
const account = new BankAccount();
account.deposit(100); // Deposited: $100. New balance: $100
console.log(`Current balance: $${account.getBalance()}`); // Current balance: $100
//account.#balance = 500; // Error: Cannot access private field #balance from outside the class
account.withdraw(50); // Withdrew: $50. New balance: $50
console.log(`Current balance: $${account.getBalance()}`); // Current balance: $50
account.withdraw(100); // Insufficient funds.
