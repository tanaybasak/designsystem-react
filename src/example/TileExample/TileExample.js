/* eslint-disable no-console */
import React, { Component } from 'react';
import { ExpandableTile } from '../../atoms/Tile';
import Checkbox from '../../atoms/Checkbox';
import Button from '../../atoms/Button';

class TileExample extends Component {
  render() {
    return (
      <div className="hcl-col-md-6 mt-5 mb-5">
        <ExpandableTile
          type="expandable"
          id="expandable-tile-1"
          expandableType="nw"
          toggleArrowOnly={false}
          className="mb-2"
          foldContentAbove={
            // <p>
            <div className="hcl-col-12 mt-5" id="checkbox-section">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua labore et dolore magna
              aliqua aliqua
              <legend className="hcl-legend">Checkbox - INDETERMINATE</legend>
              <Button />
              <div className="hcl-checkbox-group">
                <Checkbox
                  id="checkbox1"
                  label="1 (default)"
                  onChange={e => {
                    console.log('asdf');
                  }}
                />
              </div>
            </div>
            // </p>
          }
          foldContentBelow={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua labore et dolore magna
              aliqua aliqua
            </p>
          }
        >
          {/* container for default content */}
          <div>
            <p>Content shown prior expand </p>
          </div>
          {/* container for content which will be added once expanded */}
          <div>
            <p>Content shown after expand </p>
          </div>
        </ExpandableTile>
        <ExpandableTile
          type="expandable"
          id="expandable-tile-2"
          expandableType="ne"
          className="mb-2"
          toggleArrowOnly={false}
          foldContentAbove={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua labore et dolore magna
              aliqua aliqua
            </p>
          }
          foldContentBelow={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua labore et dolore magna
              aliqua aliqua
            </p>
          }
        >
          {/* container for default content */}
          <div>
            <p>Content shown prior expand </p>
          </div>
          {/* container for content which will be added once expanded */}
          <div>
            <p>Content shown after expand </p>
          </div>
        </ExpandableTile>
        <ExpandableTile
          type="expandable"
          id="expandable-tile-3"
          expandableType="se"
          className="mb-2"
          toggleArrowOnly={false}
          foldContentAbove={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua labore et dolore magna
              aliqua aliqua
            </p>
          }
          foldContentBelow={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua labore et dolore magna
              aliqua aliqua
            </p>
          }
        >
          {/* container for default content */}
          <div>
            <p>Content shown prior expand </p>
          </div>
          {/* container for content which will be added once expanded */}
          <div>
            <p>Content shown after expand </p>
          </div>
        </ExpandableTile>
        <ExpandableTile
          type="expandable"
          id="expandable-tile-4"
          expandableType="sw"
          className="mb-2"
          toggleArrowOnly={false}
          foldContentAbove={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua labore et dolore magna
              aliqua aliqua
            </p>
          }
          foldContentBelow={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua labore et dolore magna
              aliqua aliqua
            </p>
          }
        >
          {/* container for default content */}
          <div>
            <p>Content shown prior expand </p>
          </div>
          {/* container for content which will be added once expanded */}
          <div>
            <p>Content shown after expand </p>
          </div>
        </ExpandableTile>
        <ExpandableTile
          type="expandable"
          id="expandable-tile-5"
          expandableType="se"
          className="mb-2"
          foldContentAbove={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua labore et dolore magna
              aliqua aliqua
            </p>
          }
          foldContentBelow={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua labore et dolore magna
              aliqua aliqua
            </p>
          }
        >
          {/* container for default content */}
          <div>
            <p>Content shown prior expand </p>
          </div>
          {/* container for content which will be added once expanded */}
          <div>
            <p>Content shown after expand </p>
          </div>
        </ExpandableTile>
      </div>
    );
  }
}

export default TileExample;
