var root = document.body;
var items = [
  {author: "user1", votes: 500, text: "test post pls ignore"},
  {author: "user2", votes: 400, text: "test post pls ignore too"},
  {author: "user3", votes: 300, text: "test post pls ignore three"},
];

function clickHandler(action) {
  console.log("clicked", action);
}

function makeList(items) {
  return m(".list-group",
    items.map(item => m(".list-group-item", m(".row", [
      m(".col-md-1", {style: "display:block; text-align:center"}, [
        m("a", {onclick: ()=>clickHandler("up")}, m("i.text-center.glyphicon.glyphicon-triangle-top[aria-hidden=true]", {style: "opacity:0.7"})),
        m("div", item.votes),
        m("a", {onclick: ()=>clickHandler("down")}, m("i.text-center.glyphicon.glyphicon-triangle-bottom[aria-hidden=true]", {style: "opacity:0.7"}))
      ]),
      m(".col-md-11", [
        m("h4.list-group-item-heading", item.text),
        m("p.list-group-item-text", `by ${item.author}`)
      ])
    ])))
  );
}

var Main = {
  view: function() {
    return m(".container", [
      m(".row", m(".col-md-3", m(".page-header", m("h1", "Diggit")))),
      m(".row",
        m(".col-md-12",
          m(".panel.panel-default", [
            m(".panel-heading", "Posts"),
            makeList(items)
          ])
        )
      )
    ]);
  }
};

m.mount(root, Main);