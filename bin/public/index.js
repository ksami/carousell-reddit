var root = document.body;
var items = [
  {id: "1", author: "user1", votes: 500, text: "test post pls ignore"},
  {id: "2", author: "user2", votes: 400, text: "test post pls ignore too"},
  {id: "3", author: "user3", votes: 300, text: "test post pls ignore three"},
];

function clickHandler(id, action) {
  // m.request({
  //   method: "POST",
  //   url: `/api/v1/topics/${id}/vote`,
  //   data: {action: action}
  // }).then(console.log);
  console.log(id, "clicked", action);
}

function makeList(items) {
  return m(".list-group",
    items.map(item => m(".list-group-item", m(".row", [
      m(".col-md-1", {style: "display:block; text-align:center"}, [
        m("a", {onclick: ()=>clickHandler(item.id, "up")}, m("i.text-center.glyphicon.glyphicon-triangle-top[aria-hidden=true]")),
        m("div", item.votes),
        m("a", {onclick: ()=>clickHandler(item.id, "down")}, m("i.text-center.glyphicon.glyphicon-triangle-bottom[aria-hidden=true]"))
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