/* COMMENT
Amrita Neuron Simulator is a web based Neuron simulator for Hodgkin-Huxley, Adex and Izhikevich models written in HTML5 and Javscript.


Developed by : Joshy Alphonse & Shyam Diwakar
Computational Neuroscience & Neurophysiology Lab, School of Biotechnology, Amrita University, India.
Email: joshy01234i@gmail.com; shyam@amrita.edu
www.amrita.edu/compneuro


This files handles the logic for simulation of a Single HH Neuron with current clamp protocol.

*/









function make_Istim() {




    IstimCounter = 0;
    while (IstimCounter < s0 * 10) {
        IstimArr.push(0);
        IstimCounter++;
    }
    IstimCounter = 0;
    while (IstimCounter < s1 * 10) {
        IstimArr.push(svalue2 * 1.0e-9);
        IstimCounter++;
    }
    IstimCounter = 0;
    while (IstimCounter < s3 * 10) {
        IstimArr.push(0);
        IstimCounter++;
    }
    IstimCounter = 0;
    while (IstimCounter < s4 * 10) {
        IstimArr.push(svalue5 * 1.0e-9);
        IstimCounter++;
    }
    IstimCounter = 0;
    while (IstimCounter < 300) {
        IstimArr.push(0);
        IstimCounter++;
    }
    //console.log(IstimArr)


}

function evalrate(eq_no, c, th, s) {

    switch (eq_no) {
        case 1:
            var z = c * Math.exp((V[0] * 1000 - th) * s);
            //console.log('1', z)
            return z
        case 2:
            var z = c * (V[0] * 1000 - th) / (1 - Math.exp((V[0] * 1000 - th) * s));
            //console.log('2', z)
            return z
        case 3:
            var z = c / (1 + Math.exp((V[0] * 1000 - th) * s));
            //console.log('3', z)
            return z
        case 4:
            var z = V[0] * 0
            //console.log('4', z)
            return z




    }


}


function find_dv(param1) {
    update_channels();
    if (pronase == 1) {
        h[0] = 1;
    }
    var currentNa = g_passNa * 1000000 * (ENa - V[0]);
    var currentK = g_passK * 1000000 * (EK - V[0]);
    var currentCl = g_passCl * 1000000 * (ECl - V[0]);
    Ileak[0] = currentNa + currentK + currentCl;
    var currentHH_Na = gNa * 1000000 * Math.pow(m[0], mexp) * Math.pow(h[0], hexp) * (ENa - V[0]);
    var currentHH_K = gK * 1000000 * Math.pow(n[0], nexp) * (EK - V[0]);
    //var currentHH_User = gCl * 1000000 * Math.pow(p[0], pexp) * Math.pow(q[0], qexp) * (ENa - V[0]);
    var deltaV = dt * 1000 * (currentNa + currentK + currentCl + currentHH_Na + currentHH_K + param1 * 1000000) / (C * 1000000000);
    //console.log(g_passCl, g_passK, g_passNa, gK, gNa, gCl)
    //console.log('current', currentNa, currentK, currentCl, currentHH_Na, currentHH_K)
    //    console.log('channel', V[0], m[0], n[0], h[0])


    if (I_Naflag) {
        I_Na[0] = currentHH_Na;
        I_K[0] = currentHH_K;
        g_Na[0] = gNa * 1000000 * Math.pow(m[0], mexp) * Math.pow(h[0], hexp);
        g_K[0] = gK * 1000000 * Math.pow(n[0], nexp);
        //g_User[0] = gCl * 1000000 * Math.pow(p[0], pexp) * Math.pow(q[0], qexp);
    }
    //I_User[0] = currentHH_User;
    //console.log(deltaV)
    return deltaV

}

function update_channels() {




    m_alpha = evalrate(m_alpha_equ, mac, math, mas)
    m_beta = evalrate(m_beta_equ, mbc, mbth, mbs)
    h_alpha = evalrate(h_alpha_equ, hac, hath, has)
    h_beta = evalrate(h_beta_equ, hbc, hbth, hbs)
    n_alpha = evalrate(n_alpha_equ, nac, nath, nas)
    n_beta = evalrate(n_beta_equ, nbc, nbth, nbs)
    //p_alpha = evalrate(p_alpha_equ,pac,path,pas)
    //p_beta = evalrate(p_beta_equ,pbc,pbth,pbs)
    //q_alpha = evalrate(q_alpha_equ,qac,qath,qas)
    //q_beta = evalrate(q_beta_equ,qbc,qbth,qbs)

    //console.log(m_alpha,m_beta,n_alpha,n_beta,h_alpha,h_beta)

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

    //console.log(V[0], m[0], n[0], h[0])

    /*
    	p_delta = p_alpha -(p_alpha+p_beta)*p[0]
    	new_p = Math.max(0,p[0] + p_delta * dt * 1000);
    	new_p1 = Math.min(1,new_p);
      p[0] = new_p1

    	q_delta = q_alpha -(q_alpha+q_beta)*q[0]
    	new_q = Math.max(0,q[0] + q_delta * dt * 1000);
    	new_q1 = Math.min(1,new_q);
      q[0] = new_q1

     */
}

