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
            temp = (-273.15 + res.main.temp).toFixed(2);
	    $("#weather").text("Estado del cielo: "+res.weather[0].description.toUpperCase());
	    $("#forecast").text("Pronostico ciduad de "+ res.name).show();
      $("#temperature").text("Temperatura: "+ temp + " C").show();
	    $("#humidity").text("Humedad: "+ res.main.humidity).show();

      var ico=$(".icon");
      var iconCode = res.weather[0].icon;
       iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
       ico.attr("src",iconUrl);

          

    },
     
    addCity : function(){
      cont++;
      console.log(cont);
      if(cont<10){
         city="Punta Arenas";
         var x=$(".others");
         //console.log(x.length);
         $(".others").each(function (index) 
        { 
          
          /*  $(this).removeClass();
            $(this).addClass("parrafo"); 
            $(this).text('Parrafo ' + index);*/
        }) 
  
         app.getWeather(cities[cont],function(res){
             var newP = $("<p>"); 
             temp = (-273.15 + res.main.temp).toFixed(2);
             var ico=$(".icon");
             var iconCode = res.weather[0].icon;
             iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
             newP.html(res.name+"&nbsp; &nbsp; &nbsp; "+temp+" &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img src='"+iconUrl+"'>").addClass("others");

            $("#others-cities").append(newP);
            $("#others-cities").animate({ scrollTop: $('#others-cities')[0].scrollHeight}, 1000);
        });
         
      }
      else
        cont=-1;
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
var cont=-1;
app.events();
setInterval(app.addCity, 3000);
cities = new Array(9);
cities[0] = "Santiago";
cities[1] = "Aldridge";
cities[2] = "Paris";
cities[3] = "Tokyo";
cities[4] = "Roma";
cities[5] = "Lima";
cities[6] = "Buenos Aires";
cities[7] = "Mexico";
cities[8] = "Madrid";


