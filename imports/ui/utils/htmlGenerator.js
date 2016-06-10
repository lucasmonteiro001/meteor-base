import './jt2html'

class htmlGenerator {
    constructor() {
    }

    fieldsGen(mySchema) {
        

    }

}
let result = JT2html(
    {
        body: "@{title}:@{list}",
        title: "@{text}",
        list: "[@{name}]: @{des} ... ",
    }
).fromJson([
    {
        "type":"title",
        "text":"JT2HTML DEMO 1"
    },
    {
        "type":"list",
        "name":"hello1",
        "des":"1234567890"
    },
    {
        "type":"list",
        "name":"hello2",
        "des":"ABCD"
    }
]);

console.log(result);