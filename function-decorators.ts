function LogCalls(logMessage: string) {
  return function (
    //target gives access to the prototype chain of the parent object
    target: any,
    // propertyKey gives access to the name of the property being decorated
    propertyKey: string,
    // descriptor gives access to the properties that describe the function being decorated
    // descriptor.value gives access to the function itself
    descriptor: PropertyDescriptor
  ) {
    const ogMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`${logMessage} ${propertyKey} ${args}`);
      return ogMethod.apply(this, args);
    };
  };
}

function ReadOnly(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  descriptor.writable = false;
}

class Tool {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @LogCalls("Logging calls to")
  price() {
    console.log("$200.00");
  }

  @ReadOnly
  @LogCalls("Logging calls to")
  print() {
    console.log(`Tool: ${this.name}`);
  }
}

const tool = new Tool("Hammer");
tool.print();
tool.price();

// has no effect since the property has been marked as read only
// using the ReadOnly decorator which sets the writable property to false
tool.print = function () {
  console.log("Overwrite print");
};
tool.print();
