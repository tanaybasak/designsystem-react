#!/usr/bin/env groovy

import groovy.json.JsonSlurper

//execute curl command
def auth_token = "ananthv:5d01a4f32cad245134189f08f9e942134c1ad07a"
def url = "curl -u ${auth_token} https://github01.hclpnp.com/api/v3/repos/UXUIAssets/patron-css/tags"
def gcr_tags_json = url.execute().text

// Parse text to json
JsonSlurper jsonSlurper = new JsonSlurper()
def t = jsonSlurper.parseText(gcr_tags_json)

// Append to new List
def newTags = []
t.each {
     newTags.add(new String("$it.name"))
}


