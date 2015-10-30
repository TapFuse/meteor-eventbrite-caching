Router.route('/restful', {where: 'server'})
.post(function () {
  Meteor.call('webhookNewAttendee', this.request.body);
  this.response.statusCode = 200;
  this.response.end('Success!');
});