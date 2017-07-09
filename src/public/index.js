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
  console.log(action, opts);
  m.request(opts).then(res => processData(action, res));
}

function processData(action, data) {
  console.log(action, data);
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

function makeModal() {
  return m(".modal.fade[aria-labelledby='createTopicModalLabel'][id='createTopicModal'][role='dialog'][tabindex='-1']",
    m(".modal-dialog[role='document']",
      m(".modal-content",
        m(".modal-header",
          m("button.close[aria-label='Close'][data-dismiss='modal'][type='button']", m("span[aria-hidden='true']", m.trust("&times;"))),
          m("h4.modal-title[id='createTopicModalLabel']", "Create Topic")
        ),
        m(".modal-body",
          m(Form)
        )
      )
    )
  );
}

var Form = {
  username: "",
  text: "",
  validUsername: true,
  validText: true,

  submit: function() {
    this.validUsername = this.username !== "";
    this.validText = this.text !== "";

    if(!this.validUsername || !this.validText) {
      m.redraw();
    } else {
      request("create", {
        username: this.username,
        text: this.text
      });
    }
  },

  view: function(vnode) {
    return m("form",
      m(".form-group", {class: vnode.state.validUsername ? "" : "has-error"},
        m("label.control-label[for='usernameInput']", "Username"),
        m("input.form-control[id='usernameInput'][type='text']", {
          value: vnode.state.username,
          onchange: e => vnode.state.username = e.currentTarget.value
        })
      ),
      m(".form-group", {class: vnode.state.validText ? "" : "has-error"},
        m("label.control-label[for='textInput']", "Text"),
        m("input.form-control[id='textInput'][type='text']", {
          value: vnode.state.text,
          onchange: e => vnode.state.text = e.currentTarget.value
        })
      ),
      m("button.btn.btn-primary[type='button']", {onclick: vnode.state.submit.bind(vnode.state)}, "Submit")
    );
  }
}

var Main = {
  view: function() {
    return m("div", makeModal(), m(".container", [
      m(".row",
        m(".col-md-12", m(".page-header", m("h1", "Diggit")))
      ),
      m(".row", {style: "padding-bottom:15px;"},
        m(".col-md-3.col-md-offset-9", m("button.btn.btn-primary.btn-lg.pull-right[type=button][data-toggle=modal][data-target=#createTopicModal]", "Create Topic"))
      ),
      m(".row",
        m(".col-md-12",
          m(".panel.panel-default", [
            m(".panel-heading", "Posts"),
            makeList(items)
          ])
        )
      )
    ]));
  }
};

m.mount(root, Main);