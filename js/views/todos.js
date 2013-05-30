var app = app || {};

app.TodoView = Backbone.View.extend({

  tagName: 'li',

  template: _.template( $('#item-template').html() ),

  events: {
    'dblclick label' : 'edit',
    'keypress .edit' : 'updateOnEnter',
    'blur .edit' : 'close',
    'click .destroy' : 'clear',
    'click .toggle' : 'toggleCompleted'
  },

  // The TodoView listens for changes to its model, re-rendering. Since there's
  // a one-to-one correspondence between a **Todo** and a **TodoView** in this
  // app, we set a direct reference on the model for convenience

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  // Re renders the titles of the todo item

  render: function() {
    this.$el.html( this.template( this.model.toJSON() ) );
    this.$input = this.$('.edit');
    return this;
  },

  // Switch this view into 'editing' mode, displaying the text field

  edit: function() {
    this.$el.addClass('editing');
    this.$input.focus();
  },

  //  Close the editing mode, saving the Todo
  close: function() {
    var value = this.$input.val().trim();

    if ( value ) {
      this.model.save({ title: value });
    }

    this.$el.removeClass('editing');
  },

  // If you hit 'enter', we're through editing the item
  updateOnEnter: function( e ) {
    if ( e.which === ENTER_KEY ) {
      this.close();
    }
  },

  toggleVisible: function() {
    this.$el.toggleClass('hidden', this.isHidden());
  },

  isHidden: function() {
    var isCompleted = this.model.get('completed');
    return (
      (!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active')
    );
  },

  toggleCompleted: function() {
    this.model.toggle();
  },

  clear: function() {
    this.model.destroy();
    this.$el.remove();
  }



});