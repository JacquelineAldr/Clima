app ={
	
	name: "Clima",
	version: "1.0",

    getWeather : function(city,callback){
    	$.ajax({
	    	url: "http://api.openweathermap.org/data/2.5/weather",
	    	data:{
	    		q: city,
	    		APPID: "34a248e193b26d15391bdf6fc9dae6f8"
	    	},
	    	success: function(res){
	    		if(typeof callback == 'function'){
	    			callback(res);
	    		}   		
	    		else{
	    			return res;
	    		}
	    	}    		
    	});


    },
    showWeather : function(res){
    	console.log(res);
	    $("#weather").text(res.weather[0].description.toUpperCase());
	    $("#forecast").text("Pronostico: "+ res.name).show();
    },

    events: function(){

		$("#send").on("click",function(){
		    var city= $("#city").val();

		    console.log(city);
			app.getWeather(city,function(res){
 				  app.showWeather(res);
               });

		});
        $(document).on("keydown",function(e){
        	if(e.which==27){ //esc
              $("#weather").text("");
              $("#forecast").hide();
              $("#city").val("");
        	}
        	if(e.which ==13){ //enter
               var city= $("#city").val();
               app.getWeather(city,function(res){
 				  app.showWeather(res);
               });
        	}
        });  


    }
}

app.events();
