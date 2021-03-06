/**
 * Created by paulc_000 on 03/02/2016.
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
var DAMar = '#CCCAuction';
//Index page URL
var Page = '';
//If the page changes, select URl here
var Market = '#CCCAuction';
var PageChange = Market;
//Navigation bar location
var NavLocation = "spotMarketOnClick";
//Widget ID
var widgetID = "wid-id-700";
//Widget Title
var widgetTitle = "Historical_CCC_Analysis_daily";
//Needed to add this title as the title is as shown above but it wont save a image with a ":" within it
var widgetTitle2 ="Historical CCC Analysis (daily)";
//Can we configure the component
//If we can, set to true
//if we cant set to false
var config = true;


//Test Login Page
casper.test.begin('UserLogin',function UserLogin(test)
{
    //Make Sure Correct Page is opened
    casper.start(URL + Market, function()
    {
        this.reload();
        console.log("EXPECTED NUMBER OF TEST: 16");
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
    casper.waitForSelector("header h2[title='"+widgetTitle2+"']",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle2+" Title Exists");
            test.assertExists("header h2[title='"+widgetTitle2+"']", "TEST2 --"+widgetTitle+" is Correct");
        },
        function fail()
        {
            console.log("TEST2 --Widget Title "+widgetTitle+" Does not Exists");
            casper.capture(imageLocation+'Widget_'+widgetTitle+'_Test2_Fail'+imageType);
        });

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
        this.click("div[class='btn-group open'] ul li:nth-child(2) a");
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
        this.click("div[class='btn-group open'] ul li:nth-child(3) a");
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
        this.click("div[class='btn-group open'] ul li:nth-child(4) a");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Config_Graph_4'+imageType);
        });
    });

    //Capture Image for Graph 5
    casper.then(function()
    {
        console.log("Downloading Config_Graph_5");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='btn-group open'] ul li:nth-child(5) a");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Config_Graph_5'+imageType);
        });
    });

    //Capture Image for Graph 6
    casper.then(function()
    {
        console.log("Downloading Config_Graph_6");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='btn-group open'] ul li:nth-child(6) a");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Config_Graph_6'+imageType);
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

    //Configure Profile in Configuration Menu
    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(2) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(2) ul li:nth-child(1)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Profile_1'+imageType);
        });
    });

    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(2) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(2) ul li:nth-child(2)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Profile_2'+imageType);
        });
    });

    //Configure Month in Configuration Menu
    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) ul li:nth-child(1)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Jan_1'+imageType);
        });
    });

    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) ul li:nth-child(2)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Feb_2'+imageType);
        });
    });

    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) ul li:nth-child(3)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Mar_3'+imageType);
        });
    });

    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) ul li:nth-child(4)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Apr_4'+imageType);
        });
    });

    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) ul li:nth-child(5)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'May_5'+imageType);
        });
    });

    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) ul li:nth-child(6)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Jun_6'+imageType);
        });
    });

    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) ul li:nth-child(7)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Jul_7'+imageType);
        });
    });

    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) ul li:nth-child(8)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Aug_8'+imageType);
        });
    });

    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) ul li:nth-child(9)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Sep_9'+imageType);
        });
    });

    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) ul li:nth-child(10)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Oct_10'+imageType);
        });
    });

    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) ul li:nth-child(11)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Nov_11'+imageType);
        });
    });

    casper.then(function()
    {
        console.log("Downloading Config_Graph_2");
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) button[class='btn btn-primary dropdown-toggle']");
        this.click("div[class='configDropDownHolder row'] div:nth-child(3) ul li:nth-child(12)");
        this.click("button[id='apply']");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'Dec_12'+imageType);
        });
    });

    //CheckBox
    //Click on the 2010 and capture image of change on table
    casper.waitForSelector("span[class='gridCheckboxEdit'] label input",
        function success()
        {
            console.log("Checking if Widget_"+widgetTitle+" Check Box Exists");
            test.assertExists("span[class='gridCheckboxEdit'] label input[id='2010']", "TEST8 --"+widgetTitle+" Check Box Exists");
            console.log("Clicking on Check Box");
            this.click("span[class='gridCheckboxEdit'] label input[id='2010']");
            this.click("button[id='apply']");

            console.log("Downloading CheckBox_Check_Check_1");
            this.wait(1000, function()
            {
                casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'CheckBox_Check_1'+imageType);
            });
        },
        function fail()
        {
            console.log("TEST8 --Widget Menu "+widgetTitle+" Check Box Does not Exists");
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'_Test8_Fail'+imageType);
        });

    casper.then(function()
    {
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("span[class='gridCheckboxEdit'] label input[id='2011']");
        this.click("button[id='apply']");
        console.log("Downloading CheckBox_Check_Check_2");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'CheckBox_Check_Check_2'+imageType);
        });
    });

    casper.then(function()
    {
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("span[class='gridCheckboxEdit'] label input[id='2012']");
        this.click("button[id='apply']");
        console.log("Downloading CheckBox_Check_Check_3");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'CheckBox_Check_Check_3'+imageType);
        });
    });

    casper.then(function()
    {
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("span[class='gridCheckboxEdit'] label input[id='2013']");
        this.click("button[id='apply']");
        console.log("Downloading CheckBox_Check_Check_4");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'CheckBox_Check_Check_4'+imageType);
        });
    });

    casper.then(function()
    {
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("span[class='gridCheckboxEdit'] label input[id='2014']");
        this.click("button[id='apply']");
        console.log("Downloading CheckBox_Check_Check_5");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'CheckBox_Check_Check_5'+imageType);
        });
    });

    casper.then(function()
    {
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("span[class='gridCheckboxEdit'] label input[id='2014']");
        this.click("button[id='apply']");
        console.log("Downloading CheckBox_Check_Check_5");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'CheckBox_Check_Check_5'+imageType);
        });
    });

    casper.then(function()
    {
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("span[class='gridCheckboxEdit'] label input[id='2015']");
        this.click("button[id='apply']");
        console.log("Downloading CheckBox_Check_Check_6");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'CheckBox_Check_Check_6'+imageType);
        });
    });

    casper.then(function()
    {
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("span[class='gridCheckboxEdit'] label input[id='2016']");
        this.click("button[id='apply']");
        console.log("Downloading CheckBox_Check_Check_7");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'CheckBox_Check_Check_7'+imageType);
        });
    });

    casper.then(function()
    {
        this.click("div[id='"+widgetID+"'] div[class='jarviswidget-ctrls'] a[title='Configure'] i");
        this.click("span[class='gridCheckboxEdit'] label input[id='2010']");
        this.click("span[class='gridCheckboxEdit'] label input[id='2011']");
        this.click("span[class='gridCheckboxEdit'] label input[id='2012']");
        this.click("span[class='gridCheckboxEdit'] label input[id='2013']");
        this.click("span[class='gridCheckboxEdit'] label input[id='2014']");
        this.click("span[class='gridCheckboxEdit'] label input[id='2015']");
        this.click("span[class='gridCheckboxEdit'] label input[id='2016']");
        this.click("button[id='apply']");
        console.log("Un-Checking Check Boxes");

        this.wait(1000, function()
        {
            casper.capture(imageLocation+'Widget_Menu_'+widgetTitle+'CheckBox_Un-Checking_Check_4'+imageType);
        });
    });

    //Run Test
    casper.run(function()
    {
        test.done();
    });
});

