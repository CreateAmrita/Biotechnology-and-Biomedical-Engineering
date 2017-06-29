/* COMMENT
Amrita Neuron Simulator is a web based Neuron simulator for Hodgkin-Huxley, Adex and Izhikevich models written in HTML5 and Javscript.


Developed by : Joshy Alphonse & Shyam Diwakar
Computational Neuroscience & Neurophysiology Lab, School of Biotechnology, Amrita University, India.
Email: joshy01234i@gmail.com; shyam@amrita.edu
www.amrita.edu/compneuro


This files handles the logic for simulation of a Single HH Neuron with voltage clamp protocol.

*/









m_data = []
h_data = []
n_data = []
gna_data = []
gk_data = []
i_data = []
i_plot = []
ina_data = []
ik_data = []
time_data = new Array();
rec_time = 0.00

function runVoltageclamp() {

    multi = $('input[name="multi"]:checked').length > 0;
    if (multi) {
        console.log('plotting all data in single graph')
    } else {
        m_data = []
        h_data = []
        n_data = []
        i_plot = []
        gna_data = []
        gk_data = []
        i_data = []
        ina_data = []
        ik_data = []
        time_data = new Array();
        rec_time = 0
    }




    var I_Na = new Array();
    var I_K = new Array();
    var I_User = new Array();

    var g_Na = new Array();
    var g_K = new Array();
    var g_User = new Array();


    var m = new Array();
    var h = new Array();
    var n = new Array();
    var p = new Array();
    var q = new Array();
    var V = new Array();





    var I_Na = new Array();
    var I_K = new Array();
    var I_User = new Array();

    var g_Na = new Array();
    var g_K = new Array();
    var g_User = new Array();


    var m = new Array();
    var h = new Array();
    var n = new Array();
    var p = new Array();
    var q = new Array();
    var V = new Array();

    var C = parseFloat($("[name=cm]").val()) * 1e-9


    //V.push(-63 / 1000)
    m[0] = 0.068775;
    h[0] = 0.515186;
    n[0] = 0.35286656;
    //p[0] = 0.068775;
    //q[0] = 0.515186;

    var g_passNa = parseFloat($("[name=gpassna]").val()) * 0.000001
    var g_passK = parseFloat($("[name=gpassk]").val()) * 0.000001
    var g_passCl = parseFloat($("[name=gpasscl]").val()) * 0.000001

    var ENa = parseFloat($("[name=ena]").val()) * 0.001
    var EK = parseFloat($("[name=ek]").val()) * 0.001
    var ECl = parseFloat($("[name=ecl]").val()) * 0.001

    var gNa = parseFloat($("[name=gnamax]").val()) * 0.000001
    var gK = parseFloat($("[name=gkmax]").val()) * 0.000001
    var gCl = parseFloat($("[name=gclmax]").val()) * 0.000001


    //DRUG

    ttx = parseFloat($(".ttx").val())
    tea = parseFloat($(".tea").val())
    pronase = 0

    gNa = gNa - gNa * ttx / 100;
    gK = gK - gK * tea / 100;
    pronase = 0

    var m_alpha_equ = parseFloat($("[name=nalpha_equation]").val()) //2
    var m_beta_equ = parseFloat($("[name=nbeta_equation]").val()) //1
    var h_alpha_equ = parseFloat($("[name=halpha_equation]").val()) //1
    var h_beta_equ = parseFloat($("[name=hbeta_equation]").val()) //3
    var n_alpha_equ = parseFloat($("[name=nalpha_equation]").val()) //2
    var n_beta_equ = parseFloat($("[name=nbeta_equation]").val()) // 1

    //console.log(m_alpha_equ,m_beta_equ,h_alpha_equ,h_beta_equ,n_alpha_equ,n_beta_equ)
    //console.log(me)

    var v1y = parseFloat($("[name=vstep1]").val())
    var v1x = parseFloat($("[name=vstep1time]").val())

    var v2y = parseFloat($("[name=vstep2]").val())
    var v2x = parseFloat($("[name=vstep2time]").val())

    var v3y = parseFloat($("[name=vstep3]").val())
    var v3x = parseFloat($("[name=vstep3time]").val())



    var mexp = parseFloat($("[name=mexp]").val()) //3
    var mac = parseFloat($("[name=mac]").val()) //0.100000000000000
    var math = parseFloat($("[name=math]").val()) //-40
    var mas = parseFloat($("[name=mas]").val()) //-0.100000000000000
    var mbc = parseFloat($("[name=mbc]").val()) //4
    var mbth = parseFloat($("[name=mbth]").val()) //-65
    var mbs = parseFloat($("[name=mbs]").val()) //-0.055555555555556


    var hexp = parseFloat($("[name=hexp]").val()) //1
    var hac = parseFloat($("[name=hac]").val()) //0.070000000000000
    var hath = parseFloat($("[name=hath]").val()) //-65
    var has = parseFloat($("[name=has]").val()) //-0.050000000000000
    var hbc = parseFloat($("[name=hbc]").val()) //1
    var hbth = parseFloat($("[name=hbth]").val()) //-35
    var hbs = parseFloat($("[name=hbs]").val()) //-0.100000000000000



    var nexp = parseFloat($("[name=nexp]").val()) //4
    var nac = parseFloat($("[name=nac]").val()) //0.010000000000000
    var nath = parseFloat($("[name=nath]").val()) //-55
    var nas = parseFloat($("[name=nas]").val()) //-0.100000000000000

    var nbc = parseFloat($("[name=nbc]").val()) //0.125000000000000
    var nbth = parseFloat($("[name=nbth]").val()) //-65
    var nbs = parseFloat($("[name=nbs]").val()) //-0.012500000000000


    var Ileak = new Array()
    var dt = 0.00005;
    Ileak[0] = 0;


    var dv = 0
    dt_check = 0
    zero = 0
    nan_check = NaN

    function make_VClampStim() {
        i = 0;
        while (i < v1x * 10) {
            V.push(v1y * 0.001);
            i++;
        }
        i = 0;
        while (i < v2x * 10) {
            V.push(v2y * 0.001);
            i++;
        }
        i = 0;
        while (i < v3x * 10) {
            V.push(v3y * 0.001);
            i++;
        }

    }

    function update_channels_voltage() {

        if (Vo * 1000 == math) {
            math = Number(math) + 0.01
        }
        //if(Vo *1000 == path){
        //	path = Number(math)+0.01
        //}



        m_alpha = evalrate(m_alpha_equ, mac, math, mas)
        m_beta = evalrate(m_beta_equ, mbc, mbth, mbs)
        h_alpha = evalrate(h_alpha_equ, hac, hath, has)
        h_beta = evalrate(h_beta_equ, hbc, hbth, hbs)
        n_alpha = evalrate(n_alpha_equ, nac, nath, nas)
        n_beta = evalrate(n_beta_equ, nbc, nbth, nbs)
        /*p_alpha = evalrate(p_alpha_equ,pac,path,pas)
        p_beta = evalrate(p_beta_equ,pbc,pbth,pbs)
        q_alpha = evalrate(q_alpha_equ,qac,qath,qas)
        q_beta = evalrate(q_beta_equ,qbc,qbth,qbs)*/
        // //console.log('m', m_alpha, m_beta)
        //  c//onsole.log('h', h_alpha, h_beta)//
        //console.log('n', n_alpha, n_beta)

        m_delta = m_alpha - (m_alpha + m_beta) * m[0]
        new_m = Math.max(0, m[0] + m_delta * dt * 1000);
        new_m1 = Math.min(1, new_m);
        m[0] = new_m1

        n_delta = n_alpha - (n_alpha + n_beta) * n[0]
        new_n = Math.max(0, n[0] + n_delta * dt * 1000);
        new_n1 = Math.min(1, new_n);
        n[0] = new_n1

        h_delta = h_alpha - (h_alpha + h_beta) * h[0]
        new_h = Math.max(0, h[0] + h_delta * dt * 1000);
        new_h1 = Math.min(1, new_h);
        h[0] = new_h1
        /*
        	p_delta = p_alpha -(p_alpha+p_beta)*p[0]
        	new_p = Math.max(0,p[0] + p_delta * dt * 1000);
        	new_p1 = Math.min(1,new_p);

        	q_delta = q_alpha -(q_alpha+q_beta)*q[0]
        	new_q = Math.max(0,q[0] + q_delta * dt * 1000);
        	new_q1 = Math.min(1,new_q);*/
        console.log(m[0], n[0], h[0])
    }


    function evalrate(eq_no, c, th, s) {

        switch (eq_no) {
            case 1:
                var z = c * Math.exp((Vo * 1000 - th) * s);
                //console.log('1', z)
                return z
            case 2:
                var z = c * (Vo * 1000 - th) / (1 - Math.exp((Vo * 1000 - th) * s));
                //console.log('2', z)
                return z
            case 3:
                var z = c / (1 + Math.exp((Vo * 1000 - th) * s));
                //console.log('3', z)
                return z
            case 4:
                var z = Vo * 0
                //console.log('4', z)
                return z




        }
    }

    function find_I() {
        update_channels_voltage();

        if (pronase == 1) {
            h[0] = 1;
        }
        //console.log('VO', Vo)
        var currentNa = g_passNa * 1000000 * (ENa - Vo);
        var currentK = g_passK * 1000000 * (EK - Vo);
        var currentCl = g_passCl * 1000000 * (ECl - Vo);
        Ileak[0] = currentNa + currentK + currentCl;
        var currentHH_Na = gNa * 1000000 * Math.pow(m[0], mexp) * Math.pow(h[0], hexp) * (ENa - Vo);
        var currentHH_K = gK * 1000000 * Math.pow(n[0], nexp) * (EK - Vo);
        //var currentHH_Cl = gCl * 1000000 * Math.pow(p[0],pexp) * Math.pow(q[0],qexp) * (ENa - Vo);
        var dI = C * 1000000000 * dv / (dt * 1000) - (Ileak[0] + currentHH_Na + currentHH_K);
        if (I_Naflag) {
            I_Na[0] = currentHH_Na;
            I_K[0] = currentHH_K;
            g_Na[0] = gNa * 1000000 * Math.pow(m[0], mexp) * Math.pow(h[0], hexp);
            g_K[0] = gK * 1000000 * Math.pow(n[0], nexp);
            //g_User[0] = gCl * 1000000 * Math.pow(p[0],pexp) * Math.pow(q[0],qexp);
        }
        //I_User[0] = currentHH_Cl;
        /*if (test_dI > 10000000) {
            dI = (C * 1000000000 * dv / (dt * 1000) - (Ileak[0] + currentHH_Na + currentHH_K)) * 1.0e-9;
        } else {
            dI = C * 1000000000 * dv / (dt * 1000) - (Ileak[0] + currentHH_Na + currentHH_K);
        }
        if (test_dI < 10000000 * -1) {
            dI = (C * 1000000000 * dv / (dt * 1000) - (Ileak[0] + currentHH_Na + currentHH_K)) * 1.0e-9;
        }*/
        return dI;
    }




    var corrector_I2 = undefined;
    var predictor_I1 = undefined;
    var predictor_I2 = undefined;
    var corrector_I = undefined;
    var dt2 = 0;
    var I_leak = []
    I_leak[0] = 0;
    var vstim_counter = 0;
    var zero = 0;
    var nan = NaN;
    var dt_check = 0;
    var copy_I = 0;
    V.splice(0, V.length);
    var iterate = 0;


    var iterate = 0
    var vstim_counter = 0
    V = []

    make_VClampStim()
    console.log(V)
    while (iterate < V.length) {
        iterate++;
        m[1] = m[0];
        n[1] = n[0];
        //p[1] = p[0];
        //q[1] = q[0];
        h[1] = h[0];
        I_leak[1] = I_leak[0];
        Vo = V[vstim_counter];
        I_Naflag = true;
        predictor_I1 = find_I();
        m[3] = m[0];
        n[3] = n[0];
        //p[3] = p[0];
        //q[3] = q[0];
        h[3] = h[0];
        V[3] = V[0];
        I_leak[3] = I_leak[0];
        I_Naflag = false;
        predictor_I2 = find_I();
        corrector_I = 0.5 * (predictor_I1 + predictor_I2);
        m[2] = m[0];
        n[2] = n[0];
        //p/[2] = p[0];
        //q[2] = q[0];
        h[2] = h[0];
        I_leak[2] = I_leak[0];
        I_leak[2] = 0.5 * (I_leak[0] + I_leak[3]);
        m[2] = 0.5 * (m[0] + m[3]);
        h[2] = 0.5 * (h[0] + h[3]);
        n[2] = 0.5 * (n[0] + n[3]);
        //p[2] = 0.5 * (p[0] + p[3]);
        //q[2] = 0.5 * (q[0] + q[3]);
        m[0] = m[2];
        n[0] = n[2];
        h[0] = h[2];
        //p[0] = p[2];
        //q[0] = q[2];
        I_leak[0] = I_leak[2];
        corrector_I2 = corrector_I;
        if (!zero) {
            zero = 1;
            if (Vo != nan) {
                //nan = Vo;
                //copy_I = corrector_I2;
            }
        } else {
            if (Math.abs(dv) > 0) {
                //dt = 1.0e-10;
                dt_check = 41;
            }
            if (dt_check >= 1) {
                if (dt_check == 40) {
                    //dt = 1.0e-6;
                }
                if (dt_check == 1) {
                    //dt = 0.0001;
                }
                dt_check--;
            }
            if (vstim_counter < 5) {
                dv = 0;
                vstim_counter = vstim_counter + 1;
            } else {
                console.log(V[vstim_counter], V[vstim_counter - 1])
                dv = V[vstim_counter] - V[vstim_counter - 1];
                vstim_counter = vstim_counter + 1;
            }
        }
        dt2 = dt2 + dt;

        //pv_plot.push(p[0].toFixed(3));
        //qv_plot.push(q[0].toFixed(3));
        //IUserV_plot.push(I_User[0].toFixed(3) * -1);
        //gUserV_plot.push(g_User[0].toFixed(3));
        time_data.push(parseFloat(rec_time.toFixed(2)))
        m_data.push(parseFloat(m[0].toFixed(3)));
        h_data.push(parseFloat(h[0].toFixed(3)));
        n_data.push(parseFloat(n[0].toFixed(3)));
        ina_data.push(I_Na[0].toFixed(3) * -1);
        ik_data.push(I_K[0].toFixed(3) * -1);
        i_data.push(corrector_I2.toFixed(3) * 1000);
        i_plot.push([rec_time, corrector_I2.toFixed(3) * 1000]);
        //Ieak_plotv.push(I_leak[0].toFixed(3) * -1);
        gna_data.push(parseFloat(g_Na[0].toFixed(3)));
        gk_data.push(parseFloat(g_K[0].toFixed(3)));

        rec_time = rec_time + 0.01
    }

    i_data = i_data.slice(100, i_data.length)
    i_data = i_data.slice(0, i_data.length - 100)
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






    var m_n_h = Highcharts.stockChart('m-n-h', {


        rangeSelector: {
            enabled: false
        },
        legend: {
            enabled: true
        },

        title: {
            text: ''
        },

        series: [{
                name: 'm',
                data: m_data,
                visible: true
    }, {
                name: 'n',
                data: n_data,
                visible: true
    }, {
                name: 'h',
                data: h_data,
                visible: true
    }, {
                name: 'INa',
                data: ina_data,
                visible: false
    }, {
                name: 'IK',
                data: ik_data,
                visible: false
    },
            /*{
                       name: 'IUser',
                       data: iuser_data,
                       visible: false
               },*/
            {
                name: 'gNa',
                data: gna_data,
                visible: false
    }, {
                name: 'gK',
                data: gk_data,
                visible: false
    }
            /*, {
                        name: 'gUser',
                        data: guser_data,
                        visible: false
                }*/
            ]
    });









}
