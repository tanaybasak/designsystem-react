#!/usr/bin/env groovy

import groovy.json.JsonSlurper

WHICH = 'ng'
AUTH_TOKEN = "ananthv:5d01a4f32cad245134189f08f9e942134c1ad07a"
GITHUB_API = "https://github01.hclpnp.com/api/v3/repos/UXUIAssets/patron-${WHICH}-dev/branches"

TOTAL_PAGES = getNumberofPagesinRepo(WHICH)
println 'Total Pages ' + TOTAL_PAGES

getBranchNamesFromPage(WHICH);

def getBranchNamesFromPage(which) {
    def branchList = []
    for(int i = 1; i<=TOTAL_PAGES; i++) {
        def command = "curl -u ${AUTH_TOKEN} ${GITHUB_API}" + "?page=${i}"
        def out = command.execute().text
        // Parse text to json
        JsonSlurper jsonSlurper = new JsonSlurper()
        def json_data = jsonSlurper.parseText(out)
        json_data.each {
            branchList.add(new String("$it.name"))
        }
    }

    println branchList
}

//@getNumberofPagesinRepo() method to make JSON data
def getNumberofPagesinRepo(which) { 
     def command = "curl -I -u ${AUTH_TOKEN} ${GITHUB_API}"
     def out = command.execute().text

    try {
        def startIndex = out.indexOf('Link:')
        if(startIndex !== -1) {
            def fromlinkString = out.substring(startIndex)
            def linkString = fromlinkString.substring(0, fromlinkString.indexOf('\n'))
            def splittedlinkString = linkString.split(',')
            def splittedlastlinkString = ''
            def total_pages = 0;
            if(splittedlinkString[1]) {
                splittedlastlinkString = splittedlinkString[1]
                total_pages = Integer.parseInt(splittedlastlinkString.substring(splittedlastlinkString.indexOf('=') + 1, splittedlastlinkString.indexOf('>')))
            }
            return total_pages
        } else {
            throw new Exception('Index is -1/String not Found')
        }
    }
    catch (Exception ex) {
        println ex
    }

}


