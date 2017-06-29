/* COMMENT
Amrita Neuron Simulator is a web based Neuron simulator for Hodgkin-Huxley, Adex and Izhikevich models written in HTML5 and Javscript.


Developed by : Joshy Alphonse & Shyam Diwakar
Computational Neuroscience & Neurophysiology Lab, School of Biotechnology, Amrita University, India.
Email: joshy01234i@gmail.com; shyam@amrita.edu
www.amrita.edu/compneuro


This files contols the dynamic behaviour of the simulator which enbles the use the simulator to run three different neuron models

*/



$("#neuron").load("hh.html");

$(".neuron-list li a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    if (this.getAttribute("value") == 'hh') {
        $("#neuron").load("hh.html");
        $("[name='neuron']").dropdown();

    }

    if (this.getAttribute("value") == 'izi') {
        $("#neuron").load("izi.html");
        $("[name='neuron']").dropdown();
    }
    
        if (this.getAttribute("value") == 'adex') {
        $("#neuron").load("adex.html");
        $("[name='neuron']").dropdown();
    }


});
