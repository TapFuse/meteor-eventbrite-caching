var eventbrite = new EventbriteApi({
        token: '' //eventbrite app token
});

var event = eventbrite.events(''); //event, that's tracked, id

//Insert used to cache tweets from stream.
var wrappedAttendeeInsert = Meteor.bindEnvironment(function(attendee) {
  tp_eventbriteCache.upsert(attendee.order_id, {
  "_id": attendee.order_id,
  "team": attendee.team,
  "id": attendee.id,
  "changed": attendee.changed,
  "created": attendee.created,
  "quantity": attendee.quantity,
  "profile": attendee.profile,
  "barcodes": attendee.barcodes,
  "answers": attendee.answers,
  "costs": attendee.costs,
  "checked_in": attendee.checked_in,
  "cancelled": attendee.cancelled,
  "refunded": attendee.refunded,
  "affiliate": attendee.affiliate,
  "status": attendee.status,
  "event_id": attendee.event_id,
  "order_id": attendee.order_id,
  "ticket_class_id": attendee.ticket_class_id
}, function(err, res) {
    if (err) {
      console.log(err);
    }
  });
}, "Failed to insert tweet into tp_eventbriteCache collection.");

//Catch-up
Meteor.startup(function () {
	//code for catching up with tickets bought before the app started receiving webhooks
	event.attendees().list().then(function (data) {
		for(attendee in data.attendees) {
		  event.attendees(data.attendees[attendee].id).info(function (err, attendeeData) {
				// `attendeeData` is the attendee details
				wrappedAttendeeInsert(attendeeData);
			});
	  }
	}, function (err) {
	  console.log(err);
	});
});

Meteor.methods({
  webhookNewAttendee: function(data) {
  	// event.attendees(data.config.user_id).info(function (err, attendeeData) {
  	// 	wrappedAttendeeInsert(attendeeData);
  	// })
  	console.log(data);
  },
});