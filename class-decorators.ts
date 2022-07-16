// a class decorator is basically a way to add some functionality to a class
// this takes a function as an argument because a class is  nothing but a function in javascript

// declaring a decorator to set a value for id property in the prototype chain
// this is an example of a simple class decorator.
// it's usually a good practice to use decorator factories instead of simple decorators (see example 2)

// for class decorator function, constructor is passed as the target

// example 1
function IdDecorator(target: Function) {
  target.prototype.id = 10;
}

@IdDecorator
class TestClass1 {
  id: number;

  getId(prefix?: string): string {
    return (prefix || "") + this.id;
  }
}

console.log(new TestClass1().getId("The value of Id is: "));

// the following is an example of a decorator factory
function IdDecoratorFactory(options: { id: string; testVar: string }) {
  // this returned function is a decorator and the target type now can't just be function
  // since the function needs to access the properties in function its type now has to be
  // a function that extends the original class type
  return function (target: Function & typeof TestClass2) {
    target.elementId = options.id;
    // the property added here does not result in the change of class type yet
    // have to use (<any>Object).property to bypass typescript errors
    target.prototype.testVar = options.testVar;
  };
}

@IdDecoratorFactory({ id: "decorator-factory-example", testVar: "test-var" })
class TestClass2 {
  static elementId: string;

  getElementId(prefix?: string): string {
    return (prefix || "") + TestClass2.elementId;
  }
}

const testObject2 = new TestClass2();
console.log(testObject2.getElementId("The value of elementId is: "));
// this will throw an error because the property is not defined in the prototype chain
// console.log(testObject2.testVar);
// have to call it using (<any>Object).property to bypass typescript errors
console.log((<any>testObject2).testVar);
