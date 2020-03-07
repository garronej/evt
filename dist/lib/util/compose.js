"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
var encapsulateOpState_1 = require("./encapsulateOpState");
var invokeOperator_1 = require("./invokeOperator");
var Operator_1 = require("../types/Operator");
var id_1 = require("../../tools/typeSafety/id");
function f_o_g(op1, op2) {
    var opAtoB = Operator_1.Operator.fλ.Stateful.match(op1) ?
        encapsulateOpState_1.encapsulateOpState(op1) :
        id_1.id(op1);
    var opBtoC = Operator_1.Operator.fλ.Stateful.match(op2) ?
        encapsulateOpState_1.encapsulateOpState(op2) :
        id_1.id(op2);
    return id_1.id(function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var _b = __read(_a, 3), dataA = _b[0], cbInvokedIfMatched = _b[2];
        var resultB = invokeOperator_1.invokeOperator(opAtoB, dataA, cbInvokedIfMatched);
        if (Operator_1.Operator.fλ.Result.NotMatched.match(resultB)) {
            return resultB;
        }
        var _c = __read(resultB, 1), dataB = _c[0];
        return invokeOperator_1.invokeOperator(opBtoC, dataB, cbInvokedIfMatched);
    });
}
function compose() {
    var ops = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ops[_i] = arguments[_i];
    }
    if (ops.length === 1) {
        var _a = __read(ops, 1), op = _a[0];
        return Operator_1.Operator.fλ.Stateful.match(op) ?
            encapsulateOpState_1.encapsulateOpState(op) :
            op;
    }
    var _b = __read(ops), op1 = _b[0], op2 = _b[1], rest = _b.slice(2);
    var op1_o_op2 = f_o_g(op1, op2);
    if (rest.length === 0) {
        return op1_o_op2;
    }
    return compose.apply(void 0, __spread([op1_o_op2], rest));
}
exports.compose = compose;
/*

opCompose(
    (data: string)=> [ data.length ],
    data => [ `${data}` ]
);

opCompose(
    (data: string)=> true,
    (data)=> [ data.length ],
);

opCompose(
    (data: string)=> [ data.length ],
    (data)=> true,
);
opCompose(
    (data: string)=> true,
    data=> true,
);

opCompose(
    (data: string | number): data is string => true,
    data=> [ data.length ]
);

opCompose(
    (data: string | number | Function ): data is (string | Function) => true,
    (data): data is Function=> true
);

opCompose(
    (data: string | number | Function ): data is (string | Function) => true,
    data => typeof data === "string" ? [ data ] : null
);

opCompose(
    (data: string | number | Function ): data is (string | Function) => true,
    data => true
);

opCompose(
    (data: string | number | Function) => true,
    (data): data is (string | Function) => true,
);

opCompose(
    (data: string) => [ data.length > 3 ? data.length : data ],
    (data): data is string => true,
);


opCompose(
    id<Operator<string,string>>((data: string) => true),
    id<Operator<string, number>>((data: string) => [data.length] as const)
);



opCompose(
    id<Operator<string, string>>(
        (data: string) => true
    ),
    id<Operator.fλ<string, number>>(
        (data) => [data.length]
    ),
    id<Operator.fλ<number, string>>(
        data => [`${data}`]
    )
);

opCompose(
    (data: string)=> [data],
    data => [data],
    data => [data]
);

opCompose(
    (data: string)=> [ data],
    data => [ data ],
    data => [ data ],
    data => [ data ],
    data => [ data ]
);

*/
//# sourceMappingURL=compose.js.map