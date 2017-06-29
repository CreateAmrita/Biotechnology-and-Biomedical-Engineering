/* COMMENT
Amrita Neuron Simulator is a web based Neuron simulator for Hodgkin-Huxley, Adex and Izhikevich models written in HTML5 and Javscript.


Developed by : Joshy Alphonse & Shyam Diwakar
Computational Neuroscience & Neurophysiology Lab, School of Biotechnology, Amrita University, India.
Email: joshy01234i@gmail.com; shyam@amrita.edu
www.amrita.edu/compneuro


This files controls the gui and transition of the gui when HH model is selelcted and also the function to export data as csv.

*/







/*$(".mode-menu li a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    document.getElementById('dropdownMenu1').value = this.getAttribute("value");
    if (this.getAttribute("value") == 'cclamp') {
        
    }

    if (this.getAttribute("value") == 'vclamp') {
        
    }


});*/

var mode = "Current Clamp";
$(".btn-group > .btn").on("click", function(){
    mode = this.innerText;
    
    if(mode == "Current Clamp"){
        $('#choose_stim').attr('data-target', "#Cstim1")
    }
    if(mode == "Voltage Clamp"){
        $('#choose_stim').attr('data-target', "#Vstim1")
    }

    
});



$(function () {

    $(".mexponent li a").click(function () {
        $("[name=mexp]").text($(this).text());
        $("[name=mexp]").val($(this).text());
    });

});

$(function () {

    $(".nexponent li a").click(function () {
        $("[name=nexp]").text($(this).text());
        $("[name=nexp]").val($(this).text());
    });

});
$(function () {

    $(".hexponent li a").click(function () {
        $("[name=hexp]").text($(this).text());
        $("[name=hexp]").val($(this).text());
    });

});

$(function () {

    $(".pexponent li a").click(function () {
        $("[name=pexp]").text($(this).text());
        $("[name=pexp]").val($(this).text());
    });

});
$(function () {

    $(".qexponent li a").click(function () {
        $("[name=qexp]").text($(this).text());
        $("[name=qexp]").val($(this).text());
    });

});



$(function () {

    $(".palpha_equation li a").click(function () {
        $("[name=palpha_equation]").text($(this).text());
        $("[name=palpha_equation]").val($(this).val());
    });

});






/*


            var TTXSlider = function() {
                var slider = $('.ttx-slider'),
                    range = $('.ttx-slider__range'),
                    value = $('.ttx-slider__value');

                slider.each(function() {

                    value.each(function() {
                        var value = $(this).prev().attr('value');
                        $(this).html(value);
                    });

                    range.on('input', function() {
                        $(this).next(value).html(this.value);
                    });
                });
            };

            TTXSlider();
            var TEASlider = function() {
                var slider = $('.tea-slider'),
                    range = $('.tea-slider__range'),
                    value = $('.tea-slider__value');

                slider.each(function() {

                    value.each(function() {
                        var value = $(this).prev().attr('value');
                        $(this).html(value);
                    });

                    range.on('input', function() {
                        $(this).next(value).html(this.value);
                    });
                });
            };

            TEASlider();
*/

var Stim1v1Slider = function () {
    var slider = $('.stim1v1-slider'),
        range = $('.stim1v1-slider__range'),
        value = $('.stim1v1-slider__value');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};

Stim1v1Slider();


var Stim1v1timerSlider = function () {
    var slider = $('.stim1v1timer-slider'),
        range = $('.stim1v1timer-slider__range'),
        value = $('.stim1v1timer-slider__value');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};

Stim1v1timerSlider();


var Stim1v2Slider = function () {
    var slider = $('.stim1v2-slider'),
        range = $('.stim1v2-slider__range'),
        value = $('.stim1v2-slider__value');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};

Stim1v2Slider();


var Stim1v2timerSlider = function () {
    var slider = $('.stim1v2timer-slider'),
        range = $('.stim1v2timer-slider__range'),
        value = $('.stim1v2timer-slider__value');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};

Stim1v2timerSlider();


var Stim1v3Slider = function () {
    var slider = $('.stim1v3-slider'),
        range = $('.stim1v3-slider__range'),
        value = $('.stim1v3-slider__value');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};

Stim1v3Slider();


var Stim1v3timerSlider = function () {
    var slider = $('.stim1v3timer-slider'),
        range = $('.stim1v3timer-slider__range'),
        value = $('.stim1v3timer-slider__value');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};

Stim1v3timerSlider();




Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

// Create the chart placeholder

/*
Highcharts.stockChart('voltage-current', {
    chart: {
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function () {
                    var x = 0, // current time
                        y = -0.002;
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
    },

    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
        }, {
            count: 5,
            type: 'minute',
            text: '5M'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 0
    },

    title: {
        text: 'Live random data'
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Random data',
        data: ([[0,-0.002]])
    }]
});*/



var originalHtml = document.body.innerHTML;


function reset() {
    document.body.innerHTML = originalHtml
}

$(".malpha_equation li a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $("[name=malpha_equation]").val(this.getAttribute("value"))

});

$(".mbeta_equation li a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $("[name=mbeta_equation]").val(this.getAttribute("value"))

});


