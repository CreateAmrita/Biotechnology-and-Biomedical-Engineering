/* COMMENT
Amrita Neuron Simulator is a web based Neuron simulator for Hodgkin-Huxley, Adex and Izhikevich models written in HTML5 and Javscript.


Developed by : Joshy Alphonse & Shyam Diwakar
Computational Neuroscience & Neurophysiology Lab, School of Biotechnology, Amrita University, India.
Email: joshy01234i@gmail.com; shyam@amrita.edu
www.amrita.edu/compneuro


This files handles the logic for simulation of a Single Izhikevich Neuron with different firing patterns.

*/




dt = 0.5

t = 0


delay = 100





function izi() {
    if (t >= delay) {
        I = input
    } else {
        I = 0
    }
    v = v + (0.04 * v * v + 5 * v + 140 - u + I) * dt
    u = u + (a * (b * v - u)) * dt

    if (v >= 30) {
        v = c
        u = u + d
    }
}



function FS(){
    a = $("[name=a]").val(0.1)
    b = $("[name=b]").val(0.2)
    c = $("[name=c]").val(-65)
    d =$("[name=d]").val(2)
    runsim()
}


function LTS(){
    a = $("[name=a]").val(0.02)
    b = $("[name=b]").val( 0.25)
    c = $("[name=c]").val(-65)
    d =$("[name=d]").val(2)
    runsim()
}


function RS(){
    a = $("[name=a]").val(0.02)
    b = $("[name=b]").val(0.2)
    c = $("[name=c]").val(-65)
    d =$("[name=d]").val(8)
    runsim()
}


function TC(){
    a = $("[name=a]").val(0.02)
    b = $("[name=b]").val(0.25)
    c = $("[name=c]").val(-65)
    d =$("[name=d]").val(0.05)
    runsim()
}


function IB(){
    a = $("[name=a]").val(0.02)
    b = $("[name=b]").val( 0.2)
    c = $("[name=c]").val(-55)
    d = $("[name=d]").val(4)
    runsim()
}


function RZ(){
    a = $("[name=a]").val(0.02)
    b = $("[name=b]").val( 0.2)
    c = $("[name=c]").val(-65)
    d =$("[name=d]").val(2)
    runsim()
}

function CH(){
    a = $("[name=a]").val(0.02)
    b = $("[name=b]").val(0.2)
    c = $("[name=c]").val(-50)
    d =$("[name=d]").val( 2)
    runsim()
}


function runsim() {
    simTime = parseFloat($("[name=T]").val())
    input = parseFloat($("[name=I]").val())
    a = parseFloat($("[name=a]").val())
    b = parseFloat($("[name=b]").val())
    c = parseFloat($("[name=c]").val())
    d = parseFloat($("[name=d]").val())
    v = parseFloat($("[name=v]").val())
    u = parseFloat($("[name=u]").val())
    steps = simTime / dt
    resultT = []
    resultV = []
    for (i = 0; i < steps; i++) {
        izi()
        t = dt * (i - 1)
        resultT[i] = t
        resultV[i] = v
    }
    var voltage_time = Highcharts.stockChart('voltage-current', {

        rangeSelector: {
            enabled: false
        },

        title: {
            text: 'Membrane Voltage'
        },

        series: [{
            name: 'mV',
            data: resultV,

        }]
    });
}









var voltage_time = Highcharts.stockChart('voltage-current', {

    rangeSelector: {
        enabled: false
    },

    title: {
        text: 'Membrane Voltage'
    },

    series: [{
        name: 'mV',
        data: [0],

        }]
});
