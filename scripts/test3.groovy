#!/usr/bin/env groovy

import groovy.json.JsonSlurper

if(repo_name.equals('CSS')){
    return getTags('css')
} else if(repo_name.equals('REACT')) {
    return getTags('react')
} else if(repo_name.equals('ANGULAR')) {
    return getTags('ng')
} else {
 return ['Please select a tag']
}

//@getTags() method to make JSON data
def getTags(which) { 
     def auth_token = "ananthv:5d01a4f32cad245134189f08f9e942134c1ad07a"
     def url = "curl -u ${auth_token} https://github01.hclpnp.com/api/v3/repos/UXUIAssets/patron-${which}/tags"
     def out = url.execute().text

     // Parse text to json
     JsonSlurper jsonSlurper = new JsonSlurper()
     def json_data = jsonSlurper.parseText(out)

     // Append to new List
     def newTags = []
     json_data.each {
          newTags.add(new String("$it.name"))
     }
     return newTags
}


