import React from 'react';
import PropTypes from "prop-types";
import './TreeView.scss';

const getNode = (node, DOM_Id, index, onClickHandler) => {
    const hasChild = node.children && node.children.length;
    return (
        <div className="patron-treeview" id={`${DOM_Id}_${index}`} key={`${DOM_Id}_${index}`}>
            {
                hasChild ?
                    <input id={`${DOM_Id}_${index}_node`} type="checkbox" name={`${DOM_Id}_${index}_node`} defaultChecked />
                    : null
            }
            <label htmlFor={`${DOM_Id}_${index}_node`}
                className={hasChild ? `arrow` : ``}
                title={node.label || ''}
                onClick={onClickHandler}
                data-id={node.id}
            >
                {/* If custom template is provided */}
                {
                    node.template ?
                        node.template
                        :
                        <React.Fragment>
                            <span className={`patron-treeview-${hasChild ? `folder` : `file`}`} />
                            {node.label || ''}
                        </React.Fragment>
                }
            </label>
            {
                hasChild ?
                    <div className="patron-treeview-content" id={`${DOM_Id}_${index}_nodelist`}>
                        {generateTreeView(node.children, `${DOM_Id}_${index}`, 0, onClickHandler)}
                    </div>
                    : null
            }
        </div>
    )
}

const generateTreeView = (node, DOM_Id, index, onClickHandler) => {
    return (
        node && typeof node === 'object' ?
            Object.prototype.toString.call(node) !== '[object Array]' ?
                getNode(node, DOM_Id, index, onClickHandler)
                : node && node.length ?
                    node.map((item, i) => getNode(item, DOM_Id, i, onClickHandler))
                    : null
            : null
    )
}

const TreeView = props => {
    const { list, DOM_Id, onClickHandler } = props;
    return list && Object.keys(list).length ?
        generateTreeView(list, DOM_Id, 0, onClickHandler)
        : 'OOPS!';
}


TreeView.propTypes = {
    list: PropTypes.object.isRequired,
    DOM_Id: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func
};

TreeView.defaultProps = {
    list: {},
    DOM_Id: 'patron-treeview',
    onClickHandler: function () { }
};

export default TreeView;