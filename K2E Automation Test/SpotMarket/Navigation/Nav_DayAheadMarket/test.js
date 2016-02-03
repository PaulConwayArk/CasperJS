/**
 * Created by paulc_000 on 13/01/2016.
 */
var URL = 'http://k4view-test-k2e.azurewebsites.net/portal/';
var imageType = '.png';
var imageLocation = 'img/';
var username ='paul.conway@ark-energy.eu';
var password ='Ballygarve1993';
var loginURL='/login.microsoftonline.com/';
var workOrSchoolAccount ='#aad_account_tile_link';
var personalAccount ='#mso_account_tile_link';
var userAccount = workOrSchoolAccount;
var DAMar = '#DayAheadMarket';
var Page = '';
var Market = '#IntraDayMarket';
var PageChange = Market;
var NavLocation = "spotMarketOnClick";


//Test Login Page
casper.test.begin('UserLogin',function UserLogin(test)
{
    var loginButtonFailed = false;
    //Make Sure Correct Page is opened
    casper.start(URL, function()
    {
        this.reload();
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
            this.wait(1000);
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


casper.test.begin("Nav Spot Market --> "+PageChange+"",function (test)
{
    var navOpened = false;
    casper.start();

    //Set Size of Captured Screenshot
    casper.viewport(1280, 728, function () {});

    //Check if the nav bar is opened
    casper.then(function ()
    {
        if (this.visible('nav ul li[class="'+NavLocation+' open"]'))
        {
            //If the nav bar is opened, navOpened user as true
            navOpened = true;
        }
        else
        {
            //If the nav bar is not opened, set navOpened to false
            navOpened = false;
        }
    });

    //If the Nav bar is already opened, skip the next step and continue
    casper.thenBypassIf(function()
    {
        return navOpened === true;
    }, 1 );

    casper.waitForSelector("nav ul li[class='"+NavLocation+"'] a",
        function success()
        {
            console.log('Checking if Nav Ul Li Exists');
            //Checking that Nav Ul Li Exists on Page
            test.assertExists("nav ul li[class='"+NavLocation+"'] a", "TEST1 --Nav Ul Li Exists");
            console.log('Clicking on Menu');
            //Clciking on the Nav button to open the tab
            this.click("nav ul li[class='"+NavLocation+"'] a");
        },
        function fail()
        {
            console.log('TEST1 --Nav Ul Li Selector Failed');
            casper.capture(imageLocation+"Nav_'"+PageChange+"'_Test1_Fail"+imageType);
        });

    casper.waitForSelector("a[href='"+PageChange+"'] i",
        function success()
        {
            console.log("Checking "+PageChange+" Exists");
            //Checking that Nav Ul Li Exists on Page
            test.assertExists("a[href='"+PageChange+"'] i", "TEST2 --href "+PageChange+" Exists");
            console.log("Clicking on "+PageChange+" ");
            //Clciking on the Nav button to open the tab
            this.click("a[href='"+PageChange+"'] i");
        },
        function fail()
        {
            console.log("TEST2 --href "+PageChange+" Exists");
            casper.capture(imageLocation+"Nav_'"+PageChange+"'_Test2_Fail"+imageType);
        });


    //Make sure that the correct page change, after clicking on button
    casper.waitForUrl(URL + PageChange,
        function success()
        {
            test.assertUrlMatch(URL + PageChange, "TEST3 --Correct URL Change.");
        },
        function fail()
        {
            test.assertUrlMatch(URL + PageChange, "TEST3 --InCorrect URL Change.");
            //Capture Image If Failed
            this.wait(5000, function()
            {
                console.log('TEST3 --InCorrect URL');
                casper.capture(imageLocation+"Nav_'"+PageChange+"'_Test3_Fail"+imageType);
            });

        },3000);

    casper.waitForSelector("a[href='"+DAMar+"']",
        function success()
        {
            console.log("Checking "+DAMar+" Exists");
            //Checking that Nav Ul Li Exists on Page
            test.assertExists("a[href='"+DAMar+"']", "TEST2 --href "+DAMar+" Exists");
            console.log("Clicking on "+DAMar+" ");
            //Clciking on the Nav button to open the tab
            this.click("a[href='"+DAMar+"']");
        },
        function fail()
        {
            console.log("TEST2 --href "+DAMar+" Exists");
            casper.capture(imageLocation+"Nav_'"+DAMar+"'_Test2_Fail"+imageType);
        });


    //Run Test
    casper.run(function()
    {
        test.done();
    });
});
