Router.route('/restful', {where: 'server'})
.post(function () {
  Meteor.call('webhookNewAttendee', this.request.body);
});