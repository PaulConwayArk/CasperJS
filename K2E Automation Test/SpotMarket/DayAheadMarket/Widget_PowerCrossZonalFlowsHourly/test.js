/**
 * Created by Paul on 26/11/2015.
 */

var URL = 'https://k4view-test-k2e.azurewebsites.net/portal/';
var imageType = '.png';
var imageLocation = 'img/';
var username = 'paul.conway@ark-energy.eu';
var password = 'Killoe1993';
var loginURL = '/login.microsoftonline.com/';
var workOrSchoolAccount = '#aad_account_tile_link';
var userAccount = workOrSchoolAccount;
var Page = '#DayAheadMarket';
var widgetID = "wid-id-100";
var widgetTitle = "Power CrossZonal Flows (hourly)";


//Test Login Page
casper.test.begin('UserLogin', function UserLogin(test) {
    //Make Sure Correct Page is opened
    casper.start(URL + Page, function () {
        //Check if the Title of the Page is correct
        this.reload();
        console.log('Check if the Title of the Page is correct');
        test.assertTitle("K4VIEW", "TEST1 --K2E Portal Title is correct");
    });

    //Set Size of Captured Screenshot
    casper.viewport(1280, 728, function () {
    });

    //Check for Login Button Test
    //If login button Exist, Click button
    //If login button does not Exist, fail test
    casper.waitForSelector("#logInButton",
        function success() {
            console.log('Checking if Login Button Exists');
            test.assertExists("#logInButton", "TEST2 --LoginButton Exists");
            console.log('Clicking on Login Button');
            this.click("#logInButton");
        },
        function fail() {
            this.wait(3000, function () {
                console.log('TEST2 --Login Button Failed');
                casper.capture(imageLocation + 'Login_Test2_Fail' + imageType);
            });
        });

    //User is then Redirected to
    casper.waitForUrl(loginURL,
        function success() {
            test.assertUrlMatch(loginURL, "TEST3 --Login page detected.");
            //Wait 1 second
        },
        function fail() {
            this.wait(3000, function () {
                console.log('TEST3 --Login page was not detected');
                casper.capture(imageLocation + 'Login_Test3_Fail' + imageType);
            });
        });

    /*
     * Check if the username, password fields and Sign In buttons Exist
     * Enter in user information
     */

    //USERNAME
    //Check is the username filed exists.
    casper.waitForSelector("input#cred_userid_inputtext",
        function success() {
            console.log('Checking Username');
            test.assertExists("input#cred_userid_inputtext", "TEST4 --Username field found.");
            this.click("input#cred_userid_inputtext");
        },
        function fail() {
            this.wait(3000, function () {
                console.log('TEST4 --Username field was not found.');
                casper.capture(imageLocation + 'Login_Test4_Fail' + imageType);
            });
        });

    //Enter in users username
    casper.then(function () {
        console.log('Username being Entered');
        this.sendKeys("input#cred_userid_inputtext", username, {keepFocus: true, reset: true});
        //Wait 1/2 second
        this.wait(500);
    });
    //PASSWORD
    //Check is the username filed exists.
    casper.waitForSelector("input#cred_password_inputtext",
        function success() {
            console.log('Checking Password');
            test.assertExists("input#cred_password_inputtext", "TEST5 --Password field found.");
            this.click("input#cred_password_inputtext");
        },
        function fail() {
            this.wait(3000, function () {
                console.log('TEST5 --Password field not found');
                casper.capture(imageLocation + 'Login_Test5_Fail' + imageType);
            });
        });

    //Enter in users password
    casper.then(function () {
        console.log('Password being Entered');
        this.sendKeys("input#cred_password_inputtext", password, {keepFocus: true, reset: true});
        //Wait 1 second
        this.wait(250);
    });

    //Select Account Type
    casper.waitForSelector(userAccount,
        function success() {
            console.log('Checking Account Type');
            test.assertExists(userAccount, "TEST6 --Account Type button found.");
            console.log('Clicking Account Type Button');
            this.wait(250);
            this.click(userAccount);
        },
        function fail() {
            this.wait(3000, function () {
                console.log('TEST6 --Account Type button not found.');
                casper.capture(imageLocation + 'Login_Test6_Fail' + imageType);
            });
        });

    //SIGN IN
    //Check does the Sign Button Exist, if it does click it
    casper.waitForSelector("#cred_sign_in_button",
        function success() {
            console.log('Checking if Sign button Exists');
            test.assertExists("#cred_sign_in_button", "TEST7 --Sign In button found.");
            console.log('Clicking Sign In Button');
            this.click("#cred_sign_in_button");
            this.wait(250);
        },
        function fail() {
            this.wait(3000, function () {
                console.log('TEST7 --Sign In button found.');
                casper.capture(imageLocation + 'Login_Test7_Fail' + imageType);
            });
        });

    //Check URL to verify login
    casper.waitForUrl(URL + Page,
        function success() {
            test.assertUrlMatch(URL + Page, "TEST8 --Correct URL.");
            this.wait(250);
        },
        function fail() {
            this.wait(3000, function () {
                test.assertUrlMatch(URL + Page, "TEST8 --InCorrect URL.");
                casper.capture(imageLocation + 'Login_Test8_Fail' + imageType);
            });

        });
    casper.run(function () {
        test.done();

    });
});