$(".nalpha_equation li a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $("[name=nalpha_equation]").val(this.getAttribute("value"))

});

$(".nbeta_equation li a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $("[name=nbeta_equation]").val(this.getAttribute("value"))

});


$(".halpha_equation li a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $("[name=halpha_equation]").val(this.getAttribute("value"))

});

$(".hbeta_equation li a").click(function () {

    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $("[name=hbeta_equation]").val(this.getAttribute("value"))

});


$(".palpha_equation li a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $("[name=palpha_equation]").val(this.getAttribute("value"))

});

$(".pbeta_equation li a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $("[name=pbeta_equation]").val(this.getAttribute("value"))

});


$(".qalpha_equation li a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $("[name=qalpha_equation]").val(this.getAttribute("value"))

});

$(".qbeta_equation li a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $("[name=qbeta_equation]").val(this.getAttribute("value"))

});



var voltage_current = Highcharts.stockChart('voltage-current', {

    rangeSelector: {
        enabled: false
    },

    title: {
        text: 'Current'
    },

    series: [{
        name: 'Currrent',
        data: i_data,

        }]
});

function prevent_reload(e) {
    e.preventDefault();

}

function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], {
        type: 'text/csv;charset=utf-8;'
    });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click(prevent_reload);
            document.body.removeChild(link);
        }
    }
}

function export_as_csv() {
    export_data = []

    file_name = $('[name=filename]').val()
    file_name = file_name + ".csv"

    data_to_export = [].filter.call(document.getElementsByName('data_exp[]'), (c) => c.checked).map(c => c.value);
    console.log(data_to_export)
    export_data.push(data_to_export)

    total_data_count = m_data.length
    console.log(v_data)
    for (data_count = 0; data_count < total_data_count; data_count++) {
        data_buffer = []
        for (i = 0; i < data_to_export.length; i++) {
            if (data_to_export[i] == 'Time (ms)') {
                data_buffer.push(time_data[data_count])
            } else if (data_to_export[i] == 'voltage (mV)') {
                data_buffer.push(v_data[data_count])
            } else if (data_to_export[i] == 'current (nA)') {
                console.log('i', i_data[i])
                data_buffer.push(i_data[data_count])
            } else if (data_to_export[i] == 'm') {
                data_buffer.push(m_data[data_count])
            } else if (data_to_export[i] == 'n') {
                data_buffer.push(m_data[data_count])
            } else if (data_to_export[i] == 'h') {
                data_buffer.push(m_data[data_count])
            } else if (data_to_export[i] == 'ina (uA)') {
                data_buffer.push(ina_data[data_count])
            } else if (data_to_export[i] == 'ik (uA)') {
                data_buffer.push(ik_data[data_count])
            } else if (data_to_export[i] == 'gna (uS)') {
                data_buffer.push(gna_data[data_count])
            } else if (data_to_export[i] == 'gk (uS)') {
                data_buffer.push(gk_data[data_count])
            } else if (data_to_export[i] == 'iuser (uA)') {
                data_buffer.push(iuser_data[data_count])
            } else if (data_to_export[i] == 'guser (uS)') {
                data_buffer.push(guser_data[data_count])
            }
            console.log('databuffer', data_buffer)
            export_data.push(data_buffer)


        }
    }
    exportToCsv(file_name, export_data)
}

function T_change() {
    Ena_change()
    Ek_change()
    ECl_change()
}

function Ena_change() {
    T = parseFloat($('[name=t]').val()) + 273.16;
    R = 8.31451 //parseFloat($('[name=rm]').val());
    F = 96485.3;
    Co = parseFloat($('[name=nao]').val())
    Ci = parseFloat($('[name=nai]').val())

    ena = (R * T / (1 * F) * Math.log(Co / Ci) * 1000).toFixed(2)

    $('[name=ena]').val(ena)


}

function Ek_change() {
    T = parseFloat($('[name=t]').val()) + 273.16;
    R = 8.31451 //parseFloat($('[name=rm]').val());
    F = 96485.3;
    Co = parseFloat($('[name=ko]').val())
    Ci = parseFloat($('[name=ki]').val())

    ek = (R * T / (1 * F) * Math.log(Co / Ci) * 1000).toFixed(2)

    $('[name=ek]').val(ek)


}

function ECl_change() {
    T = parseFloat($('[name=t]').val()) + 273.16;
    R = 8.31451 //parseFloat($('[name=rm]').val());
    F = 96485.3;
    Co = parseFloat($('[name=clo]').val())
    Ci = parseFloat($('[name=cli]').val())

    ecl = (R * T / (-1 * F) * Math.log(Co / Ci) * 1000).toFixed(2)

    $('[name=ecl]').val(ecl)


}


function which_stim() {

}

/*var voltage_current =   Highcharts.stockChart('voltage-current', {



        

        title: {
            text: ''
        },

        series: [{
            name: '',
            data: [[0,0]],
            
        }]
    });*/


function hhsim() {
    mode = mode
    console.log(mode)


    if (mode == 'Voltage Clamp' ) {
        console.log(mode)


        runVoltageclamp()
    }
    if (mode == 'Current Clamp') {





        runCurrentClamp()
    }
}
