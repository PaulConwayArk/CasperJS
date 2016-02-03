/**
 * Created by paulc_000 on 02/02/2016.
 */

/*casper.start("https://sede.gobcan.es/tributos/jsf/publico/notificaciones/comparecencia/ultimosanuncios.jsp", function() {

    var res = this.page.evaluate(function() {
        var res={};
        f=document.forms["resultadoUltimasNotif"];
        f.onsubmit= function() {
            //iterate the form fields
            var post={};
            for(i=0; i<f.elements.length; i++) {
                post[f.elements[i].name]=f.elements[i].value;
            }
            res.action = f.action;
            res.post = post;
            return false; //Stop form submission
        }

        //Trigger the click on the link.
        var l = $("table.listado tbody tr:first a");
        l.click();

        return res; //Return the form data to casper
    });

    //Start the download
    casper.download(res.action, "bol-atc-2016-004.pdf", "POST", res.post);
});

casper.run();*/


casper.start();

casper.thenOpen('http://www.fangraphs.com/projections.aspx?pos=all&stats=pit&type=steameru', function() {
    var postbody = this.page.evaluate(function() {
        $('#__EVENTTARGET').val('ProjectionBoard1$cmdCSV');
        return $('#form1').serialize();
    });
    casper.download('http://www.fangraphs.com/projections.aspx?pos=all&stats=pit&type=steameru', 'fg_pitc1hers.csv', 'POST', postbody);
});

casper.run();