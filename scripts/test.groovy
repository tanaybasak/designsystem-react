#!/usr/bin/env groovy

def url = 'ananthv:5d01a4f32cad245134189f08f9e942134c1ad07a https://github01.hclpnp.com/api/v3/repos/UXUIAssets/patron-css-dev/tags';
println("Output : " + executeCurlCommand(url));

def static executeCurlCommand(URL){
    def url = "curl -i -u" + URL;
    def proc = url.execute();
    def outputStream = new StringBuffer();
    proc.waitForProcessOutput(outputStream, System.err)
    return outputStream.toString();
}