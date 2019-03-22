import React, { Component } from 'react';
import Button from './components/Button';
import Link from './components/Link';
import Breadcrumb from './components/Breadcrumb';
import Tag from './components/Tag';
import Heading from './components/Heading';
import Tooltip from './components/Tooltip';

class App extends Component<{}> {
    render() {
        return (
            <main>
                {/* Button */}
                <div>
                    <Button
                        onClick={event => { console.log('Button Clicked'); }}
                        className="primary"
                    >
                        Click Me
                    </Button>
                </div>
                {/* Link */}
                <div>
                    <Link
                        href="https://www.google.com"
                        className="primary"
                    >
                        google.com
                    </Link>
                </div>
                {/* Breadcrumb */}
                <div>
                    <Breadcrumb
                        breadcrumbs={[
                            { label: 'Tab 1', value: 'tab1' },
                            { label: 'Tab 2', value: 'tab2' },
                            { label: 'Tab 3', value: 'tab3' }
                        ]}
                        className="breadcrumb"
                        onClick={event => { console.log('Tab clicked') }}
                    />
                </div>
                {/* Tag */}
                <div>
                    <Tag
                        className="primary"
                        isCloseable={true}
                        onClick={event => { console.log('Tag clicked') }}
                    >
                        Country
                    </Tag>
                </div>
                {/* Heading */}
                <div>
                    <Heading
                        className="h1"
                        type="h3"
                        onClick={event => { console.log('Tag clicked') }}
                    >
                        La La La
                    </Heading>
                </div>
                {/* Tooltip */}
                <div>
                    Contrary to popular belief, Lorem Ipsum is not simply random text.
                    It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                    &nbsp;
                    <Tooltip
                        title="Richard McClintock"
                        className="tooltip"
                        clickToOpen={true}
                        direction="top"
                    >
                        <b><i>Richard McClintock</i></b>
                    </Tooltip>
                    , a Latin professor at Hampden-Sydney College in &nbsp;

                    <Tooltip
                        title="Virginia"
                        className="tooltip"
                        clickToOpen={true}
                        direction="bottom"
                    >
                        <b><i>Virginia</i></b>
                    </Tooltip>,
                    looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
                    and going through the cites of the word in classical literature, discovered the undoubtable source.
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                    <Tooltip
                        title="de Finibus Bonorum et Malorum"
                        className="tooltip"
                        clickToOpen={true}
                        direction="right"
                    >
                        <b><i>"de Finibus Bonorum et Malorum"</i></b>
                    </Tooltip>
                    (The Extremes of Good and Evil) by &nbsp;
                    <Tooltip
                        title="Cicero"
                        className="tooltip"
                        clickToOpen={true}
                        direction="left"
                    >
                        <b><i>Cicero</i></b>
                    </Tooltip>
                    , written in 45 BC.
                    This book is a treatise on the theory of ethics, very popular during the Renaissance.
                    The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                </div>
            </main>
        );
    }
}

export default App;