/*
casper.test.begin('Does ' + widgetTitle + ' Component Exist', function UserLogin(test) {
    casper.start();
    casper.viewport(1280, 728);

    //Make Sure Correct Page is opened
    casper.start(URL, function () {
        //Check if the Title of the Page is correct
        this.reload();
        console.log('Check if the Title of the Page is correct');
        test.assertTitle("K4VIEW", "TEST1 --K2E Portal Title is correct");
    });

    //Check for name of widget
    casper.waitForSelector("header h2[title='" + widgetTitle + "']",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " Title Exists");
            test.assertExists("header h2[title='" + widgetTitle + "']", "TEST2 --" + widgetTitle + " is Correct");
        },
        function fail() {
            console.log("TEST2 --Widget Title " + widgetTitle + " Does not Exists");
            casper.capture(imageLocation + 'Widget_' + widgetTitle + '_Test2_Fail' + imageType);
        });

    casper.run(function () {
        test.done();
    });
});


casper.test.begin('Does ' + widgetTitle + ' Component Configure Button Exists', function UserLogin(test) {
    casper.start();
    casper.viewport(1280, 728);

    //Check if widget Menu Exists
    casper.waitForSelector("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] i",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " Menu Exists");
            test.assertExists("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] i", "TEST3 --" + widgetTitle + " Menu Exists");
        },
        function fail() {
            console.log("TEST3 --Widget Menu " + widgetTitle + " Does not Exists");
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test3_Fail' + imageType);
        });

    //Within the Menu check for the following:
    //Configure Button
    //Check if the configuration button exists
    casper.waitForSelector("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Configure'] i",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " Configure Button Exists");
            test.assertExists("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Configure'] i", "TEST4 --" + widgetTitle + " Configure Button Exists");
            console.log("Clicking on Configure Button");
            this.click("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        },
        function fail() {
            console.log("TEST4 --Widget Menu " + widgetTitle + " Configure Button Does not Exists");
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test4_Fail' + imageType);
        });

    casper.run(function () {
        test.done();
    });
});


casper.test.begin('Does ' + widgetTitle + ' Component Configure Button Exists', function UserLogin(test) {
    casper.start();
    casper.viewport(1280, 728);

//Click on Dropdown
    casper.waitForSelector("button[class='btn btn-primary dropdown-toggle']",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " Drop Down Menu Exists");
            test.assertExists("button[class='btn btn-primary dropdown-toggle']", "TEST5 --" + widgetTitle + " Drop Down Menu Exists");
            console.log("Clicking on Drop Down Menu");
            this.click("button[class='btn btn-primary dropdown-toggle']");
        },
        function fail() {
            console.log("TEST5 --Widget Menu " + widgetTitle + " Configure Button Does not Exists");
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test5_Fail' + imageType);
        });

    //Select Border and then click apply button
    //Capture Image for Graph 1
    casper.waitForSelector("div[class='btn-group open'] ul li",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " Menu Items Exists");
            test.assertExists("div[class='btn-group open'] ul li", "TEST6 --" + widgetTitle + " Menu Items Exists");
            console.log("Clicking on Menu Item");
            this.click("div[class='btn-group open'] ul li:nth-child(1) a");
            this.click("button[id='apply']");
            console.log("Downloading Config_Graph_1");
            this.wait(500, function () {
                casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'Config_Graph_1' + imageType);
            });
        },
        function fail() {
            this.wait(500, function () {
                console.log("TEST6 --Widget Menu " + widgetTitle + " Configure Button Does not Exists");
                casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test6_Fail' + imageType);
            });
        });

    //Capture Image for Graph 2
    casper.then(function () {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='btn-group open'] ul li:nth-child(7) a");
        this.click("button[id='apply']");
        this.wait(500, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'Config_Graph_2' + imageType);
        });
    });

    //Capture Image for Graph 3
    casper.then(function () {
        console.log("Downloading Config_Graph_3");
        this.click("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='btn-group open'] ul li:nth-child(12) a");
        this.click("button[id='apply']");

        this.wait(500, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'Config_Graph_3' + imageType);
        });
    });

    //Capture Image for Graph 4
    casper.then(function () {
        console.log("Downloading Config_Graph_4");
        this.click("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='btn-group open'] ul li:nth-child(19) a");
        this.click("button[id='apply']");

        this.wait(500, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'Config_Graph_4' + imageType);
        });
    });

    casper.run(function () {
        test.done();
    });
});


casper.test.begin('Does ' + widgetTitle + ' Component Download Button Exists', function UserLogin(test) {
    casper.start();
    casper.viewport(1280, 728);

    //Download Data Button
    casper.waitForSelector("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Download Data'] i",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " the Download Button Exists");
            test.assertExists("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Download Data'] i", "TEST7 --" + widgetTitle + " Download Button Exists");
            console.log("Clicking on Download Button");
            this.click("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Download Data'] i");
            //Screen Capture
            this.wait(500, function () {
                casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'DownloadData' + imageType);
            });
        },
        function fail() {
            this.wait(500, function () {
                console.log("TEST7 --Widget Menu " + widgetTitle + " Download Button Does not Exists");
                casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test7_Fail' + imageType);
            });
        });


    casper.run(function () {
        test.done();
    });
});


casper.test.begin('Does ' + widgetTitle + ' Component Full Screen Button Exists', function UserLogin(test) {
    casper.start();
    casper.viewport(1280, 728);

    //Fullscreen Button
    casper.waitForSelector("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Fullscreen'] i",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " the Download Button Exists");
            test.assertExists("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Fullscreen'] i", "TEST9 --" + widgetTitle + " Download Button Exists");
            console.log("Clicking on Download Button");
            this.click("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Fullscreen'] i");
            this.wait(500, function () {
                casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'Fullscreen' + imageType);
            });
        },
        function fail() {
            this.wait(500, function () {
                console.log("TEST9 --Widget Menu " + widgetTitle + " Download Button Does not Exists");
                casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test9_Fail' + imageType);
            });
        });

    //Make component to normal size
    casper.then(function () {
        console.log("Clicking on Fullscreen Button to normal Size");
        this.click("div[id='" + widgetID + "'] div[class='jarviswidget-ctrls'] a[title='Fullscreen'] i");
        //Screen Capture
        this.wait(500, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'FullscreenNormalSize' + imageType);
        });
    });

    casper.run(function () {
        test.done();
    });
});


casper.test.begin('Does ' + widgetTitle + ' Component DropDown Button Exists', function UserLogin(test) {
    casper.start();
    casper.viewport(1280, 728);

    //DropDown Select new border
    //Find Border
    casper.waitForSelector("div[id='" + widgetID + "'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] button[class='btn btn-primary dropdown-toggle dropDownTextStyle']",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " the Border Button Exists");
            test.assertExists("div[id='" + widgetID + "'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] button[class='btn btn-primary dropdown-toggle dropDownTextStyle']", "TEST10 --" + widgetTitle + " Border Button Exists");
        },
        function fail() {
            console.log("TEST10 --Widget Menu " + widgetTitle + " Border Button Does not Exists");
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test10_Fail' + imageType);
        });

    casper.then(function () {
        console.log("Clicking on Border Button");
        this.click("div[id='" + widgetID + "'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] button[class='btn btn-primary dropdown-toggle dropDownTextStyle']");
        //Screen Capture
        this.wait(1000, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'BorderClick' + imageType);
        });
    });

    //Display Graph 1
    casper.waitForSelector("div[id='" + widgetID + "'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] ul[class='dropdown-menu .dropDownMenu'] li",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " Menu Items Exists");
            test.assertExists("div[id='" + widgetID + "'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] ul[class='dropdown-menu .dropDownMenu'] li", "TEST11 --" + widgetTitle + " Menu Items Exists");
            console.log("Clicking on Border Zone Border_Graph_1");
            this.click("div[id='" + widgetID + "'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] ul[class='dropdown-menu .dropDownMenu'] li:nth-child(4) a");
            console.log("Downloading Border_Graph_1");
            this.wait(1000, function () {
                casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'Border_Graph_1' + imageType);
            });
        },
        function fail() {
            console.log("TEST11 --Widget Menu " + widgetTitle + " Configure Button Does not Exists");
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test11_Fail' + imageType);
        });

    //Display Graph 2
    casper.then(function () {
        console.log("Downloading Border_Graph_2");
        this.click("div[id='" + widgetID + "'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] ul[class='dropdown-menu .dropDownMenu'] li:nth-child(3) a");
        //Screen Capture
        this.wait(1000, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'Border_Graph_2' + imageType);
        });
    });

    //Display Graph 3
    casper.then(function () {
        console.log("Downloading Border_Graph_3");
        this.click("div[id='" + widgetID + "'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] ul[class='dropdown-menu .dropDownMenu'] li:nth-child(13) a");
        //Screen Capture
        this.wait(1000, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'Border_Graph_3' + imageType);
        });
    });

    //Display Graph 4
    casper.then(function () {
        console.log("Downloading Border_Graph_4");
        this.click("div[id='" + widgetID + "'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] ul[class='dropdown-menu .dropDownMenu'] li:nth-child(16) a");
        //Screen Capture
        this.wait(1000, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'Border_Graph_4' + imageType);
        });
    });

    casper.run(function () {
        test.done();
    });
});


casper.test.begin('Does ' + widgetTitle + ' Component Configure Button Exists', function UserLogin(test) {
    casper.start();
    casper.viewport(1280, 728);

    //Download chart Button, to download images, pdf, svg and able to print the component selected
    //Check if the download button exists
    casper.waitForSelector("div[id='" + widgetID + "'] svg g[class='highcharts-button']",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " Download Chart Button Exists");
            test.assertExists("div[id='" + widgetID + "'] svg g[class='highcharts-button']", "TEST12 --" + widgetTitle + " Download Chart Button Exists");
        },
        function fail() {
            console.log("TEST12 --Widget Menu " + widgetTitle + " Download Chart Button Does not Exists");
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test12_Fail' + imageType);
        });

    //Click download button if it Exists
    casper.then(function () {
        console.log("Clicking on Download Chart Button");
        this.click("div[id='" + widgetID + "'] svg g[class='highcharts-button']");
        //Screen Capture
        this.wait(250, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'DownloadChartClicked' + imageType);
        });
    });

    //Check if the print button Exists
    casper.waitForSelector("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(1)",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " Print Chart Button Exists");
            test.assertExists("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(1)", "TEST13 --" + widgetTitle + " Download Chart Button Exists");
        },
        function fail() {
            console.log("TEST13 --Widget Menu " + widgetTitle + " Download Chart Button Does not Exists");
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test13_Fail' + imageType);
        });

    //Click on print chart
    casper.then(function () {
        console.log("Clicking on Print Chart Button");
        this.click("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(1)");
        //Screen Capture
        this.wait(250, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'PrintChart' + imageType);
        });
    });

    //Check if the download PNG button Exists
    casper.waitForSelector("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(3)",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " Print PNG Button Exists");
            test.assertExists("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(3)", "TEST14 --" + widgetTitle + " Download PNG Button Exists");
        },
        function fail() {
            console.log("TEST14 --Widget Menu " + widgetTitle + " Download PNG Button Does not Exists");
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test14_Fail' + imageType);
        });

    //Click on download PNG
    casper.then(function () {
        console.log("Clicking on PNG Chart Button");
        this.click("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(3)");
        //Screen Capture
        this.wait(250, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'PNGChart' + imageType);
        });
    });

    //Check if the download JPEG button Exists
    casper.waitForSelector("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(4)",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " Print JPEG Button Exists");
            test.assertExists("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(4)", "TEST15 --" + widgetTitle + " Download JPEG Button Exists");
        },
        function fail() {
            console.log("TEST15 --Widget Menu " + widgetTitle + " Download JPEG Button Does not Exists");
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test15_Fail' + imageType);
        });

    //Click on download JPEG
    casper.then(function () {
        console.log("Clicking on JPEG Chart Button");
        this.click("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(4)");
        //Screen Capture
        this.wait(250, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'JPEGChart' + imageType);
        });
    });

    //Check if the download PDF button Exists
    casper.waitForSelector("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(5)",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " Print PDF Button Exists");
            test.assertExists("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(5)", "TEST16 --" + widgetTitle + " Download PDF Button Exists");
        },
        function fail() {
            console.log("TEST16 --Widget Menu " + widgetTitle + " Download PDF Button Does not Exists");
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test16_Fail' + imageType);
        });

    //Click on download PDF
    casper.then(function () {
        console.log("Clicking on PDF Chart Button");
        this.click("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(5)");
        //Screen Capture
        this.wait(250, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'PDFChart' + imageType);
        });
    });

    //Check if the download SVG button Exists
    casper.waitForSelector("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(6)",
        function success() {
            console.log("Checking if Widget_" + widgetTitle + " Print SVG Button Exists");
            test.assertExists("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(6)", "TEST17 --" + widgetTitle + " Download SVG Button Exists");
        },
        function fail() {
            console.log("TEST17 --Widget Menu " + widgetTitle + " Download SVG Button Does not Exists");
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + '_Test17_Fail' + imageType);
        });

    //Click on download SVG
    casper.then(function () {
        console.log("Clicking on SVG Chart Button");
        this.click("div[id='" + widgetID + "'] div[class='highcharts-contextmenu'] div div:nth-child(6)");
        //Screen Capture
        this.wait(250, function () {
            casper.capture(imageLocation + 'Widget_Menu_' + widgetTitle + 'SVGChart' + imageType);
        });
    });

    casper.run(function () {
        test.done();
    });
});


casper.test.begin('Does ' + widgetTitle + ' Component Legend Exists', function UserLogin(test) {
    casper.start();
    casper.viewport(1280, 728);

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
        this.wait(250, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Legend_1_Clicked'+imageType);
        });
    });

    //Check if the second child of the legend exists
    casper.waitForSelector("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(2)",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" Legend second child Exists");
            test.assertExists("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(2)", "TEST20 --"+widgetTitle+" second child of the Legend Exists");
        },
        function fail()
        {
            console.log("TEST20 --Widget Menu "+widgetTitle+" first child of the Legend Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test20_Fail'+imageType);
        });

    //Click second child of the legend
    casper.then(function()
    {
        console.log("Clicking second child of the Legends Button");
        this.click("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(2)");
        //Screen Capture
        this.wait(250, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Legend_2_Clicked'+imageType);
        });
    });

    casper.run(function () {
        test.done();
    });
});
*/



 casper.test.begin("Widget --> "+widgetTitle+"",function (test)
 {
 var navOpened = false;

 casper.start();

 //Set Size of Captured Screenshot
 casper.viewport(1280, 728, function () {});

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
 casper.waitForSelector("header h2[title='"+widgetTitle+"']",
 function success()
 {
 console.log("Checking if Widget_"+widgetTitle+" Title Exists");
 test.assertExists("header h2[title='"+widgetTitle+"']", "TEST2 --"+widgetTitle+" is Correct");
 },
 function fail()
 {
 console.log("TEST2 --Widget Title "+widgetTitle+" Does not Exists");
 casper.capture(imageLocation+'Widget_'+widgetTitle+'_Test2_Fail'+imageType);
 });
 /////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////
 //Check if widget Menu Exists
 casper.waitForSelector("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] i",
 function success()
 {
 console.log("Checking if Widget_"+widgetTitle+" Menu Exists");
 test.assertExists("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] i", "TEST3 --"+widgetTitle+" Menu Exists");
 },
 function fail()
 {
 console.log("TEST3 --Widget Menu "+widgetTitle+" Does not Exists");
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test3_Fail'+imageType);
 });

 //Within the Menu check for the following:
 //Configure Button

 //Check if the configuration button exists
 casper.waitForSelector("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i",
 function success()
 {
 console.log("Checking if Widget_"+widgetTitle+" Configure Button Exists");
 test.assertExists("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i", "TEST4 --"+widgetTitle+" Configure Button Exists");
 console.log("Clicking on Configure Button");
 this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
 },
 function fail()
 {
 console.log("TEST4 --Widget Menu "+widgetTitle+" Configure Button Does not Exists");
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test4_Fail'+imageType);
 });

 //If this div exisits then there is a configuration button, if it doesnt there is no configuration button
 casper.then(function()
 {
 this.wait(1000, function()
 {
 if (this.visible("div[class='configDropdown']"))
 {
 console.log("Config is present");
 config = true;
 }
 else
 {
 console.log("We dont have a config button");
 config = false;
 }
 });
 });

 //If there is no configure button, then skip the following steps
 casper.thenBypassIf(function()
 {
 return config === false;
 }, 1 );

 //Click on Dropdown
 casper.waitForSelector("button[class='btn btn-primary dropdown-toggle']",
 function success()
 {
 console.log("Checking if Widget_"+widgetTitle+" Drop Down Menu Exists");
 test.assertExists("button[class='btn btn-primary dropdown-toggle']", "TEST5 --"+widgetTitle+" Drop Down Menu Exists");
 console.log("Clicking on Drop Down Menu");
 this.click("button[class='btn btn-primary dropdown-toggle']");
 },
 function fail()
 {
 console.log("TEST5 --Widget Menu "+widgetTitle+" Configure Button Does not Exists");
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test5_Fail'+imageType);
 });

 //Select Border and then click apply button
 //Capture Image for Graph 1
 casper.waitForSelector("div[class='btn-group open'] ul li",
 function success()
 {
 console.log("Checking if Widget_"+widgetTitle+" Menu Items Exists");
 test.assertExists("div[class='btn-group open'] ul li", "TEST6 --"+widgetTitle+" Menu Items Exists");
 console.log("Clicking on Menu Item");
 this.click("div[class='btn-group open'] ul li:nth-child(1) a");
 this.click("button[id='apply']");

 console.log("Downloading Config_Graph_1");
 this.wait(1000, function()
 {
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Config_Graph_1'+imageType);
 });

 },
 function fail()
 {
 console.log("TEST6 --Widget Menu "+widgetTitle+" Configure Button Does not Exists");
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test6_Fail'+imageType);
 });

 //Capture Image for Graph 2
 casper.then(function()
 {
 console.log("Downloading Config_Graph_2");
 this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
 this.click("button[class='btn btn-primary dropdown-toggle']");
 this.click("div[class='btn-group open'] ul li:nth-child(7) a");
 this.click("button[id='apply']");

 this.wait(1000, function()
 {
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Config_Graph_2'+imageType);
 });
 });

 //Capture Image for Graph 3
 casper.then(function()
 {
 console.log("Downloading Config_Graph_3");
 this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
 this.click("button[class='btn btn-primary dropdown-toggle']");
 this.click("div[class='btn-group open'] ul li:nth-child(12) a");
 this.click("button[id='apply']");

 this.wait(1000, function()
 {
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Config_Graph_3'+imageType);
 });
 });

 //Capture Image for Graph 4
 casper.then(function()
 {
 console.log("Downloading Config_Graph_4");
 this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
 this.click("button[class='btn btn-primary dropdown-toggle']");
 this.click("div[class='btn-group open'] ul li:nth-child(19) a");
 this.click("button[id='apply']");

 this.wait(1000, function()
 {
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Config_Graph_4'+imageType);
 });
 });

 //Download Data Button
 casper.waitForSelector("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Download Data'] i",
 function success()
 {
 console.log("Checking if Widget_"+widgetTitle+" the Download Button Exists");
 test.assertExists("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Download Data'] i", "TEST7 --"+widgetTitle+" Download Button Exists");
 console.log("Clicking on Download Button");
 this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Download Data'] i");
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

 //Border DropDown Select new border
 //Find Border
 casper.waitForSelector("div[id='"+widgetID+"'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] button[class='btn btn-primary dropdown-toggle dropDownTextStyle']",
 function success()
 {
 console.log("Checking if Widget_"+widgetTitle+" the Border Button Exists");
 test.assertExists("div[id='"+widgetID+"'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] button[class='btn btn-primary dropdown-toggle dropDownTextStyle']", "TEST10 --"+widgetTitle+" Border Button Exists");
 },
 function fail()
 {
 console.log("TEST10 --Widget Menu "+widgetTitle+" Border Button Does not Exists");
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test10_Fail'+imageType);
 });

 //Click on Border to show list of borders
 casper.then(function()
 {
 console.log("Clicking on Border Button");
 this.click("div[id='"+widgetID+"'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] button[class='btn btn-primary dropdown-toggle dropDownTextStyle']");
 //Screen Capture
 this.wait(1000, function()
 {
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'BorderClick'+imageType);
 });
 });

 //Display Graph 1
 casper.waitForSelector("div[id='"+widgetID+"'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] ul[class='dropdown-menu .dropDownMenu'] li",
 function success()
 {
 console.log("Checking if Widget_"+widgetTitle+" Menu Items Exists");
 test.assertExists("div[id='"+widgetID+"'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] ul[class='dropdown-menu .dropDownMenu'] li", "TEST11 --"+widgetTitle+" Menu Items Exists");
 console.log("Clicking on Border Zone Border_Graph_1");
 this.click("div[id='"+widgetID+"'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] ul[class='dropdown-menu .dropDownMenu'] li:nth-child(4) a");

 console.log("Downloading Border_Graph_1");
 this.wait(1000, function()
 {
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Border_Graph_1'+imageType);
 });

 },
 function fail()
 {
 console.log("TEST11 --Widget Menu "+widgetTitle+" Configure Button Does not Exists");
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test11_Fail'+imageType);
 });

 //Display Graph 2
 casper.then(function()
 {
 console.log("Downloading Border_Graph_2");
 this.click("div[id='"+widgetID+"'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] ul[class='dropdown-menu .dropDownMenu'] li:nth-child(3) a");
 //Screen Capture
 this.wait(1000, function()
 {
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Border_Graph_2'+imageType);
 });
 });

 //Display Graph 3
 casper.then(function()
 {
 console.log("Downloading Border_Graph_3");
 this.click("div[id='"+widgetID+"'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] ul[class='dropdown-menu .dropDownMenu'] li:nth-child(13) a");
 //Screen Capture
 this.wait(1000, function()
 {
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Border_Graph_3'+imageType);
 });
 });

 //Display Graph 4
 casper.then(function()
 {
 console.log("Downloading Border_Graph_4");
 this.click("div[id='"+widgetID+"'] div[class='widget-toolbar app_dropDownHolder dropDownHolder'] ul[class='dropdown-menu .dropDownMenu'] li:nth-child(16) a");
 //Screen Capture
 this.wait(1000, function()
 {
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Border_Graph_4'+imageType);
 });
 });

 //Download chart Button, to download images, pdf, svg and able to print the component selected
 //Check if the download button exists
 casper.waitForSelector("div[id='"+widgetID+"'] svg g[class='highcharts-button']",
 function success()
 {
 console.log("Checking if Widget_"+widgetTitle+" Download Chart Button Exists");
 test.assertExists("div[id='"+widgetID+"'] svg g[class='highcharts-button']", "TEST12 --"+widgetTitle+" Download Chart Button Exists");
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
 this.wait(1000, function()
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

 //Check if the second child of the legend exists
 casper.waitForSelector("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(2)",
 function success()
 {
 console.log("Checking if Widget_"+widgetTitle+" Legend second child Exists");
 test.assertExists("div[id='"+widgetID+"'] svg g[class='highcharts-legend'] g g:nth-child(2)", "TEST20 --"+widgetTitle+" second child of the Legend Exists");
 },
 function fail()
 {
 console.log("TEST20 --Widget Menu "+widgetTitle+" first child of the Legend Does not Exists");
 casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test20_Fail'+imageType);
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

 //Run Test
 casper.run(function()
 {
 test.done();
 });
 });

