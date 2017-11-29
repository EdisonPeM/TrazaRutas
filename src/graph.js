var server = [];
var tiempoTotal = [[],[],[]];
var tiempoProm = [[],[],[]];

$(document).ready(function(){
	server = [rutaslocal, rutacanada, rutaargentina, rutassuiza, rutashongkong, rutassierraleona, rutaaustralia];
	$("#Google").click(function(e) {
		graficarPaginas(0);
	    });
	$("#Youtube").click(function(e) {
		graficarPaginas(1);
        });	
	$("#Facebook").click(function(e) {
	    graficarPaginas(2);        
        });
	$("#Baidu").click(function(e) {
	    graficarPaginas(3);        
        });
	$("#Wikipedia").click(function(e) {
		graficarPaginas(4);	            
        });	

	$("#local").click(function(e) {
		graficarServidores(0);
	    });
	$("#n_america").click(function(e) {
		graficarServidores(1);
        });	
	$("#s_america").click(function(e) {
	    graficarServidores(2);        
        });
	$("#Europa").click(function(e) {
	    graficarServidores(3);        
        });
	$("#asia").click(function(e) {
		graficarServidores(4);	            
        });		
	$("#africa").click(function(e) {
	    graficarServidores(5);
        });
	$("#oceania").click(function(e) {
		graficarServidores(6);	            
        });		

});
function graficarServidores(serv){
	$('#contenedor1').show();
	$('#contenedor2').show();
	$('#contenedor3').show();
	document.getElementById("tittle").innerHTML  = "Datos de "+ server[serv][0].origen;
	Highcharts.chart('contenedor1', {
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
	    },
	    title: {
	        text: 'Cantidad de saltos por Servidores'
	    },
	    tooltip: {
	        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: true,
	                format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f} %)',
	                style: {
	                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                }
	            }
	        }
	    },
	    series: [{
	        name: 'Servidores',
	        colorByPoint: true,
	        data: [{
	            name: server[serv][0].destino,
	            y: server[serv][0].saltos.length
	        }, {
	            name: server[serv][1].destino,
	            y: server[serv][1].saltos.length
	        }, {
	            name: server[serv][2].destino,
	            y: server[serv][2].saltos.length
	        }, {
	            name: server[serv][3].destino,
	            y: server[serv][3].saltos.length
	        }, {
	            name: server[serv][4].destino,
	            y: server[serv][4].saltos.length
	        }]
		}]	
	});
	calcular_tiempos("servidor",serv);
	Highcharts.chart('contenedor2', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'Tiempos de repuesta vs pagina web'
	    },
	    // subtitle: {
	    //     text: 'tiempo promedio'
	    // },
	    xAxis: {
	        categories: [
	            server[serv][0].destino,
	            server[serv][1].destino,
	            server[serv][2].destino,
	            server[serv][3].destino,
	            server[serv][4].destino,
	        ],
	        crosshair: true
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Tiempo (ms)'
	        }
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} ms</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        }
	    },
	    series: [{
	        name: 'Tiempo Total 1',
	        data: tiempoTotal[0]
	    },{
	        name: 'Tiempo Total 2',
	        data: tiempoTotal[1]
	    },{
	        name: 'Tiempo Total 3',
	        data: tiempoTotal[2]
	    }]
	});
	Highcharts.chart('contenedor3', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'Tiempos de repuesta promedio vs pagina web'
	    },
	    xAxis: {
	        categories: [
	            server[serv][0].destino,
	            server[serv][1].destino,
	            server[serv][2].destino,
	            server[serv][3].destino,
	            server[serv][4].destino,
	        ],
	        crosshair: true
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Tiempo (ms)'
	        }
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} ms</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        }
	    },
	    series: [{
	        name: 'Tiempo promedio 1',
	        data: tiempoProm[0]
	    },{
	        name: 'Tiempo promedio 2',
	        data: tiempoProm[1]
	    },{
	        name: 'Tiempo promedio 3',
	        data: tiempoProm[2]
	    }],
	    colors: ['#56F4F7','#4449AF','#000000']
	});

}
function graficarPaginas(pagina){
	$('#contenedor1').show();
	$('#contenedor2').show();
	$('#contenedor3').show();
	document.getElementById("tittle").innerHTML  = "Datos de "+ server[0][pagina].destino;
	Highcharts.chart('contenedor1', {
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
	    },
	    title: {
	        text: 'Cantidad de saltos por Servidores'
	    },
	    tooltip: {
	        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: true,
	                format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f} %)',
	                style: {
	                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                }
	            }
	        }
	    },
	    series: [{
	        name: 'Servidores',
	        colorByPoint: true,
	        data: [{
	            name: server[0][pagina].origen,
	            y: server[0][pagina].saltos.length
	        }, {
	            name: server[1][pagina].origen,
	            y: server[1][pagina].saltos.length,
	        }, {
	            name: server[2][pagina].origen,
	            y: server[2][pagina].saltos.length
	        }, {
	            name: server[3][pagina].origen,
	            y: server[3][pagina].saltos.length
	        }, {
	            name: server[4][pagina].origen,
	            y: server[4][pagina].saltos.length
	        }, {
	            name: server[5][pagina].origen,
	            y: server[5][pagina].saltos.length
			},{
				name: server[6][pagina].origen,
	            y: server[6][pagina].saltos.length
			}]
		}]	
	});
	calcular_tiempos("paginas",pagina);
	Highcharts.chart('contenedor2', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'Tiempos de repuesta Total vs servidor'
	    },
	    // subtitle: {
	    //     text: 'tiempo promedio'
	    // },
	    xAxis: {
	        categories: [
	            server[0][pagina].origen,
	            server[1][pagina].origen,
	            server[2][pagina].origen,
	            server[3][pagina].origen,
	            server[4][pagina].origen,
	            server[5][pagina].origen,
	            server[6][pagina].origen
	        ],
	        crosshair: true
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Tiempo (ms)'
	        }
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} ms</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        }
	    },
	    series: [{
	        name: 'Tiempo Total 1',
	        data: tiempoTotal[0]
	    },{
	        name: 'Tiempo Total 2',
	        data: tiempoTotal[1]
	    },{
	        name: 'Tiempo Total 3',
	        data: tiempoTotal[2]
	    }],
		colors: ['##FFC300','#900C3F','#FF2B3B']
	});
	Highcharts.chart('contenedor3', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'Tiempos de repuesta promedio vs servidor'
	    },
	    xAxis: {
	        categories: [
	            server[0][pagina].origen,
	            server[1][pagina].origen,
	            server[2][pagina].origen,
	            server[3][pagina].origen,
	            server[4][pagina].origen,
	            server[5][pagina].origen,
	            server[6][pagina].origen
	        ],
	        crosshair: true
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Tiempo (ms)'
	        }
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} ms</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        }
	    },
	    series: [{
	        name: 'Tiempo promedio 1',
	        data: tiempoProm[0]
	    },{
	        name: 'Tiempo promedio 2',
	        data: tiempoProm[1]
	    },{
	        name: 'Tiempo promedio 3',
	        data: tiempoProm[2]
	    }]
	});
}

