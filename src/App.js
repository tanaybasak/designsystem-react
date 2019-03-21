import React, { Component } from 'react';
import Button from './components/Button';
import Link from './components/Link';
import Breadcrumb from './components/Breadcrumb';
import Tag from './components/Tag';
import Heading from './components/Heading';

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
            </main>
        );
    }
}

export default App;
