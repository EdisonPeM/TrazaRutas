var servidor;
var destino;

var ubicaciones=[];
var saltos=[];

var map;
var markers = [];
var flightPath;

$(document).ready(inicio);

function inicio(){
    initMap();
    $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
	$("#local").click(function(e) {
            if(destino!=null)
                limpiar(destino.saltos.length);   
            servidor = rutaslocal;                  
            map.setCenter({lat: 4,lng:-74});
    	    document.getElementById("tittle").innerHTML  = "TRAZAS DESDE LOCAL";
        });
	$("#n_america").click(function(e) {
    	    if(destino!=null)
                limpiar(destino.saltos.length);   
            servidor = rutacanada;
            map.setCenter({lat: 37.751,lng:-97.822});
    	    document.getElementById("tittle").innerHTML  = "TRAZAS DESDE NORTE AMERICA";
        });
	$("#s_america").click(function(e) {
    		if(destino!=null)
                limpiar(destino.saltos.length);   
            servidor = rutaargentina;
            map.setCenter({lat: -34.6033,lng:-58.3816});
    	  	document.getElementById("tittle").innerHTML  = "TRAZAS DESDE SUR AMERICA"; 
        });
	$("#Europa").click(function(e) {
    	    if(destino!=null)
                limpiar(destino.saltos.length);   
            servidor = rutassuiza;
            map.setCenter({"lat":47.3667,"lng":8.55});
    	    document.getElementById("tittle").innerHTML  = "TRAZAS DESDE EUROPA";
        });
	$("#asia").click(function(e) {
    	    if(destino!=null)
                limpiar(destino.saltos.length);   
            servidor = rutashongkong;
            map.setCenter({"lat":28.6,"lng":77.2});
    	    document.getElementById("tittle").innerHTML  = "TRAZAS DESDE ASIA";
        });
	$("#africa").click(function(e) {
    	    if(destino!=null)
                limpiar(destino.saltos.length);   
            servidor = rutassierraleona;
            map.setCenter({"lat":8.5,"lng":-11.5});
    	    document.getElementById("tittle").innerHTML  = "TRAZAS DESDE AFRICA";
        });
	$("#oceania").click(function(e) {
    	    if(destino!=null)
                limpiar(destino.saltos.length);   
            servidor =rutaaustralia;
            map.setCenter({"lat":-33.494,"lng":143.2104});
    	    document.getElementById("tittle").innerHTML  = "TRAZAS DESDE OCEANIA";
        });

    $("#google").click(function(e) {
        if(destino!=null)
                limpiar(destino.saltos.length);
        destino = servidor[0];
        document.getElementById("dest").innerHTML  = "Hacia "+destino.destino;
        initSaltos(destino);
        });
	$("#Youtube").click(function(e) {
	        if(destino!=null)
                limpiar(destino.saltos.length);   
        destino = servidor[1];
        document.getElementById("dest").innerHTML  = "Hacia "+destino.destino;
        initSaltos(destino);
    	});
    $("#Facebook").click(function(e) {
        if(destino!=null)
            limpiar(destino.saltos.length);   
        destino = servidor[2];
        document.getElementById("dest").innerHTML  = "Hacia "+destino.destino;
        initSaltos(destino);
        });
	$("#Baidu").click(function(e) {
        if(destino!=null)
            limpiar(destino.saltos.length);   
        destino = servidor[3];
        document.getElementById("dest").innerHTML  = "Hacia "+destino.destino;
        initSaltos(destino);
    	});
	$("#Wikipedia").click(function(e) {
        if(destino!=null)
            limpiar(destino.saltos.length);   
        destino = servidor[4];
        document.getElementById("dest").innerHTML  = "Hacia "+destino.destino;
        initSaltos(destino);
    	});
}
function initSaltos(destino){
    saltos = destino.saltos;
    ubicaciones = [];
    for (var i = 0, j=0; i < saltos.length; i++) {
        if(saltos[i].tipo!="privada"){
            ubicaciones[j] = {"lat":saltos[i].lat, "lng":saltos[i].lng};
            j++;
        }
    }
    addRoute();
    addMark();
    llenarTab();
    graficar();
}
function limpiar(length){
    for (var i = 0; i < length; i++) {
        $("#row" + i).remove();
    }
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
    }
    markers = [];
    if(flightPath!=null){
        flightPath.setMap(null);
    }
    flightPath=null;

    $('#contenedor').hide();

    document.getElementById("dest").innerHTML  = "";
}
function llenarTab(){
    var filas;
    var fil;
    var tabla = document.getElementById("resultados");

    for(var i=0; i < saltos.length;i++){
        fil = tabla.insertRow(i);
        fil.setAttribute("id", "row"+i);
        fil.insertCell(0).innerHTML = "salto "+saltos[i].salto;
        fil.insertCell(1).innerHTML = saltos[i].ip+"";
        fil.insertCell(2).innerHTML = saltos[i].tipo;
    }
}
function graficar(){
    var ips=[];
    for (var i = 0; i < saltos.length; i++) {
        ips[i]=saltos[i].salto;
    }
    var tiempos1=[];
    var tiempos2=[];
    var tiempos3=[];
    for (var i = 0; i < saltos.length; i++) {
        tiempos1[i]=saltos[i].time1;
        tiempos2[i]=saltos[i].time2;
        tiempos3[i]=saltos[i].time3;
    }
    $('#contenedor').show();
    $('#contenedor').highcharts({
        title: {
            text: 'Diferencia de Tiempos',
            x: -20 //center
        },
        subtitle: {
            text: 'Según saltos',
            x: -20
        },
        xAxis: {
            title: {
                text: 'Saltos (Ip)'
            },
            categories: ips
        },
        yAxis: {
            title: {
                text: 'Time (ms)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 's'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        //credits: { enabled: false }, 
        series: [{
            name: 'Time1',
            data: tiempos1
        }, {
            name: 'Time2',
            data: tiempos2
        }, {
            name: 'Time3',
            data: tiempos3
        }]

    });   
}
function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: 4,lng:-74}
    });
}
function addMark(){
    var marker;
    for (var i = 0, ub= 0; i < saltos.length; i++) {
        if(saltos[i].tipo != 'privada'){
            marker = new google.maps.Marker({
                position: ubicaciones[ub],
                map: map,
                title: '!',
                animation: google.maps.Animation.DROP,
                label: " "+(i+1)
            });  
            markers.push(marker);  
            ub++;
        }
    }
}
function addRoute(){
    var flightPlanCoordinates = ubicaciones;

    flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    flightPath.setMap(map);
}