/**
 * Created by paulc_000 on 04/02/2016.
 */

var URL = 'https://k4view-test-k2e.azurewebsites.net/portal/';
//Save img as a .png or .jpg
var imageType = '.png';
//save images in what folder directory
var imageLocation = 'img/';
//users email addresss
var username ='paul.conway@ark-energy.eu';
//users password
var password ='Ballygarve1993';
//Microsoft Azure login URL
var loginURL='/login.microsoftonline.com/';
//Microsoft Account type: workOrSchoolAccount
var workOrSchoolAccount ='#aad_account_tile_link';
//Microsoft Account type: personalAccount
var personalAccount ='#mso_account_tile_link';
//Microsoft Account Selected
var userAccount = workOrSchoolAccount;
//Index page URL
var DAMar = '#FranceShortTermPower';
//Index page URL
var Page = '';
//If the page changes, select URl here
var Market = '#FranceShortTermPower';
var PageChange = Market;
//Navigation bar location
var NavLocation = "spotMarketOnClick";
//Widget ID
var widgetID = "wid-id-905";
//Widget Title
var widgetTitle = "Outages_of_Generation_Units_daily_average";
//Needed to add this title as the title is as shown above but it wont save a image with a ":" within it
var widgetTitle2 ="Outages of Generation Units (daily average)";
//Can we configure the component
//If we can, set to true
//if we cant set to false
var config = true;


//Test Login Page
casper.test.begin('UserLogin',function UserLogin(test)
{
    //Make Sure Correct Page is opened
    casper.start(URL, function()
    {
        this.reload();
        console.log("EXPECTED NUMBER OF TEST: 27");
        //Check if the Title of the Page is correct
        console.log('Check if the Title of the Page is correct');
        test.assertTitle("K4VIEW", "TEST1 --K2E Portal Title is correct");
        console.log('Title of page is correct');
    });

    //Set Size of Captured Screenshot
    casper.viewport(1280, 728, function () {});

    //Check for Login Button Test
    //If login button Exist, Click button
    //If login button does not Exist, fail test
    casper.waitForSelector("#logInButton",
        function success()
        {
            console.log('Checking if Login Button Exists');
            test.assertExists("#logInButton", "TEST2 --LoginButton Exists");
            console.log('Clicking on Login Button');
            this.click("#logInButton");
        },
        function fail()
        {
            console.log('TEST2 --Login Button Failed');
            casper.capture(imageLocation+'Login_Test2_Fail'+imageType);
            loginButtonFailed = true;
        });

    //User is then Redirected to
    casper.waitForUrl(loginURL,
        function success()
        {
            test.assertUrlMatch(loginURL , "TEST3 --Login page detected.");
            //Wait 1 second
            this.wait(1000);
        },
        function fail()
        {
            //Capture Image If Failed
            console.log('TEST3 --Login page was not detected');
            casper.capture(imageLocation+'Login_Test3_Fail'+imageType);
        },3000);

    /*
     * Check if the username, password fields and Sign In buttons Exist
     * Enter in user information
     */

    //USERNAME
    //Check is the username filed exists.
    casper.waitForSelector("input#cred_userid_inputtext",
        function success()
        {
            console.log('Checking Username');
            test.assertExists("input#cred_userid_inputtext", "TEST4 --Username field found.");
            this.click("input#cred_userid_inputtext");
        },
        function fail()
        {
            //Capture Image If Failed
            console.log('TEST4 --Username field was not found.');
            casper.capture(imageLocation+'Login_Test4_Fail'+imageType);
        });

    //Enter in users username
    casper.then(function ()
    {
        console.log('Username being Entered');
        this.sendKeys("input#cred_userid_inputtext", username, {keepFocus: true, reset:true});
        //Wait 1 second
        this.wait(1000);
    });
    //PASSWORD
    //Check is the username filed exists.
    casper.waitForSelector("input#cred_password_inputtext",
        function success()
        {
            console.log('Checking Password');
            test.assertExists("input#cred_password_inputtext", "TEST5 --Password field found.");
            this.click("input#cred_password_inputtext");
        },
        function fail()
        {
            //Capture Image If Failed
            console.log('TEST5 --Password field not found');
            casper.capture(imageLocation+'Login_Test5_Fail'+imageType);
        });

    //Enter in users password
    casper.then(function ()
    {
        console.log('Password being Entered');
        this.sendKeys("input#cred_password_inputtext", password, {keepFocus: true, reset:true });
        //Wait 1 second
        this.wait(1000);
    });

    //Select Account Type
    casper.waitForSelector(userAccount,
        function success()
        {
            console.log('Checking Account Type');
            test.assertExists(userAccount, "TEST6 --Account Type button found.");
            console.log('Clicking Account Type Button');
            //Wait 1 second
            this.wait(1000);
            this.click(userAccount);
        },
        function fail()
        {
            //Capture Image If Failed
            console.log('TEST6 --Account Type button not found.');
            casper.capture(imageLocation+'Login_Test6_Fail'+imageType);
        });

    //SIGN IN
    //Check does the Sign Button Exist, if it does click it
    casper.waitForSelector("#cred_sign_in_button",
        function success()
        {
            console.log('Checking if Sign button Exists');
            test.assertExists("#cred_sign_in_button", "TEST7 --Sign In button found.");
            console.log('Clicking Sign In Button');
            this.click("#cred_sign_in_button");
            //Wait 1 second
        },
        function fail()
        {
            //Capture Image If Failed
            console.log('TEST7 --Sign In button found.');
            casper.capture(imageLocation+'Login_Test7_Fail'+imageType);
        });

    //Check URL to verify login
    casper.waitForUrl(URL + Page,
        function success()
        {
            test.assertUrlMatch(URL + Page, "TEST8 --Correct URL.");
            //Wait 1 second
            this.wait(1000);
        },
        function fail()
        {
            test.assertUrlMatch(URL + Page, "TEST8 --InCorrect URL.");
            //Capture Image If Failed
            this.wait(1000, function()
            {
                console.log('TEST8 --InCorrect URL');
                casper.capture(imageLocation+'Login_Test8_Fail'+imageType);
            });

        },3000);


    //Run Test
    casper.run(function()
    {
        test.done();

    });
});


