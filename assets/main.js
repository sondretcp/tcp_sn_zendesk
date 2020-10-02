$(function () {
    var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '200px' });

    client.on('ticket.save', () => {


        client.get('ticket.id').then((result) => {

            let ticketID = result['ticket.id'];

            // Get all ticket fields
            let options = {
                url: '/api/v2/tickets/' + ticketID + '.json',
                type: 'GET',
                cors: false
            };

            client.request(options).then((resultJSON) => {

                // Check for SN reference
                let refSN = resultJSON.ticket.custom_fields[0].value;

                if (refSN == '') {

                    // Create new SN ticket
                    var requestBody = "{\"short_description\":\"" + resultJSON.ticket.raw_subject + "\",\"description\":\"" + resultJSON.ticket.description + "\",\"work_notes\":\"NEW TICKET FROM ZENDESK\"}";

                    // let mOptions = {
                    //     url: 'https://dev92686.service-now.com/api/now/table/incident',
                    //     type: 'POST',
                    //     dataType: 'json',
                    //     contentType: 'application/json',
                    //     data: JSON.stringify(requestBody),
                    //     headers: {"Authorization": "admin:Test1234"},
                    //     cors: true

                    // };

                    // client.request(mOptions).then((mResultJSON) => {

                    //     console.log(mResultJSON);

                    // })

                    
                    var client=new XMLHttpRequest();
                    client.open("post","https://dev92686.service-now.com/api/now/table/incident");
                    
                    client.setRequestHeader('Accept','application/json');
                    client.setRequestHeader('Content-Type','application/json');
                    
                    //Eg. UserName="admin", Password="admin" for this code sample.
                    client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'Test1234'));
                    
                    client.onreadystatechange = function() { 
                        if(this.readyState == this.DONE) {
                            document.getElementById("response").innerHTML=this.status + this.response; 
                        }
                    }; 
                    client.send(requestBody);


                } else {



                }

            });

        });

    });

});

// function getTicketFields(mClient, ticketID) {

//     let options = {
//         url: '/api/v2/tickets/' + ticketID + '.json',
//         type: 'GET',
//         cors: false
//     };

//     let result = mClient.request(options).then((resultJSON) => {

//         ticket = resultJSON['ti']
//     });

// }

// function ticketSubmitCallback(mClient) {

//     console.log("TEST 0");

//     mClient.get('ticket.customField:custom_field_360010508498').then(function (data) {

//         if (data['ticket.customField:custom_field_360010508498'] == '') {


//             mClient.get('ticket.id').then(function(data) {

//                 let ticketFields = await getTicketFields(mClient, data['ticket.id']);

//                 console.log("FIELDS: " + ticketFields);

//             })

//             var json = { "ticket": { "custom_fields": [{ "id": "360010508498", "value": "TEST SN" }] } };

//             mClient.get('ticket.id').then(function (data) {

//                 let options = {
//                     url: '/api/v2/tickets/' + data['ticket.id'] + '.json',
//                     type: 'PUT',
//                     dataType: 'json',
//                     contentType: 'application/json',
//                     data: JSON.stringify(json),
//                     cors: false
//                 };

//                 mClient.request(options).then((results) => {
//                     console.log("Example 1 call results:", results);
//                 });

//             });


//         } else {

//             console.log("SN REF FILLED");

//             mClient.get('ticket.customField:custom_field_360010508498').then(function (data) {

//                 console.log("REF NUM: " + data['ticket.customField:custom_field_360010508498']);
//             });

//         }

//     });

// }