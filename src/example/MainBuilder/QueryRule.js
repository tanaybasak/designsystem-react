import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TextArea from '../../atoms/TextArea';
const QueryRule = ({ item, rulesMapper, ruleIdMapper }) => {
  const [showInlineEdit, toggleInlineEdit] = useState(false);

  const getQueryInStringFormat = (rules, id) => {
    if (Array.isArray(rules)) {
      let query = [];
      rules.map(ruleId => {
        let subRule = rulesMapper[ruleId];
        query.push(getQueryInStringFormat(subRule, ruleId));
      });

      if (ruleIdMapper[id] === 'and') {
        return `( ${query.join(` && `)} )`;
      } else if (ruleIdMapper[id] === 'or') {
        return `( ${query.join(` || `)} )`;
      } else if (ruleIdMapper[id] === 'not') {
        return ` !( ${query} )`;
      } else if (ruleIdMapper[id] === 'if') {
        return `if(${query[0]}) { ${query[1]} } else { ${query[2]} }`;
      } else {
        return `( ${query.join(` ${ruleIdMapper[id]} `)} )`;
      }
    } else {
      return rules;
    }
  };

  const queryRule =
    item.type === 'var'
      ? rulesMapper[item.id]
      : getQueryInStringFormat(rulesMapper[item.id], item.id);

  const [textAreaValue, setTextAreaValue] = useState(queryRule);

  //console.log(rulesMapper)
  useEffect(() => {
    setTextAreaValue(queryRule);
  }, [queryRule]);

  return !showInlineEdit ? (
    <div
      className="logic-builder-query-rule"
      onClick={() => {
        toggleInlineEdit(true);
      }}
    >
      <span>{queryRule}</span>
      <i className="p-hclsw p-hclsw-edit inline-edit-button"></i>
    </div>
  ) : (
    <div className="logic-builder-inline-edit-wrapper">
      <TextArea
        value={textAreaValue}
        aria-label="text input"
        placeholder="Placeholder Text"
        autoFocus
        onBlur={e => {
          console.log(e);
          toggleInlineEdit(false);
        }}
        onChange={e => {
          setTextAreaValue(e.currentTarget.value);
        }}
      />
    </div>
  );
};

QueryRule.propTypes = {};

QueryRule.defaultProps = {};

export default QueryRule;
