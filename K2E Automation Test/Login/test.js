/**
 * Created by Paul on 19/11/2015.
 */

var URL = 'https://k4view-test-k2e.azurewebsites.net/portal/';
var imageType = '.png';
var imageLocation = 'img/';
var username ='paul.conway@ark-energy.eu';
var password ='Killoe1993';
var loginURL='/login.microsoftonline.com/';
var workOrSchoolAccount ='#aad_account_tile_link';
var userAccount = workOrSchoolAccount;


//Test Login Page
casper.test.begin('UserLogin',function UserLogin(test)
{
    //Make Sure Correct Page is opened
    casper.start(URL, function()
    {
        //Check if the Title of the Page is correct
        this.reload();
        console.log('Check if the Title of the Page is correct');
        test.assertTitle("K4VIEW", "TEST1 --K2E Portal Title is correct");
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
            this.wait(3000, function()
            {
                console.log('TEST2 --Login Button Failed');
                casper.capture(imageLocation+'Login_Test2_Fail'+imageType);
            });
        });

    //User is then Redirected to
    casper.waitForUrl(loginURL,
        function success()
        {
            test.assertUrlMatch(loginURL , "TEST3 --Login page detected.");
            //Wait 1 second
        },
        function fail()
        {
            this.wait(3000, function()
            {
                console.log('TEST3 --Login page was not detected');
                casper.capture(imageLocation+'Login_Test3_Fail'+imageType);
            });
        });

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
            this.wait(3000, function()
            {
                console.log('TEST4 --Username field was not found.');
                casper.capture(imageLocation+'Login_Test4_Fail'+imageType);
            });
        });

    //Enter in users username
    casper.then(function ()
    {
        console.log('Username being Entered');
        this.sendKeys("input#cred_userid_inputtext", username, {keepFocus: true, reset:true});
        //Wait 1/2 second
        this.wait(500);
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
            this.wait(3000, function()
            {
                console.log('TEST5 --Password field not found');
                casper.capture(imageLocation+'Login_Test5_Fail'+imageType);
            });
        });

    //Enter in users password
    casper.then(function ()
    {
        console.log('Password being Entered');
        this.sendKeys("input#cred_password_inputtext", password, {keepFocus: true, reset:true });
        //Wait 1 second
        this.wait(250);
    });

    //Select Account Type
    casper.waitForSelector(userAccount,
        function success()
        {
            console.log('Checking Account Type');
            test.assertExists(userAccount, "TEST6 --Account Type button found.");
            console.log('Clicking Account Type Button');
            this.wait(250);
            this.click(userAccount);
        },
        function fail()
        {
            this.wait(3000, function()
            {
                console.log('TEST6 --Account Type button not found.');
                casper.capture(imageLocation+'Login_Test6_Fail'+imageType);
            });
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
            this.wait(250);
        },
        function fail()
        {
            this.wait(3000, function()
            {
                console.log('TEST7 --Sign In button found.');
                casper.capture(imageLocation+'Login_Test7_Fail'+imageType);
            });
        });

    //Check URL to verify login
    casper.waitForUrl(URL + Page,
        function success()
        {
            test.assertUrlMatch(URL + Page, "TEST8 --Correct URL.");
            this.wait(250);
        },
        function fail()
        {
            this.wait(3000, function()
            {
                test.assertUrlMatch(URL + Page, "TEST8 --InCorrect URL.");
                casper.capture(imageLocation+'Login_Test8_Fail'+imageType);
            });

        });

    casper.run(function()
    {
        test.done();

    });
});

