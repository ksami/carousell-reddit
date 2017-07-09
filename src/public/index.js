var root = document.body;
var items = [
  {id: "1", author: "user1", votes: 500, text: "test post pls ignore"},
  {id: "2", author: "user2", votes: 400, text: "test post pls ignore too"},
  {id: "3", author: "user3", votes: 300, text: "test post pls ignore three"},
];

function request(action, data) {
  const baseUrl = "/api/v1";
  let opts = {};

  switch(action) {
    case "getList": opts = {method: "GET", url: `${baseUrl}/topics`}; break;
    case "create": opts = {method: "POST", url: `${baseUrl}/topics/create`, data}; break;
    case "upvote": opts = {method: "POST", url: `${baseUrl}/topics/${data.id}/vote`, data}; break;
    case "downvote": opts = {method: "POST", url: `${baseUrl}/topics/${data.id}/vote`, data}; break;
  };

  m.request(opts).then(console.log);
}

function makeList(items) {
  return m(".list-group", {oninit: ()=>request("getList")},
    items.map(item => m(".list-group-item", m(".row", [
      m(".col-md-1", {style: "display:block; text-align:center"}, [
        m("a", {onclick: ()=>request("upvote", {id: item.id})}, m("i.text-center.glyphicon.glyphicon-triangle-top[aria-hidden=true]")),
        m("div", item.votes),
        m("a", {onclick: ()=>request("downvote", {id: item.id})}, m("i.text-center.glyphicon.glyphicon-triangle-bottom[aria-hidden=true]"))
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