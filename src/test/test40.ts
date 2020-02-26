
import { race } from "../lib/util/race";
import { typeGuard } from "../tools/typeSafety"
import { VoidEvt, Evt } from "../lib/index";

const evtDisconnect = new VoidEvt();
const evtPacket = new Evt<{
    type: "MESSAGE";
    payload: Uint8Array;
} | {
    type: "CALL";
    id: string;
}>();

const prError = new Promise<void>(() => { });

const uint8Array = new Uint8Array(19);

{

    let payload1: Uint8Array;

    race([
        prError,
        evtDisconnect,
        evtPacket
    ]).$attachOnce(
        o => o.i === 2 ?
            (
                o.data.type === "MESSAGE" ?
                    [o.data.payload]
                    :
                    null
            )
            :
            [undefined],
        payload => payload1 = payload!
    );

    let payload2: Uint8Array;

    race([
        prError,
        evtDisconnect,
        evtPacket
    ]).waitFor(o =>
        o.racer === prError || o.racer === evtDisconnect ?
            [undefined] :
            (
                !typeGuard.dry<void>(o.data, false) &&
                    o.data.type === "MESSAGE" ?
                    [o.data.payload]
                    :
                    null
            ),
        1000
    )
        .catch(() => undefined)
        .then(payload =>
            payload2 = payload!
        )
        ;


    evtPacket.post({
        "type": "CALL",
        "id": "az23ds"
    });

    evtPacket.post({
        "type": "MESSAGE",
        "payload": uint8Array
    });

    console.assert(payload1! === uint8Array);

    setTimeout(() => {
        console.assert(payload2! === uint8Array);
        console.log("PASS".green);
    }, 100);



}




