Template.postItem.helpers({
  ownPost: function () {
    'use strict';
    return this.userId === Meteor.userId();
  },
  domain: function () {
    'use strict';
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  commentsCount: function () {
    'use strict';
    return Comments.find({postId: this._id}).count();
  },
  upvotedClass: function () {
    'use strict';
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  }
});

Template.postItem.events({
  'click .upvotable': function (e) {
    'use strict';
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});
