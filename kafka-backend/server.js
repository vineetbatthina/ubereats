var connection =  new require('./kafka/Connection');

require('./resources.js');

let users = require('./services/users');
let restaurants = require('./services/restaurants');
let customers = require('./services/customers');

const {
    USER_TOPIC, RESTAURANT_TOPIC, CUSTOMER_TOPIC
} = require('./kafka/topics');

function handleTopicRequest(topic_name,fname){

    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

handleTopicRequest(USER_TOPIC, users);
handleTopicRequest(RESTAURANT_TOPIC, restaurants);
handleTopicRequest(CUSTOMER_TOPIC, customers);
