/* COMMENT
Amrita Neuron Simulator is a web based Neuron simulator for Hodgkin-Huxley, Adex and Izhikevich models written in HTML5 and Javscript.


Developed by : Joshy Alphonse & Shyam Diwakar
Computational Neuroscience & Neurophysiology Lab, School of Biotechnology, Amrita University, India.
Email: joshy01234i@gmail.com; shyam@amrita.edu
www.amrita.edu/compneuro


This files handles the logic for simulation of a Single Adex Neuron with different firing patterns.

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



function FS() {
    var C = $("[name=c]").val(200)
    var el = $("[name=el]").val(-70)
    var del = $("[name=deltat]").val(2)
    var a = $("[name=a]").val(2)
    var vr = $("[name=vr]").val(-58)
    var gl = $("[name=gl]").val(12)
    var vt = $("[name=vt]").val(-50)
    var tw = $("[name=tw]").val(300)
    var b = $("[name=b]").val(6-0)
    runsim()
}





function RS() {
    var C = $("[name=c]").val(281)
    var el = $("[name=el]").val(-70.6)
    var del = $("[name=deltat]").val(2)
    var a = $("[name=a]").val(4)
    var vr = $("[name=vr]").val(-54)
    var gl = $("[name=gl]").val(30)
    var vt = $("[name=vt]").val(-50.4)
    var tw = $("[name=tw]").val(144)
    var b = $("[name=b]").val(0.0805)
    runsim()
}


function TC() {
    var C = $("[name=c]").val(130)
    var el = $("[name=el]").val(-58)
    var del = $("[name=deltat]").val(2)
    var a = $("[name=a]").val(4)
    var vr = $("[name=vr]").val(-50)
    var gl = $("[name=gl]").val(18)
    var vt = $("[name=vt]").val(-50)
    var tw = $("[name=tw]").val(150)
    var b = $("[name=b]").val(120)
    runsim()
}


function IB() {

    var C = $("[name=c]").val(104)
    var el = $("[name=el]").val(-65)
    var del = $("[name=deltat]").val(5.5)
    var a = $("[name=a]").val(-0.8)
    var vr = $("[name=vr]").val(-53)
    var gl = $("[name=gl]").val(43)
    var vt = $("[name=vt]").val(-52)
    var tw = $("[name=tw]").val(88)
    var b = $("[name=b]").val(65)

    runsim()
}


function RZ() {
    var C = $("[name=c]").val(200)
    var el = $("[name=el]").val(-58)
    var del = $("[name=deltat]").val(2)
    var a = $("[name=a]").val(2)
    var vr = $("[name=vr]").val(-46)
    var gl = $("[name=gl]").val(10)
    var vt = $("[name=vt]").val(-50)
    var tw = $("[name=tw]").val(120)
    var b = $("[name=b]").val(100)

    runsim()
}

function CH() {
    var C = $("[name=c]").val(200)
    var el = $("[name=el]").val(-70)
    var del = $("[name=deltat]").val(0.8)
    var a = $("[name=a]").val(2)
    var vr = $("[name=vr]").val(-58)
    var gl = $("[name=gl]").val(10)
    var vt = $("[name=vt]").val(-50)
    var tw = $("[name=tw]").val(30)
    var b = $("[name=b]").val(0)
    runsim()
}


function runsim() {
    var dt = 0.1;
    var C = parseFloat($("[name=c]").val())
    var gl = parseFloat($("[name=gl]").val())
    var el = parseFloat($("[name=el]").val())
    var vt = parseFloat($("[name=vt]").val())
    var del = parseFloat($("[name=deltat]").val())
    var tw = parseFloat($("[name=tw]").val())
    var a = parseFloat($("[name=a]").val())
    var b = parseFloat($("[name=b]").val())
    var vr = parseFloat($("[name=vr]").val())
    var simTime = parseFloat($("[name=simTime]").val())
    var nSteps = 100 / dt
    var I = new Array(nSteps).fill(250) //generateCurrent(3,dt); //input current
    console.log(I)
    var dV = 0;
    var dw = 0;
    console.log(C,gl,el,vt,del,tw,a,b,vr,simTime)

    var V = [];
    V[0] = el;
    var w = [];
    w[0] = 0;

    for (var i = 0; i < nSteps; i++) {
        console.log(i)
        dV = dt * (gl * (V[i] - el) + (gl * del * Math.exp((V[i] - vt) / del)) - w[i] + I[i]) / C
        dw = dt * ((a * (V[i] - el) - w[i]) / tw)

        V[i + 1] = V[i] + dV;
        w[i + 1] = w[i] + dw;
        if (V[i + 1] > 0) {
            V[i] = 0;
            w[i + 1] = w[i] + b;
            V[i + 1] = vr;
            console.log("Fired")
            console.log(V[i + 1])
            console.log(V[i])
            console.log(w[i + 1])
            console.log(w[i])
        }
    }
    console.log(V)
    var voltage_time = Highcharts.stockChart('voltage-current', {
            legend: {
        enabled: true
    },

        rangeSelector: {
            enabled: false
        },

        title: {
            text: 'Membrane Voltage'
        },

        series: [{
            name: 'mV',
            data: V,

        },{
            name:'r',
            data:w
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
