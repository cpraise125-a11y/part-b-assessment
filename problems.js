                     // problem 1: Deep Equality heck
function deepEqual(objA, objB) {
if (objA ===objB) return true;
if (typeof objA !== "object" || typeof objB !=="object" || objA === null || objB === null) return false; 
const keysA = Object.keys(objA);
const keysB = Object.keys(objB);
if (keysA.length !== keysB.length) return false;
for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(objA[key], objB[key])) return false;
}
return true;
}
console.log(deepEqual({a: 1,b: {c: 2} }, {a: 1, b: {c: 2} } ));
console.log(deepEqual({a: 1, b: {c: 2} }, {a: 1, b: {c: 3} } ));
console.log(deepEqual({a: 1}, {a: 1, b: 2}));


                        // problem 2: Object Difference
function diffObjects(oldObj, newObj) {
    const result = { added: {}, removed: {}, changed: {} };
    for (const key of Object.keys(newObj)) {
        if (!(key in oldObj)) result.added[key] = newObj[key];
    }
    for (const key of Object.keys(oldObj)) {
        if (!(key in newObj)) result.removed[key] = oldObj[key];
        else if (oldObj[key] !==newObj[key]) {
            result.changed[key] = { from: oldObj[key], to: newObj[key] };
        }
    }

    return result;
}
console.log(diffObjects(
    {name: "Setemi", role: "Engineer", country: "Jamaica"},
    {name: "Setemi", role: "Senior Engineer", city: "Kingston"}
))

             // Problem 3: Deep Freeze
function deepFreeze(obj) {
    Object.values(obj).forEach((value) => {
        if (typeof value === "object" && value !== null) {
            deepFreeze(value);
        }
    });
    return Object.freeze(obj);
}
const frozen = deepFreeze({a: 1, b: { c: 2 }});
frozen.b.c = 99;
console.log(frozen.b.c);
console.log(Object.isFrozen(frozen.b));


            // Problem 4: Private counter Factory
function createCounter() {
    let count = 0;
    return {
        increment() { count++; },
        decrement() { count--;},
        get value() { return count; } 
    };
}
const counter = createCounter();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.value);
console.log(counter.count);

         // Problem 5: Schema Validator
function validateSchema(obj, schema) {
const errors = [];
for (const [key, type] of Object.entries(schema)) {
    if (!Object.hasOwn(obj, key)) {
        errors.push( `${key}: missing property` );
    } else if (typeof obj[key] !== type) {
        errors.push(`${key}: expected ${type}, got ${typeof obj[key]}`);
     }
    }
    return errors;
}
const  schema = { name: "string",age: "number", isAdmin: "boolean"};
console.log(validateSchema({ name: "Ada", age: 21, isAdmin: false}, schema));
console.log(validateSchema({ name: "Ada", age: "21"}, schema));