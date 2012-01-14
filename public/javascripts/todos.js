(function($) {
  function convertToModels(attrs, model, fn) {
    var models = [];

    for(var i in attrs) {
      var attr = attrs[i];

      if(typeof(attr) != 'object') {
        continue;
      }

      var m = new model(attr);
      if($.isFunction(fn)) {
        fn(m);
      }

      models.push(m);
    }

    return models;
  }

  var Todo = Backbone.Model.extend({
    paramRoot: 'todo',
    url: function() {
      if(this.isNew()) {
        return "/todos";
      }
      else {
        return "/todos/"+this.id;
      }
    },
    complete: function() {
      this.save({complete: true});
    },
    uncomplete: function() {
      this.save({complete: false});
    }
  });

  var Todos = Backbone.Collection.extend({
    model: Todo
  });

  var TodoView = Backbone.View.extend({
    tagName: 'div',
    initialize: function() {
    },
    render: function() {
      var $el = $(this.el);
      $el.empty();

      if(this.model.get('complete') === true) {
        $el.addClass('complete');
      }

      var checkbox = $('<input type="checkbox" />').val(this.model.id);
      checkbox.attr('id', 'checkbox-'+this.model.id);

      var that = this;
      checkbox.click(function() {
        if($(this).is(':checked')) {
          that.model.complete();
          $el.addClass('complete');
          that.trigger('todoComplete', that);
        }
        else {
          that.model.uncomplete();
          $el.removeClass('complete');
          that.trigger('todoIncomplete', that);
        }
      });

      // If the model is complete, do a thing.
      if(this.model.get('complete')) {
        checkbox.attr('checked', true);
      }

      $el.append(checkbox);

      var label = $('<label/>');
      label.text(this.model.get('description'));
      label.attr('for', 'checkbox-'+this.model.id);

      $el.append(label);

      if(this.model.get('complete')) {
        this.trigger('todoComplete', this);
      }
      else {
        this.trigger('todoIncomplete', this);
      }

      return this;
    }
  });

  var NewTodoView = Backbone.View.extend({
    tagName: 'div',
    initialize: function() {

    },
    render: function() {
      var $el = $(this.el);
      $el.addClass('new todo');

      var textbox = $('<input/>').appendTo($el);
      var that = this;
      textbox.keyup(function(e) {
        if (e.keyCode === 13) {
          var val = $(this).val();
          if(val.match(/^\s*$/)) {
            return;
          }

          var model = new Todo({ description: val });
          that.trigger('todoCreated', model);

          $(this).val('');
        }
      });
      return this;
    }
  });

  window.TodoEditorView = Backbone.View.extend({
    initialize: function(models) {
      _.bindAll(this, 'render', 'renderTodo', 'todoCreated', 'todoComplete', 'todoIncomplete');
      this.collection = new Todos(convertToModels(models, Todo));
      this.collection.bind('add', this.renderTodo);

      this.el = $('#todos');
      this.complete = this.el.children('#complete');
      this.incomplete = this.el.children('#incomplete');
    },
    render: function() {
      // Find the empty thing and remove it.
      this.el.children('div.empty').remove();

      // all the models go in the thing.
      _(this.collection.models).each(function(todo) {
        this.renderTodo(todo);
      }, this);

      // The new todo goes after the element.
      var view = new NewTodoView();
      view.bind('todoCreated', this.todoCreated);
      this.incomplete.after(view.render().el);
    },
    renderTodo: function(todo) {
      var view = new TodoView({ model: todo });
      view.bind('todoComplete', this.todoComplete);
      view.bind('todoIncomplete', this.todoIncomplete);
      view.render();

      if(todo.isNew()) {
        todo.save({}, {
          success: function() {
            view.render(); // re-render
          }
        });
      }
    },
    todoCreated: function(todo) {
      this.collection.add(todo);
    },
    todoComplete: function(view) {
      this.complete.append(view.el);
      console.log("Complete");
    },
    todoIncomplete: function(view) {
      this.incomplete.append(view.el);
      console.log("Incomplete");
    }
  });
})(jQuery);
