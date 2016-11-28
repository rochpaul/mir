package org.mycore.common.selenium.drivers;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.LocalFileDetector;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

public class MCRRemoteSauceDriverFactory extends MCRRemoteDriverFactory {

    @Override
    public DesiredCapabilities getCapabilities() {
        DesiredCapabilities caps = new DesiredCapabilities();
        String browser = readPropertyOrEnv("SELENIUM_BROWSER", "");
        if ("chrome".equals(browser)) {
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--lang=de");
            caps.setCapability(ChromeOptions.CAPABILITY, options);
        }
        if ("firefox".equals(browser)) {
            FirefoxProfile profile = new FirefoxProfile();
            profile.setPreference("intl.accept_languages", "de");
            caps.setCapability(FirefoxDriver.PROFILE, profile);
        }
        String version = readPropertyOrEnv("SELENIUM_VERSION", "");
        if (!version.equals("")) {
            caps.setCapability("version", version);
        }
        caps.setCapability("browserName", readPropertyOrEnv("SELENIUM_BROWSER", ""));
        caps.setCapability("platform", readPropertyOrEnv("SELENIUM_PLATFORM", ""));
        return caps;
    }

    @Override
    public WebDriver getDriver() {
        String username = readPropertyOrEnv("SAUCE_USER_NAME", "");
        String accessKey = readPropertyOrEnv("SAUCE_API_KEY", "");
        String host = readPropertyOrEnv("SELENIUM_HOST", "");
        String port = readPropertyOrEnv("SELENIUM_PORT", "");
        WebDriver remoteDriver = null;
        System.out.println("https://" + username + ":" + accessKey + "@" + host + ":" + port + "/wd/hub");
        try {
            remoteDriver = new RemoteWebDriver(
                    new URL("https://" + username + ":" + accessKey + "@" + host + ":" + port + "/wd/hub"), getCapabilities());
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return remoteDriver;
        }
        remoteDriver.manage().window().setSize(new Dimension(dimX, dimY));
        remoteDriver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        ((RemoteWebDriver) remoteDriver).setFileDetector(new LocalFileDetector());
        return remoteDriver;
    }

    public static String readPropertyOrEnv(String key, String defaultValue) {
        String v = System.getProperty(key);
        if (v == null)
            v = System.getenv(key);
        if (v == null)
            v = defaultValue;
        return v;
    }

}
