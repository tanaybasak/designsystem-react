import React, { useState } from 'react';
import CodeSnippet from '../../molecules/CodeSnippet';
import 'prismjs/components/prism-java'

const CodeSnippetExample = ({}) => {
  const code = `addNewFolderToSelectedNode(treeData, item, newItem) {
    treeData.map(data => {
      if (data.id === item.id) {
        if (data.children && Array.isArray(data.children)) {
          data.children.push(newItem);
        } else {
          data.children = [];
          data.children.push(newItem);
        }
      }
      if (data.children && data.children.length > 0) {
        this.addNewFolderToSelectedNode(data.children, item, newItem);
      }
    });
    addNewFolderToSelectedNode(treeData, item, newItem) {
      treeData.map(data => {
        if (data.id === item.id) {
          if (data.children && Array.isArray(data.children)) {
            data.children.push(newItem);
          } else {
            data.children = [];
            data.children.push(newItem);
          }
        }
        if (data.children && data.children.length > 0) {
          this.addNewFolderToSelectedNode(data.children, item, newItem);
        }
      });
      addNewFolderToSelectedNode(treeData, item, newItem) {
        treeData.map(data => {
          if (data.id === item.id) {
            if (data.children && Array.isArray(data.children)) {
              data.children.push(newItem);
            } else {
              data.children = [];
              data.children.push(newItem);
            }
          }
          if (data.children && data.children.length > 0) {
            this.addNewFolderToSelectedNode(data.children, item, newItem);
          }
        });
  }`;

  return (
    <>
        <CodeSnippet type="edit" value={code} lanaguage="java" width="40rem" />

        <CodeSnippet type="read" value={code} lanaguage="java" width="40rem"/>
    </>
  );
};

CodeSnippetExample.propTypes = {};

export default CodeSnippetExample;
