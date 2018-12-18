// console.log("sanity Check");



// EVERYTHING HAS TO BE INSIDE BELOW IN ORDER FOR OUR JQUERY and JAVASCRIPT TO LOAD CORRECTLY FROM INDEX.html
$(document).ready(()=>{  //THIS CODE WILL NOT RUN UNTIL THE DOM IS READY.
// The dom is now loaded, go get them JS!
    // const stockForm=document.querySelectoruerySelector('.stock-form');
    // console.log(stockForm);
    $('.stock-form').submit((event)=>{
        event.preventDefault()


        //adding button action from jquery
        $( ".btn" ).toggle( "pulsate", {}, 500, function(){
            $( ".btn" ).show()  //starting at function, we are asking the pulsate to change back to the on postion 
            // instead of disappearing like the toggle function usually calls.
        });
        //stop the broweser from sending the form to another page            
        console.log(event);
            //.val() is jquery
        const symbol=$('#symbol').val();
        $('#symbol').val('');
        console.log(symbol);
    // HOW CAN WE MAKE AN ARRAY OUT OF A STRING BASED ON WHERE THE , ARE?
        const symbols = symbol.split(',')
            // console.log(symbols);
            //example for symbols
        symbols.forEach((s)=>{
            s=s.trim();
                
        


        // An endpoint is a web accessible URL that responds with Data
        // OUR INPUT:
            const url = `https://api.iextrading.com/1.0/stock/${s}/quote`
        // each section of a date is it's own object. so the [3] would be the 4th one listed.
        // now how do we get javascript to go out and get the info from this site.

        // get JSON takes two Args   
        // 1. where to get the JSON
        // 2. Function to run when I'm back...

            $.getJSON(url, (theDataJSFoundIfAny)=>{
                // console.log(theDataJSFoundIfAny)  I took this off but we can add back and read the console.
                // let changeClass = '';
                // if(theDataJSFoundIfAny.change>0){
                //     changeClass = 'positive'
                // }else{
                //     changeClass = 'negative'
                // }
                let changeClass = "";
                if(theDataJSFoundIfAny.change > 0){
                    changeClass= "bg-success";
                } else{
                    changeClass= "bg-danger";
                }
                

                // GO get the thing...
                //you can use .html to get one stock, .append to get a running total and .prepend for the order to reverse
                $('#stock-body').append(` 
                    <tr>
                        <td>${theDataJSFoundIfAny.symbol}</td>
                        <td>${theDataJSFoundIfAny.companyName}</td>
                        <td>${theDataJSFoundIfAny.high}</td>
                        <td>${theDataJSFoundIfAny.low}</td>
                        <td class="${changeClass}">${theDataJSFoundIfAny.change}</td>
                    </tr>
            
                    `)//END APPEND
            });//END GETJSON
        })//END FOR EAH
        $('#stock-table').DataTable();
    })//END SUMBIT HANDLER

})//end document.ready()