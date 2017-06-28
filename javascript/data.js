{
	let messagesArray = [];
	let messagesCounter = 1;
	let userArray = [];
	let messages = {}; // or Object.create(null);

	messages.loadStarterJSON = function() {
		// let messagesURL = 'https://nss-chatterbox-app.firebaseio.com/messages.json';
		$.ajax({
			url: 'https://nss-chatterbox-app.firebaseio.com/messages.json'
		})
		.done(dataHandler)
		.fail(errorHandler);
		
		function errorHandler(error) {
			console.log("An error occured while transfering data", error.statusText);
		}

		function dataHandler(data) {
			console.log("data", data);
			data.forEach(function(message) {
				Chatty.messages.createMessage(message, message.name);
			});
		}
	}

	messages.createMessage = function(message, activeUser)
	{
		message.id = messagesCounter;
		let currentTime = new Date();
		message.timeStamp = `${currentTime.toLocaleTimeString()} ${currentTime.toLocaleDateString()}`;  // formats date to readable forms
		message.name = activeUser;
		messagesArray.push(message);
		messagesCounter++;
		Chatty.webpage.createContainerDiv(message.message, message.id, message.timeStamp, activeUser); //puts the default 5 messages on DOM on load.
	}

	messages.getAllMessages = function()
	{
		return messagesArray;
	}

	//deletes message based on the index passed in
	// TODO: need a better way to tie the delete event hander on the button to the message in the private Array
	messages.deleteMessage = function(divId)
	{
		for(i=0; i<messagesArray.length;i++)
			{
				if(divId === messagesArray[i].id)
					{
						var messageIndex = messagesArray.indexOf(messagesArray[i]);
					}
			}
			messagesArray.splice(messageIndex, 1);
	}

	messages.editMessage = function(divId, editedText)
	{
		for(i=0; i<messagesArray.length;i++)
			{
				if(divId === messagesArray[i].id)
					{
						var messageIndex = messagesArray.indexOf(messagesArray[i]);
					}
			}
			messagesArray[messageIndex].message = editedText;
	}

	// messages.populateRadioButtons()
	// {

	// }
	window.Chatty = window.Chatty || {};
	Chatty.messages = messages;
}
