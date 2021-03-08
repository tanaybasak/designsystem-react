#!/usr/bin/env groovy

import groovy.json.JsonSlurper

AUTH_TOKEN = "ananthv:5d01a4f32cad245134189f08f9e942134c1ad07a"
// projects_name = "CSS"
GITHUB_API = ""
TOTAL_PAGES = 0

if(projects_name.equals('CSS')) {
    GITHUB_API = "https://github01.hclpnp.com/api/v3/repos/ananthv/jenkins-test-build/branches"
    // GITHUB_API = "https://github01.hclpnp.com/api/v3/repos/UXUIAssets/patron-css/branches"
    TOTAL_PAGES = getNumberofPagesinRepo('css')
    if(TOTAL_PAGES.equals('LESS30')) {
        TOTAL_PAGES = 1
        return getBranchNamesFromPage('css');
    } else {
        return getBranchNamesFromPage('css');
    }
} else {
 return ['Please select a tag']
}

def getBranchNamesFromPage(which) {
    def branchList = []
    for(int i = 1; i<=TOTAL_PAGES; i++) {
        def command = "curl -u ${AUTH_TOKEN} ${GITHUB_API}" + "?page=${i}"
        def proc = command.execute()
        // proc.waitForProcessOutput()
        def out = proc.text
        // Parse text to json
        JsonSlurper jsonSlurper = new JsonSlurper()
        def json_data = jsonSlurper.parseText(out)
        json_data.each {
            String name = "$it.name"
            if(name.startsWith("test")) {
                branchList.add(new String("$it.name"))
            }
        }
    }

    return branchList
}

//@getNumberofPagesinRepo() method to make JSON data
def getNumberofPagesinRepo(which) { 
     def command = "curl -I -u ${AUTH_TOKEN} ${GITHUB_API}"
     def proc = command.execute()
    //  proc.waitForProcessOutput()
     def out = proc.text

    Integer startIndex = out.indexOf('Link:')
    println startIndex
    if(startIndex >= 0) {
        def fromlinkString = out.substring(startIndex)
        def linkString = fromlinkString.substring(0, fromlinkString.indexOf('\n'))
        def splittedlinkString = linkString.split(',')
        def splittedlastlinkString = ''
        Integer total_pages = 0;
        if(splittedlinkString[1]) {
            splittedlastlinkString = splittedlinkString[1]
            total_pages = Integer.parseInt(splittedlastlinkString.substring(splittedlastlinkString.indexOf('=') + 1, splittedlastlinkString.indexOf('>')))
        }
        return total_pages
    } else {
        // LESS THAN OR EQUAL TO 30 BRANCHES HANDLING
        return 'LESS30'
    }
}