function calcular_tiempos(opcion, index){
	tiempoTotal = [[],[],[]];
	tiempoProm = [[],[],[]];
	if(opcion=="paginas"){
		for (var i = 0; i < server.length; i++) {
			tiempoTotal[0][i]=0;
			tiempoTotal[1][i]=0;
			tiempoTotal[2][i]=0;
			for (var j = 0; j < server[i][index].saltos.length; j++) {
				tiempoTotal[0][i] += server[i][index].saltos[j].time1;
				tiempoTotal[1][i] += server[i][index].saltos[j].time2;
				tiempoTotal[2][i] += server[i][index].saltos[j].time3;
			}
			tiempoProm[0][i] = tiempoTotal[0][i]/server[i][index].saltos.length;
			tiempoProm[1][i] = tiempoTotal[1][i]/server[i][index].saltos.length;
			tiempoProm[2][i] = tiempoTotal[2][i]/server[i][index].saltos.length;
		}		
	}else if(opcion =="servidor"){
		for (var i = 0; i < server[index].length; i++) {
			tiempoTotal[0][i]=0;
			tiempoTotal[1][i]=0;
			tiempoTotal[2][i]=0;
			for (var j = 0; j < server[index][i].saltos.length; j++) {
				tiempoTotal[0][i] += server[index][i].saltos[j].time1;
				tiempoTotal[1][i] += server[index][i].saltos[j].time2;
				tiempoTotal[2][i] += server[index][i].saltos[j].time3;
			}
			tiempoProm[0][i] = tiempoTotal[0][i]/server[index][i].saltos.length;
			tiempoProm[1][i] = tiempoTotal[1][i]/server[index][i].saltos.length;
			tiempoProm[2][i] = tiempoTotal[2][i]/server[index][i].saltos.length;
		}		
	}
}