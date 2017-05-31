/**
 * Created by rishi on 5/31/17.
 *
 * To handle the file operations to save and fetch the messages with ID
 */

var fs = require('fs');

exports.getMessage = function(id, callback) {

    fs.readFile('./message_store.json', 'utf-8', function(err, data) {
        if (err){
            console.log('Error reading the file' + err);
            callback(err, null);
        }
        var arrayOfMessages = JSON.parse(data).messages;
        var message = null;
        for(var i=0; i<arrayOfMessages.length; i++){
            if(arrayOfMessages[i].id == id){
                message = arrayOfMessages[i].message;
            }
        }
        callback(null, message);
    });
};

exports.saveMessage = function(message, id, callback) {

    fs.readFile('./message_store.json', 'utf-8', function(err, data) {
        if (err){
            console.log('Error reading the file' + err);
            callback(err);
        }
        var arrayOfMessages = JSON.parse(data);

        arrayOfMessages.messages.push({
            message: message,
            id: id
        });

        console.log(arrayOfMessages);

        fs.writeFile('./message_store.json', JSON.stringify(arrayOfMessages), 'utf-8', function(err) {
            if (err){
                console.log('Error writing the file' + err);
                callback(err);
            }
            console.log('Done!');
            callback(null);
        })
    })
};
