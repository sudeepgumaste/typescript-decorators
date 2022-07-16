function PropertyDecorator(target: any, propertyKey: string) {
  let value: string;

  const getter = () => {
    console.log(`Reading ${propertyKey}... | value: ${value}`);
    return value;
  };

  const setter = (newVal: string) => {
    console.log(`Setting ${propertyKey}... | value: ${newVal}`);
    value = newVal;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
}

class Test {
  @PropertyDecorator
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  printName() {
    console.log(`Name: ${this.name}`);
  }
}

const test = new Test("test");
test.printName();
test.name = "test2";
