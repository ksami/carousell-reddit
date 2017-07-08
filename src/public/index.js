var root = document.body;

// var increment = function() {
//     m.request({
//         method: "PUT",
//         url: "//rem-rest-api.herokuapp.com/api/tutorial/1",
//         data: {count: count + 1},
//         withCredentials: true,
//     })
//     .then(function(data) {
//         count = parseInt(data.count)
//     })
// }

var items = [
  {author: "user1", text: "test post pls ignore"},
  {author: "user2", text: "test post pls ignore too"},
  {author: "user3", text: "test post pls ignore three"},
];

function makeList(items) {
  return m("div", {class: "list-group"},
    items.map(item => m("div", {class: "list-group-item"}, [
      m("h4", {class: "list-group-item-heading"}, item.text),
      m("p", {class: "list-group-item-text"}, `by ${item.author}`)
    ]))
  );
}

var Main = {
  view: function() {
    return m(".container", {style: "margin-top:30px"},
      m(".row",
        m(".col-md-12",
          m(".panel.panel-default", [
            m(".panel-heading", "Posts"),
            makeList(items)
          ])
        )
      )
    );
  }
};

m.mount(root, Main);