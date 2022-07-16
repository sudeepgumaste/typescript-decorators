function ParamDecorator(
  _target: Object,
  propertyName: string,
  parameterIndex: number
) {
  console.log(`${propertyName}, ${parameterIndex}`);
}

class ParamTest {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  printName(@ParamDecorator prefix1: string, @ParamDecorator prefix2: string) {
    console.log(`${prefix1} ${prefix2}: ${this.name}`);
  }
}

const paramTest = new ParamTest("test");
paramTest.printName("Hello", "World");