casper.test.begin("Widget --> "+widgetTitle+"",function (test)
{
    var navOpened = false;

    casper.start();

    //Set Size of Captured Screenshot
    casper.viewport(1550, 1000, function () {});

    //Check if widget Exists
    casper.waitForSelector("#"+widgetID,
        function success()
        {
            console.log("Checking if Widget_"+widgetID+" Exists");
            test.assertExists("#"+widgetID+"", "TEST1 --"+widgetID+" Exists");
        },
        function fail()
        {
            console.log("TEST1 --Widget id "+widgetID+" Does not Exists");
            casper.capture(imageLocation+'Widget_'+widgetID+'_Test1_Fail'+imageType);
        });


    //Check for name of widget
    casper.waitForSelector("header h2[title='"+widgetTitle2+"']",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle2+" Title Exists");
            test.assertExists("header h2[title='"+widgetTitle2+"']", "TEST2 --"+widgetTitle2+" is Correct");
        },
        function fail()
        {
            console.log("TEST2 --Widget Title "+widgetTitle2+" Does not Exists");
            casper.capture(imageLocation+'Widget_'+widgetTitle2+'_Test2_Fail'+imageType);
        });

    //Check if widget Menu Exists
    casper.waitForSelector("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls']",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" Menu Exists");
            test.assertExists("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls']", "TEST3 --"+widgetTitle+" Menu Exists");
        },
        function fail()
        {
            console.log("TEST3 --Widget Menu "+widgetTitle+" Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test3_Fail'+imageType);
        });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Within the Menu check for the following:
    //Configure Button

    //Check if the configuration button exists
    casper.waitForSelector("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure']",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" Configure Button Exists");
            test.assertExists("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure']", "TEST4 --"+widgetTitle+" Configure Button Exists");
            console.log("Clicking on Configure Button");
            this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        },
        function fail()
        {
            console.log("TEST4 --Widget Menu "+widgetTitle+" Configure Button Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test4_Fail'+imageType);
        });

    //Download Data Button
    casper.waitForSelector("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Download Data']",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" the Download Button Exists");
            test.assertExists("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Download Data']", "TEST7 --"+widgetTitle+" Download Button Exists");
            console.log("Clicking on Download Button");
            this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Download Data'] i");

            this.download(this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Download Data'] i"), widgetTitle2+".xlsx" );
            //Screen Capture
            this.wait(1000, function()
            {
                casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'DownloadData'+imageType);
            });
        },
        function fail()
        {
            console.log("TEST7 --Widget Menu "+widgetTitle+" Download Button Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test7_Fail'+imageType);
        });


    //Collapse Button
    casper.waitForSelector("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Collapse'] i",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" the Collapse Button Exists");
            test.assertExists("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Collapse'] i", "TEST8 --"+widgetTitle+" Collapse Button Exists");
            console.log("Clicking on Collapse Button");
            this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Collapse'] i");

            //For some reason, casper collapse the component, this is to reopen it
            this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Collapse'] i");

            //Screen Capture
            this.wait(1000, function()
            {
                casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'CollapseClose'+imageType);
            });
        },
        function fail()
        {
            console.log("TEST8 --Widget Menu "+widgetTitle+" Collapse Button Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test8_Fail'+imageType);
        });

    //Reopen the component after it has been collapsed
    casper.then(function()
    {
        console.log("Clicking on Collapse Button to Maximise");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Collapse'] i");
        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'CollapseReopen'+imageType);
        });
    });

    //Fullscreen Button
    casper.waitForSelector("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Fullscreen'] i",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" the Download Button Exists");
            test.assertExists("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Fullscreen'] i", "TEST9 --"+widgetTitle+" Download Button Exists");
            console.log("Clicking on Download Button");
            this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Fullscreen'] i");

            //For some reason, casper collapse the component, this is to reopen it
            this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Collapse'] i");

            //Screen Capture
            this.wait(1000, function()
            {
                casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Fullscreen'+imageType);
            });
        },
        function fail()
        {
            console.log("TEST9 --Widget Menu "+widgetTitle+" Download Button Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test9_Fail'+imageType);
        });

    //Make component to normal size
    casper.then(function()
    {
        console.log("Clicking on Fullscreen Button to normal Size");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Fullscreen'] i");

        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'FullscreenNormalSize'+imageType);
        });
    });

    //Download chart Button, to download images, pdf, svg and able to print the component selected
    //Check if the download button exists
    casper.waitForSelector("div[id='"+widgetID+"'] svg g[class='highcharts-button']",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" Download Chart Button Exists");
            test.assertExists("div[id='"+widgetID+"'] svg g[class='highcharts-button']", "TEST12 --"+widgetTitle+" Download Chart Button Exists");
            this.wait(2000);
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test12'+imageType);
        },
        function fail()
        {
            console.log("TEST12 --Widget Menu "+widgetTitle+" Download Chart Button Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test12_Fail'+imageType);
        });

    //Click download button if it Exists
    casper.then(function()
    {
        console.log("Clicking on Download Chart Button");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-button']");
        //Screen Capture
        this.wait(3000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'DownloadChartClicked'+imageType);
        });
    });

    //Check if the print button Exists
    casper.waitForSelector("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(1)",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" Print Chart Button Exists");
            test.assertExists("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(1)", "TEST13 --"+widgetTitle+" Download Chart Button Exists");
        },
        function fail()
        {
            this.wait(3000);
            console.log("TEST13 --Widget Menu "+widgetTitle+" Download Chart Button Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test13_Fail'+imageType);
        });

    //Click on print chart
    casper.then(function()
    {
        console.log("Clicking on Print Chart Button");
        this.click("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(1)");
        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'PrintChart'+imageType);
        });
    });

    //Check if the download PNG button Exists
    casper.waitForSelector("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(3)",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" Print PNG Button Exists");
            test.assertExists("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(3)", "TEST14 --"+widgetTitle+" Download PNG Button Exists");
        },
        function fail()
        {
            console.log("TEST14 --Widget Menu "+widgetTitle+" Download PNG Button Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test14_Fail'+imageType);
        });

    //Click on download PNG
    casper.then(function()
    {
        console.log("Clicking on PNG Chart Button");
        this.click("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(3)");
        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'PNGChart'+imageType);
        });
    });

    //Check if the download JPEG button Exists
    casper.waitForSelector("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(4)",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" Print JPEG Button Exists");
            test.assertExists("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(4)", "TEST15 --"+widgetTitle+" Download JPEG Button Exists");
        },
        function fail()
        {
            console.log("TEST15 --Widget Menu "+widgetTitle+" Download JPEG Button Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test15_Fail'+imageType);
        });

    //Click on download JPEG
    casper.then(function()
    {
        console.log("Clicking on JPEG Chart Button");
        this.click("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(4)");
        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'JPEGChart'+imageType);
        });
    });

    //Check if the download PDF button Exists
    casper.waitForSelector("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(5)",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" Print PDF Button Exists");
            test.assertExists("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(5)", "TEST16 --"+widgetTitle+" Download PDF Button Exists");
        },
        function fail()
        {
            console.log("TEST16 --Widget Menu "+widgetTitle+" Download PDF Button Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test16_Fail'+imageType);
        });

    //Click on download PDF
    casper.then(function()
    {
        console.log("Clicking on PDF Chart Button");
        this.click("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(5)");
        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'PDFChart'+imageType);
        });
    });

    //Check if the download SVG button Exists
    casper.waitForSelector("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(6)",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" Print SVG Button Exists");
            test.assertExists("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(6)", "TEST17 --"+widgetTitle+" Download SVG Button Exists");
        },
        function fail()
        {
            console.log("TEST17 --Widget Menu "+widgetTitle+" Download SVG Button Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test17_Fail'+imageType);
        });

    //Click on download SVG
    casper.then(function()
    {
        console.log("Clicking on SVG Chart Button");
        this.click("div[id='"+widgetID+"'] div[class='highcharts-contextmenu'] div div:nth-child(6)");
        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'SVGChart'+imageType);
        });
    });

    //Click on Legend
    //See if the Legend Exists
    casper.waitForSelector("div[id='"+widgetID+"'] svg g[class='highcharts-legend']",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" Legend Exists");
            test.assertExists("div[id='"+widgetID+"'] svg g[class='highcharts-legend']", "TEST18 --"+widgetTitle+" Legend Exists");
        },
        function fail()
        {
            console.log("TEST18 --Widget Menu "+widgetTitle+" Legend Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test18_Fail'+imageType);
        });

    //If the legend Exists, click on each item of the legend until no data is present
    //Check if the first child of the legend exists
    casper.waitForSelector("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(1)",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" Legend first child Exists");
            test.assertExists("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(1)", "TEST19 --"+widgetTitle+" first child of the Legend Exists");
        },
        function fail()
        {
            console.log("TEST19 --Widget Menu "+widgetTitle+" first child of the Legend Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test19_Fail'+imageType);
        });

    //Click first child of the legend
    casper.then(function()
    {
        console.log("Clicking first child of the Legends Button");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(1)");
        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Legend_1_Clicked'+imageType);
        });
    });

    //Click second child of the legend
    casper.then(function()
    {
        console.log("Clicking second child of the Legends Button");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(2)");
        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Legend_2_Clicked'+imageType);
        });
    });

    //Click third child of the legend
    casper.then(function()
    {
        console.log("Clicking third child of the Legends Button");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(3)");
        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Legend_3_Clicked'+imageType);
        });
    });

    //Click fourth child of the legend
    casper.then(function()
    {
        console.log("Clicking fourth child of the Legends Button");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(4)");
        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Legend_4_Clicked'+imageType);
        });
    });

    //Click fifth child of the legend
    casper.then(function()
    {
        console.log("Clicking fifth child of the Legends Button");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(5)");
        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Legend_5_Clicked'+imageType);
        });
    });

    //Click sixth child of the legend
    casper.then(function()
    {
        console.log("Clicking sixth child of the Legends Button");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(6)");
        //Screen Capture
        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Legend_6_Clicked'+imageType);
        });
    });

    //Click second child of the legend
    casper.then(function()
    {
        console.log("Clicking second child of the Legends Button");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(1)");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(2)");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(3)");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(4)");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(5)");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(6)");
    });

    //Run Test
    casper.run(function()
    {
        test.done();
    });
});


