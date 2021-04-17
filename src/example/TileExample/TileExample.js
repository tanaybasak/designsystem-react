/* eslint-disable no-console */
import React, { Component } from 'react';
import { ExpandableTile } from '../../atoms/Tile';

class TileExample extends Component {
  render() {
    return (
      <div className="hcl-col-md-6 mt-5 mb-5">
        <ExpandableTile
          type="expandable"
          id="expandable-tile-1"
          expandableType="nw"
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
          id="expandable-tile-2"
          expandableType="ne"
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
          expandableType="sw"
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
          expandableType="se"
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
          toggleArrowOnly
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
