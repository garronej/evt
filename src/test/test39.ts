
import { Evt, ToNonPostableEvt } from "../lib";
import { id, assert } from "../tools/typeSafety";

type Person = {
    name: string;
    age: number;
};

type PersonChange = Readonly<{
    eventType: "NEW" | "DELETE";
    person: Person;
} | {
    eventType: "UPDATE";
    field: "name" | "age";
    person: Person;
}>;

let acc = "";

const startUi = (() => {

    const createPersonLogger = <T extends string>(
        { person, evtFieldChange }: {
            person: Readonly<Person>;
            evtFieldChange: ToNonPostableEvt<Evt<T>>;
        }
    ) => evtFieldChange.attach(
        field => acc += `${person.name} ${field} changed\n`
    );

    return ({ evtPersonChange }: { evtPersonChange: ToNonPostableEvt<Evt<PersonChange>> }) =>
        evtPersonChange.$attach(
            personChange => personChange.eventType === "NEW" ?
                [personChange.person] : null,
            person => createPersonLogger({
                person,
                "evtFieldChange": evtPersonChange.pipe(
                    personChange => personChange.person !== person ?
                        null
                        :
                        (() => {
                            switch (personChange.eventType) {
                                case "NEW": return null;
                                case "UPDATE": return [personChange.field] as const;
                                case "DELETE": return "DETACH";
                            }
                        })()
                )
            })
        )
        ;



})();

const updateModelFactory = (
    { postPersonChange, handlerHandlingEventCount }: {
        postPersonChange(personChange: PersonChange): void;
        handlerHandlingEventCount(personsChange: PersonChange): number;
    }
) => {

    const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(()=>resolve(), ms));

    const updateModel = async (person: Person): Promise<void> => {

        {

            const personChange: PersonChange = {
                "eventType": "NEW",
                person
            };

            console.assert(handlerHandlingEventCount(personChange) === 1);

            postPersonChange(personChange);

            console.assert(handlerHandlingEventCount(personChange) === 1);

        }

        await sleep(30);

        {

            person.age++;

            const personChange: PersonChange = {
                "eventType": "UPDATE",
                "field": "age",
                person
            };

            console.assert(handlerHandlingEventCount(personChange) === 1);

            postPersonChange(personChange);

            console.assert(handlerHandlingEventCount(personChange) === 1);

        }

        await sleep(20);

        {

            person.name += " (verified)";

            const personChange: PersonChange = {
                "eventType": "UPDATE",
                "field": "name",
                person
            };

            console.assert(handlerHandlingEventCount(personChange) === 1);

            postPersonChange(personChange);

            console.assert(handlerHandlingEventCount(personChange) === 1);

        }


        await sleep(40);

        {

            const personChange: PersonChange = {
                "eventType": "DELETE",
                person
            };


            console.assert(handlerHandlingEventCount(personChange) === 1, "here???");

            postPersonChange(personChange);

            console.assert(handlerHandlingEventCount(personChange) === 0, "here?");

        }

    };

    return { updateModel };


};

(function main() {

    const evtPersonChange = new Evt<PersonChange>();

    startUi({ evtPersonChange });

    const { updateModel } = updateModelFactory({
        "postPersonChange": personChange => evtPersonChange.post(personChange),
        "handlerHandlingEventCount": personChange =>
            evtPersonChange
                .getHandlers()
                .filter(({ op }) => { 
                    assert(typeof op === "function");
                    return !!op(personChange); 
                })
                .length
    });

    Promise.all(
        id<[string, number][]>([
            ["Alice", 55],
            ["Bob", 12],
            ["Louis", 15],
            ["John", 44],
            ["Paul", 33]
        ]).map(([name, age]) => updateModel({ name, age }))
    ).then(() => {

        //The only remaining handler is the one listening for new person.
        console.assert(evtPersonChange.getHandlers().length === 1);

        console.assert(
            acc ===
            [
                "Alice age changed",
                "Bob age changed",
                "Louis age changed",
                "John age changed",
                "Paul age changed",
                "Alice (verified) name changed",
                "Bob (verified) name changed",
                "Louis (verified) name changed",
                "John (verified) name changed",
                "Paul (verified) name changed",
                ""
            ].join("\n")
        );

        console.log("PASS");

    });

})();

