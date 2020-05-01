
// Create data for graph


// the device which you want to present just return a list 
var device_list = ['TV','dell TV','lamp','alexa','light']
// the corresponding spending of energy
var energy_consumption = ['25','30','15','50','6']

// type of chart you want
var chart_type = 'bar'

//Column color, which you can assign or randomly choose
var Color_list = [
    'rgba(255,99,132,0.6)',
    'rgba(54,162,235,0.6)',
    'rgba(255,206,86,0.6)',
    'rgba(75,192,192,0.6)',
    'rgba(153,102,255,0.6)',
]

var vari_chart = document.getElementById('chart');
var display_chart;

Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

let actual_data = device_list;

function draw_graph(){
    display_chart = new Chart(vari_chart,{
        type:chart_type,  //bar,horizontal bar, pie, line,dougnut, radar, polorarea
        data:{
                    labels:actual_data,
                    datasets:[
                        {
                            label:'Energy consumption/KWH',
                            data:energy_consumption,
                            backgroundColor :Color_list,
                            borderWidth:1,
                            boarderColor:'#777',
                            hoverBorderWidth:3,
                            hoverBorderColor:'#000'
                        }
                    ]
            
                },
                options:{
                    title:{
                        display:true,
                        text:"Devices Energy Consumption",
                        fontSize:25,
                    },
                    legend:{
                        position:"right",
                        labels:{
                            fontColor:"#000"
                        },
                        layout:{
                            padding:{
                                left:50,
                                right:0,
                                buttom:0,
                                top:0
                            }
                        }
                    }
                }
            }
        )
    }

draw_graph();