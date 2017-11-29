var origen = [];
var tiempoServidores = [[],[],[],[],[],[],[]];
var tiempoPaginas = [[],[],[],[],[]];
$(document).ready(function(){
	origen = [rutaslocal, rutacanada, rutaargentina, rutassuiza, rutashongkong, rutassierraleona, rutaaustralia];
	$("#allServer").click(function(e) {
		servidores();
	    });
	$("#allPage").click(function(e) {
		paginas();
	    });
});
function servidores(){
	document.getElementById("tittle").innerHTML  = "Datos de todos los servidores";
	$('#contenedor2').hide();
	$('#contenedor3').hide();
	tiemposTotales();
	Highcharts.chart('contenedor1', {
	    chart: {
	        type: 'column',
	        backgroundColor: null,
		    style: {
		        fontFamily: 'Dosis, sans-serif'
		    }
	    },
	    title: {
	        text: 'Tiempos de repuesta promedio por paginas vs servidores',
	      	style: {
	        	fontSize: '16px',
	        	fontWeight: 'bold',
	        	textTransform: 'uppercase'
	      	}
	    },
	    xAxis: {
	        categories: [
	            origen[0][0].destino,
	            origen[0][1].destino,
	            origen[0][2].destino,
	            origen[0][3].destino,
	            origen[0][4].destino,
	        ],
	        crosshair: true,
	        gridLineWidth: 1,
		    labels: {
		        style: {
		           fontSize: '12px'
		        }
		    }
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Tiempo (ms)',
		        style: {
		            textTransform: 'uppercase'
		         }
	        },
			minorTickInterval: 'auto',
		    labels: {
		        style: {
		           fontSize: '12px'
		        }
		    }
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} ms</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true,
	        borderWidth: 0,
		    backgroundColor: 'rgba(219,219,216,0.8)',
		    shadow: false,
		    itemStyle: {
		        fontWeight: 'bold',
		        fontSize: '13px'
		    }
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        },
	        candlestick: {
	       		lineColor: '#404048'
	      	}
	    },
	    series: [{
	        name: origen[0][0].origen,
	        data: tiempoServidores[0]
	    },{
	        name: origen[1][0].origen,
	        data: tiempoServidores[1]
	    },{
	        name: origen[2][0].origen,
	        data: tiempoServidores[2]
	    },{
	        name: origen[3][0].origen,
	        data: tiempoServidores[3]
	    },{
	        name: origen[4][0].origen,
	        data: tiempoServidores[4]
	    },{
	        name: origen[5][0].origen,
	        data: tiempoServidores[5]
	    },{
	        name: origen[6][0].origen,
	        data: tiempoServidores[6]
	    }],
		colors: ['#ff0066','#eeaaee', '#55BF3B', '#DF5353', '#7798BF', 
			'#aaeeee','#7cb5ec','#f7a35c','#90ee7e','#7798BF','#aaeeee'],
	    background2: '#F0F0EA'
	});
}
function paginas(){
	document.getElementById("tittle").innerHTML  = "Datos de todas las páginas";
	$('#contenedor2').hide();
	$('#contenedor3').hide();
	tiemposTotales();
	barChart = Highcharts.chart('contenedor1', {
	    chart: {
	        type: 'column',
	        backgroundColor: null,
		    style: {
		        fontFamily: 'Dosis, sans-serif'
		    }
	    },
	    title: {
	        text: 'Tiempos de repuesta promedio por servidores vs paginas',
	      	style: {
	        	fontSize: '16px',
	        	fontWeight: 'bold',
	        	textTransform: 'uppercase'
	      	}
	    },
	    xAxis: {
	        categories: [
	            server[0][0].origen,
	            server[1][0].origen,
	            server[2][0].origen,
	            server[3][0].origen,
	            server[4][0].origen,
	            server[5][0].origen,
	            server[6][0].origen,
	        ],
	        crosshair: true,
	        gridLineWidth: 1,
		    labels: {
		        style: {
		           fontSize: '12px'
		        }
		    }
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Tiempo (ms)',
		        style: {
		            textTransform: 'uppercase'
		         }
	        },
			minorTickInterval: 'auto',
		    labels: {
		        style: {
		           fontSize: '12px'
		        }
		    }
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} ms</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true,
	        borderWidth: 0,
		    backgroundColor: 'rgba(219,219,216,0.8)',
		    shadow: false,
		    itemStyle: {
		        fontWeight: 'bold',
		        fontSize: '13px'
		    }
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        },
	        candlestick: {
	       		lineColor: '#404048'
	      	}
	    },
	    series: [{
	        name: origen[0][0].destino,
	        data: tiempoPaginas[0]
	    },{
	        name: origen[0][1].destino,
	        data: tiempoPaginas[1]
	    },{
	        name: origen[0][2].destino,
	        data: tiempoPaginas[2]
	    },{
	        name: origen[0][3].destino,
	        data: tiempoPaginas[3]
	    },{
	        name: origen[0][4].destino,
	        data: tiempoPaginas[4]
	    }],
		colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
	    background2: '#F0F0EA'
	});
}
function tiemposTotales(){
	for (var i = 0; i < origen.length; i++) {
		for (var j = 0; j < origen[i].length; j++) {
			var time1=0;
			var time2=0;
			var time3=0;
			for (var k = 0; k < origen[i][j].saltos.length; k++) {
				time1 += origen[i][j].saltos[k].time1;
				time2 += origen[i][j].saltos[k].time2;
				time3 += origen[i][j].saltos[k].time3;
			}
			time1*=(1/origen[i][j].saltos.length);
			time2*=(1/origen[i][j].saltos.length);
			time3*=(1/origen[i][j].saltos.length);

			tiempoServidores[i][j] = (time1+time2+time3)/3;
			tiempoPaginas[j][i] = (time1+time2+time3)/3;
		}
	}
}