v_data = new Array();
m_data = new Array();
h_data = new Array();
n_data = new Array();
ileak_data = new Array();
ina_data = new Array();
ik_data = new Array();
p_data = new Array();
q_data = new Array();
iuser_data = new Array();
gna_data = new Array();
gk_data = new Array();
guser_data = new Array();
time_data = new Array();


function runCurrentClamp() {
    rec_time = 0
    multi = $('input[name="multi"]:checked').length > 0;
    if (multi) {
        console.log('plotting all data in single graph')
    } else {
        v_data = new Array();
        m_data = new Array();
        h_data = new Array();
        n_data = new Array();
        time_data = new Array();
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

    var C = 1.000000000000000e-09


    V.push(-63.39 / 1000);
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




    var m_alpha_equ = parseFloat($("[name=nalpha_equation]").val()) //2
    var m_beta_equ = parseFloat($("[name=nbeta_equation]").val()) //1
    var h_alpha_equ = parseFloat($("[name=halpha_equation]").val()) //1
    var h_beta_equ = parseFloat($("[name=hbeta_equation]").val()) //3
    var n_alpha_equ = parseFloat($("[name=nalpha_equation]").val()) //2
    var n_beta_equ = parseFloat($("[name=nbeta_equation]").val()) // 1


    var mexp = parseFloat($("[name=mexp]").val()) //3
    var mac = parseFloat($("[name=mac]").val()) //0.100000000000000
    var math = parseFloat($("[name=math]").val()) //-40
    var mas = parseFloat($("[name=mas]").val()) //-0.100000000000000
    var mbc = parseFloat($("[name=mbc]").val()) //4
    var mbth = parseFloat($("[name=mbth]").val()) //-65
    var mbs = parseFloat($("[name=mbs]").val()) //-0.055555555555556
    console.log(mexp, mac, math, mas, mbc, mbth, mbs)

    var hexp = parseFloat($("[name=hexp]").val()) //1
    var hac = parseFloat($("[name=hac]").val()) //0.070000000000000
    var hath = parseFloat($("[name=hath]").val()) //-65
    var has = parseFloat($("[name=has]").val()) //-0.050000000000000
    var hbc = parseFloat($("[name=hbc]").val()) //1
    var hbth = parseFloat($("[name=hbth]").val()) //-35
    var hbs = parseFloat($("[name=hbs]").val()) //-0.100000000000000

    console.log(hexp, hac, hath, has, hbc, hbth, hbs)




    var nexp = parseFloat($("[name=nexp]").val()) //4
    var nac = parseFloat($("[name=nac]").val()) //0.010000000000000
    var nath = parseFloat($("[name=nath]").val()) //-55
    var nas = parseFloat($("[name=nas]").val()) //-0.100000000000000

    var nbc = parseFloat($("[name=nbc]").val()) //0.125000000000000
    var nbth = parseFloat($("[name=nbth]").val()) //-65
    var nbs = parseFloat($("[name=nbs]").val()) //-0.012500000000000
    console.log(nexp, nac, nath, nas, nbc, nbth, nbs)
    //console.log(me)

    /*

    var p_alpha_equ = 0
    var p_beta_equ = 0
    var pexp = 0
    var pac = 0
    var path = 0
    var pas = 0

    var pbc = 0
    var pbth = 0
    var pbs = 0


    var q_alpha_equ = 0
    var q_beta_equ = 0
    var qexp = 0
    var qac = 0
    var qath = 0
    var qas = 0

    var qbc = 0
    var qbth = 0
    var qbs = 0


    */

    var s0 = parseFloat($("[name=inj-start1]").val())
    var s1 = parseFloat($("[name=inj-stop1]").val())
    var svalue2 = parseFloat($("[name=inj-value1]").val())
    var s3 = parseFloat($("[name=inj-start2]").val())
    var s4 = parseFloat($("[name=inj-stop2]").val())
    var svalue5 = parseFloat($("[name=inj-value2]").val())









    ileak_data = new Array();
    ina_data = new Array();
    ik_data = new Array();
    p_data = new Array();
    q_data = new Array();
    iuser_data = new Array();
    gna_data = new Array();
    gk_data = new Array();
    guser_data = new Array();


    IstimArr = new Array()

    var Ileak = new Array()
    var dt = 0.0001;
    Ileak[0] = 0;


    function make_Istim() {
        IstimCounter = 0;
        while (IstimCounter < s0 * 10) {
            IstimArr.push(0);
            IstimCounter++;
        }
        IstimCounter = 0;
        while (IstimCounter < s1 * 10) {
            IstimArr.push(svalue2 * 1.0e-9);
            IstimCounter++;
        }
        IstimCounter = 0;
        while (IstimCounter < s3 * 10) {
            IstimArr.push(0);
            IstimCounter++;
        }
        IstimCounter = 0;
        while (IstimCounter < s4 * 10) {
            IstimArr.push(svalue5 * 1.0e-9);
            IstimCounter++;
        }
        IstimCounter = 0;
        while (IstimCounter < 300) {
            IstimArr.push(0);
            IstimCounter++;
        }


    }

    function evalrate(eq_no, c, th, s) {

        switch (eq_no) {
            case 1:
                var z = c * Math.exp((V[0] * 1000 - th) * s);
                //console.log('1', z)
                return z
            case 2:
                var z = c * (V[0] * 1000 - th) / (1 - Math.exp((V[0] * 1000 - th) * s));
                //console.log('2', z)
                return z
            case 3:
                var z = c / (1 + Math.exp((V[0] * 1000 - th) * s));
                //console.log('3', z)
                return z
            case 4:
                var z = V[0] * 0
                //console.log('4', z)
                return z




        }


    }


    function find_dv(param1) {
        update_channels();
        if (pronase == 1) {
            h[0] = 1;
        }
        var currentNa = g_passNa * 1000000 * (ENa - V[0]);
        var currentK = g_passK * 1000000 * (EK - V[0]);
        var currentCl = g_passCl * 1000000 * (ECl - V[0]);
        Ileak[0] = currentNa + currentK + currentCl;
        var currentHH_Na = gNa * 1000000 * Math.pow(m[0], mexp) * Math.pow(h[0], hexp) * (ENa - V[0]);
        var currentHH_K = gK * 1000000 * Math.pow(n[0], nexp) * (EK - V[0]);
        //var currentHH_User = gCl * 1000000 * Math.pow(p[0], pexp) * Math.pow(q[0], qexp) * (ENa - V[0]);
        var deltaV = dt * 1000 * (currentNa + currentK + currentCl + currentHH_Na + currentHH_K + param1 * 1000000) / (C * 1000000000);

        //console.log('current',currentNa,currentK,currentCl,currentHH_Na,currentHH_K)
        //console.log('channel',V[0],m[0],n[0],h[0])


        if (I_Naflag) {
            I_Na[0] = currentHH_Na;
            I_K[0] = currentHH_K;
            g_Na[0] = gNa * 1000000 * Math.pow(m[0], mexp) * Math.pow(h[0], hexp);
            g_K[0] = gK * 1000000 * Math.pow(n[0], nexp);
            //g_User[0] = gCl * 1000000 * Math.pow(p[0], pexp) * Math.pow(q[0], qexp);
        }
        //I_User[0] = currentHH_User;
        //console.log(deltaV)
        return deltaV

    }


    function update_channels() {
        m_alpha = evalrate(m_alpha_equ, mac, math, mas)
        m_beta = evalrate(m_beta_equ, mbc, mbth, mbs)
        h_alpha = evalrate(h_alpha_equ, hac, hath, has)
        h_beta = evalrate(h_beta_equ, hbc, hbth, hbs)
        n_alpha = evalrate(n_alpha_equ, nac, nath, nas)
        n_beta = evalrate(n_beta_equ, nbc, nbth, nbs)
        //p_alpha = evalrate(p_alpha_equ,pac,path,pas)
        //p_beta = evalrate(p_beta_equ,pbc,pbth,pbs)
        //q_alpha = evalrate(q_alpha_equ,qac,qath,qas)
        //q_beta = evalrate(q_beta_equ,qbc,qbth,qbs)

        //console.log(m_alpha,m_beta,n_alpha,n_beta,h_alpha,h_beta)

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

        console.log(V[0], m[0], n[0], h[0])

        /*
        	p_delta = p_alpha -(p_alpha+p_beta)*p[0]
        	new_p = Math.max(0,p[0] + p_delta * dt * 1000);
        	new_p1 = Math.min(1,new_p);
          p[0] = new_p1

        	q_delta = q_alpha -(q_alpha+q_beta)*q[0]
        	new_q = Math.max(0,q[0] + q_delta * dt * 1000);
        	new_q1 = Math.min(1,new_q);
          q[0] = new_q1

         */
    }





    make_Istim()


    var iterate = 1;
    var stim_counter = 0
    while (iterate < IstimArr.length) {

        iterate++;
        var changestepflag = 1;

        while (changestepflag) {
            changestepflag = 0;
            m[1] = m[0];
            n[1] = n[0];
            h[1] = h[0];
            V[1] = V[0];
            // p[1] = p[0];
            // q[1] = q[0];
            Ileak[1] = Ileak[0];
            I_Naflag = true;

            //console.log('counter',stim_counter)

            var predictordV1 = find_dv(IstimArr[stim_counter])
            //console.log(predictordV1)

            m[3] = m[0];
            n[3] = n[0];
            // p[3] = p[0];
            // q[3] = q[0];
            h[3] = h[0];
            V[3] = V[0];
            Ileak[3] = Ileak[0];
            I_Naflag = false;


            var predictordV2 = find_dv(IstimArr[stim_counter])

            var corrector_dv = 0.5 * (predictordV1 + predictordV2)
            //console.log(predictordV1,predictordV2)
            //console.log('corrector',corrector_dv)
            m[2] = m[0];
            n[2] = n[0];
            p[2] = p[0];
            q[2] = q[0];
            h[2] = h[0];
            Ileak[2] = 0.5 * (Ileak[0] + Ileak[3]);
            V[2] = V[0];

            m[2] = 0.5 * (m[0] + m[3]);
            h[2] = 0.5 * (h[0] + h[3]);
            n[2] = 0.5 * (n[0] + n[3]);
            // p[2] = 0.5 * (p[0] + p[3]);
            // q[2] = 0.5 * (q[0] + q[3]);

            console.log(m[2])
            var errorval1 = Math.abs(predictordV1 - corrector_dv);
            var errorval2 = errorval1 / dt

            var errorval5 = Math.abs(n[3] - n[2]);


            if (errorval2 > 30 || errorval5 > 0.01) {

                changestepflag = 1;
                m[0] = m[1];
                n[0] = n[1];
                h[0] = h[1];
                //  p[0] = p[1];
                //  q[0] = q[1];
                V[0] = V[1];
                Ileak[0] = Ileak[1];
                dt = dt / 2;
            }


        }

        stim_counter++;
        m[0] = m[2];
        n[0] = n[2];
        //p[0] = p[2];
        //q[0] = q[2];
        h[0] = h[2];
        V[0] = V[2];

        Ileak[0] = Ileak[2];

        //console.log('mee',corrector_dv)

        V[0] = V[0] + corrector_dv


        if (errorval2 < 10 && errorval5 < 0.003 && dt < 0.0001) {
            dt = dt * 2
        }
        rec_time = rec_time+dt
        
        time_data.push(parseFloat(rec_time.toFixed(3)))


        //p_data.push(p[0].toFixed(3));
        //q_data.push(q[0].toFixed(3));
        //console.log(corrector_dv)
        //console.log('me',m[0],n[0],h[0],V[0])
        //iuser_data.push(I_User[0].toFixed(3) * -1);
        //guser_data.push(g_User[0].toFixed(3));
        console.log(m[0])
        m_data.push(parseFloat(m[0].toFixed(3)));
        h_data.push(parseFloat(h[0].toFixed(3)));
        n_data.push(parseFloat(n[0].toFixed(3)));
        v_data.push(parseFloat(V[0].toFixed(3)) * 1000);
        ileak_data.push(parseFloat(Ileak[0].toFixed(3)));
        ina_data.push(parseFloat(I_Na[0].toFixed(3)));
        ik_data.push(parseFloat(I_K[0].toFixed(3)));
        gna_data.push(parseFloat(g_Na[0].toFixed(3)));
        gk_data.push(parseFloat(g_K[0].toFixed(3)));









    }



    var voltage_current = Highcharts.stockChart('voltage-current', {

        rangeSelector: {
            enabled: false
        },

        title: {
            text: 'Membrane Voltage'
        },

        series: [{
            name: 'mV',
            data: v_data,

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





//console.log(m_data)
